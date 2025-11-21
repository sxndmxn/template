using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;

namespace Server.Controllers;

/// <summary>
/// API controller for managing weather forecast data.
/// Demonstrates a complete RESTful CRUD API with proper HTTP semantics.
/// </summary>
/// <remarks>
/// This controller uses an in-memory store (ConcurrentDictionary) for simplicity.
/// In a real application, you would replace this with a database using Entity Framework Core.
/// 
/// Key patterns demonstrated:
/// - RESTful routing with resource-based URLs
/// - Proper HTTP status codes for different scenarios
/// - Thread-safe operations using ConcurrentDictionary
/// - Problem Details for consistent error responses
/// - OpenAPI/Swagger annotations via ProducesResponseType
/// </remarks>
[ApiController]
[Route("[controller]")]
public sealed class WeatherForecastController : ControllerBase
{
    // Static in-memory data store shared across all requests
    // ConcurrentDictionary provides thread-safe access for concurrent requests
    private static readonly ConcurrentDictionary<int, WeatherForecast> _store = new()
    {
        [1] = new WeatherForecast { Id = 1, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date), TemperatureC = 18, Summary = "Chilly" },
        [2] = new WeatherForecast { Id = 2, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date).AddDays(1), TemperatureC = 21, Summary = "Mild" },
        [3] = new WeatherForecast { Id = 3, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date).AddDays(2), TemperatureC = 26, Summary = "Warm" },
        [4] = new WeatherForecast { Id = 4, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date).AddDays(3), TemperatureC = 30, Summary = "Balmy" },
        [5] = new WeatherForecast { Id = 5, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date).AddDays(4), TemperatureC = 34, Summary = "Hot" },
    };

    // Track the next available ID using atomic operations (Interlocked) for thread safety
    private static int _nextId = _store.Keys.DefaultIfEmpty(0).Max();

    /// <summary>
    /// Retrieves all weather forecasts.
    /// </summary>
    /// <returns>A list of all weather forecasts, ordered by ID.</returns>
    /// <response code="200">Returns the list of weather forecasts.</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<WeatherForecast>> GetAll()
    {
        // Return all forecasts sorted by ID for consistent ordering
        return Ok(_store.Values.OrderBy(x => x.Id));
    }

    /// <summary>
    /// Retrieves a specific weather forecast by ID.
    /// </summary>
    /// <param name="id">The unique identifier of the forecast.</param>
    /// <returns>The weather forecast if found.</returns>
    /// <response code="200">Returns the requested weather forecast.</response>
    /// <response code="404">If no forecast with the specified ID exists.</response>
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<WeatherForecast> GetById(int id)
    {
        // TryGetValue is thread-safe and more efficient than Contains + indexer
        return _store.TryGetValue(id, out var wf)
            ? Ok(wf)
            : Problem(
                title: "Not Found",
                detail: $"WeatherForecast {id} not found.",
                statusCode: StatusCodes.Status404NotFound);
    }


    /// <summary>
    /// Creates a new weather forecast.
    /// </summary>
    /// <param name="input">The weather forecast data to create.</param>
    /// <returns>The created weather forecast with its assigned ID.</returns>
    /// <response code="201">Returns the newly created weather forecast.</response>
    /// <response code="400">If the input data is invalid.</response>
    /// <response code="409">If a forecast with the specified ID already exists.</response>
    /// <remarks>
    /// If the input ID is 0 or negative, or if it already exists, a new ID will be automatically assigned.
    /// The response includes a Location header with the URL to retrieve the created resource.
    /// </remarks>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public ActionResult<WeatherForecast> Create([FromBody] WeatherForecast input)
    {
        // Auto-generate ID if not provided or if it conflicts with existing data
        if (input.Id <= 0 || _store.ContainsKey(input.Id))
        {
            // Interlocked.Increment ensures thread-safe ID generation
            input.Id = Interlocked.Increment(ref _nextId);
        }

        // TryAdd atomically checks and adds - prevents race conditions
        if (!_store.TryAdd(input.Id, input))
        {
            return Problem(
                title: "Conflict",
                detail: $"A WeatherForecast with id {input.Id} already exists.",
                statusCode: StatusCodes.Status409Conflict);
        }

        // CreatedAtAction returns 201 with Location header pointing to the new resource
        return CreatedAtAction(nameof(GetById), new { id = input.Id }, input);
    }

    /// <summary>
    /// Updates an existing weather forecast.
    /// </summary>
    /// <param name="id">The ID of the forecast to update (from URL).</param>
    /// <param name="input">The updated forecast data.</param>
    /// <returns>The updated weather forecast.</returns>
    /// <response code="200">Returns the updated weather forecast.</response>
    /// <response code="400">If the ID in the URL doesn't match the ID in the body.</response>
    /// <response code="404">If no forecast with the specified ID exists.</response>
    /// <remarks>
    /// This follows the PUT semantics: the entire resource is replaced.
    /// The ID in the request body should either match the URL ID or be 0.
    /// </remarks>
    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<WeatherForecast> Update(int id, [FromBody] WeatherForecast input)
    {
        // Validate that route ID matches body ID (if body ID is specified)
        if (input.Id != 0 && input.Id != id)
        {
            return Problem(
                title: "Bad Request",
                detail: $"Route id {id} must match body id {input.Id}.",
                statusCode: StatusCodes.Status400BadRequest);
        }

        // Check if the resource exists before updating
        if (!_store.ContainsKey(id))
        {
            return Problem(
                title: "Not Found",
                detail: $"WeatherForecast {id} not found.",
                statusCode: StatusCodes.Status404NotFound);
        }

        // Ensure the ID is set correctly and perform atomic update
        input.Id = id;
        _store[id] = input; // Indexer assignment is atomic for reference types
        return Ok(input);
    }

    /// <summary>
    /// Deletes a weather forecast by ID.
    /// </summary>
    /// <param name="id">The ID of the forecast to delete.</param>
    /// <returns>No content on success.</returns>
    /// <response code="204">If the forecast was successfully deleted.</response>
    /// <response code="404">If no forecast with the specified ID exists.</response>
    /// <remarks>
    /// Returns 204 No Content on successful deletion (following REST conventions).
    /// Deletion is idempotent - multiple DELETE requests have the same effect as one.
    /// </remarks>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult DeleteById(int id)
    {
        // TryRemove atomically checks and removes in a thread-safe manner
        return _store.TryRemove(id, out _)
            ? NoContent()
            : Problem(
                title: "Not Found",
                detail: $"WeatherForecast {id} not found.",
                statusCode: StatusCodes.Status404NotFound);
    }
}
