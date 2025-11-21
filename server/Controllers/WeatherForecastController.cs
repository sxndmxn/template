using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public sealed class WeatherForecastController : ControllerBase
    {
        private static readonly ConcurrentDictionary<int, WeatherForecast> _weatherForecasts = new()
        {
            [1] = new WeatherForecast { Id = 1, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date), TemperatureC = 18, Summary = "Chilly" },
            [2] = new WeatherForecast { Id = 2, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date).AddDays(1), TemperatureC = 21, Summary = "Mild" },
            [3] = new WeatherForecast { Id = 3, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date).AddDays(2), TemperatureC = 26, Summary = "Warm" },
            [4] = new WeatherForecast { Id = 4, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date).AddDays(3), TemperatureC = 30, Summary = "Balmy" },
            [5] = new WeatherForecast { Id = 5, Date = DateOnly.FromDateTime(DateTime.UtcNow.Date).AddDays(4), TemperatureC = 34, Summary = "Hot" },
        };

        private static int _nextId = _weatherForecasts.Keys.DefaultIfEmpty(0).Max();

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<WeatherForecast>> GetAll()
        {
            return Ok(_weatherForecasts.Values.OrderBy(x => x.Id));
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<WeatherForecast> GetById(int id)
        {
            return _weatherForecasts.TryGetValue(id, out var weatherForecast)
                ? Ok(weatherForecast)
                : Problem(
                    title: "Not Found",
                    detail: $"WeatherForecast {id} not found.",
                    statusCode: StatusCodes.Status404NotFound);
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public ActionResult<WeatherForecast> Create([FromBody] WeatherForecast weatherForecast)
        {
            if (weatherForecast.Id <= 0 || _weatherForecasts.ContainsKey(weatherForecast.Id))
            {
                weatherForecast.Id = Interlocked.Increment(ref _nextId);
            }

            if (!_weatherForecasts.TryAdd(weatherForecast.Id, weatherForecast))
            {
                return Problem(
                    title: "Conflict",
                    detail: $"A WeatherForecast with id {weatherForecast.Id} already exists.",
                    statusCode: StatusCodes.Status409Conflict);
            }

            return CreatedAtAction(nameof(GetById), new { id = weatherForecast.Id }, weatherForecast);
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<WeatherForecast> Update(int id, [FromBody] WeatherForecast weatherForecast)
        {
            if (weatherForecast.Id != 0 && weatherForecast.Id != id)
            {
                return Problem(
                    title: "Bad Request",
                    detail: $"Route id {id} must match body id {weatherForecast.Id}.",
                    statusCode: StatusCodes.Status400BadRequest);
            }

            if (!_weatherForecasts.ContainsKey(id))
            {
                return Problem(
                    title: "Not Found",
                    detail: $"WeatherForecast {id} not found.",
                    statusCode: StatusCodes.Status404NotFound);
            }

            weatherForecast.Id = id;
            _weatherForecasts[id] = weatherForecast; // atomic set
            return Ok(weatherForecast);
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteById(int id)
        {
            return _weatherForecasts.TryRemove(id, out _)
               ? NoContent()
               : Problem(
                   title: "Not Found",
                   detail: $"WeatherForecast {id} not found.",
                   statusCode: StatusCodes.Status404NotFound);
        }

    }
}
