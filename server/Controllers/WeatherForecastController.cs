using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public sealed class WeatherForecastController : ControllerBase
    {
        private static readonly ConcurrentDictionary<int, WeatherForecast> _store = new()
        {
            [1] = new WeatherForecast { Id = 1, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date), TemperatureC = 18, Summary = "Chilly" },
            [2] = new WeatherForecast { Id = 2, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date).AddDays(1), TemperatureC = 21, Summary = "Mild" },
            [3] = new WeatherForecast { Id = 3, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date).AddDays(2), TemperatureC = 26, Summary = "Warm" },
            [4] = new WeatherForecast { Id = 4, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date).AddDays(3), TemperatureC = 30, Summary = "Balmy" },
            [5] = new WeatherForecast { Id = 5, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date).AddDays(4), TemperatureC = 34, Summary = "Hot" },
        };

        private static int _nextId = _store.Keys.DefaultIfEmpty(0).Max();

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<WeatherForecast>> GetAll()
        {
            return Ok(_store.Values.OrderBy(x => x.Id));
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<WeatherForecast> GetById(int id)
        {
            return _store.TryGetValue(id, out var wf)
                ? Ok(wf)
                : Problem(
                    title: "Not Found",
                    detail: $"WeatherForecast {id} not found.",
                    statusCode: StatusCodes.Status404NotFound);
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public ActionResult<WeatherForecast> Create([FromBody] WeatherForecast input)
        {
            if (input.Id <= 0 || _store.ContainsKey(input.Id))
            {
                input.Id = Interlocked.Increment(ref _nextId);
            }

            if (!_store.TryAdd(input.Id, input))
            {
                return Problem(
                    title: "Conflict",
                    detail: $"A WeatherForecast with id {input.Id} already exists.",
                    statusCode: StatusCodes.Status409Conflict);
            }

            return CreatedAtAction(nameof(GetById), new { id = input.Id }, input);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<WeatherForecast> Update(int id, [FromBody] WeatherForecast input)
        {
            if (input.Id != 0 && input.Id != id)
            {
                return Problem(
                    title: "Bad Request",
                    detail: $"Route id {id} must match body id {input.Id}.",
                    statusCode: StatusCodes.Status400BadRequest);
            }

            if (!_store.ContainsKey(id))
            {
                return Problem(
                    title: "Not Found",
                    detail: $"WeatherForecast {id} not found.",
                    statusCode: StatusCodes.Status404NotFound);
            }

            input.Id = id;
            _store[id] = input; // atomic set
            return Ok(input);
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteById(int id)
        {
            return _store.TryRemove(id, out _)
               ? NoContent()
               : Problem(
                   title: "Not Found",
                   detail: $"WeatherForecast {id} not found.",
                   statusCode: StatusCodes.Status404NotFound);
        }

    }
}
