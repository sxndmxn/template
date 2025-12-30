using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class AircraftSensorController : ControllerBase
{
    private static readonly ConcurrentDictionary<int, AircraftSensor> _aircraftSensors = new()
    {
        [1] = new AircraftSensor
        {
            Id = 1,
            AircraftName = "MiG-23ML",
            Nation = "USSR",
            BattleRating = 11.3m,
            RadarPresent = true,
            RadarType = "pulse_doppler",
            RadarModes = ["SRC", "PD", "ACM"],
            LockState = "track",
            LookDownCapable = true,
            NotchSusceptible = true,
            RwrPresent = true,
            RwrAlertTypes = ["search", "lock", "missile"],
            GuidanceType = "SARH",
            Countermeasures = ["chaff", "flare"],
            Classification = "PD-capable interceptor",
            Strengths = ["look-down engagement", "ACM lock speed"],
            Limitations = ["notch vulnerability", "single-target tracking"]
        },
        [2] = new AircraftSensor
        {
            Id = 2,
            AircraftName = "F-16C",
            Nation = "USA",
            BattleRating = 13.0m,
            RadarPresent = true,
            RadarType = "pulse_doppler",
            RadarModes = ["SRC", "PD", "ACM", "TWS"],
            LockState = "search",
            LookDownCapable = true,
            NotchSusceptible = false,
            RwrPresent = true,
            RwrAlertTypes = ["search", "lock", "missile"],
            GuidanceType = "ARH",
            Countermeasures = ["chaff", "flare"],
            Classification = "Multi-role fighter",
            Strengths = ["TWS capability", "ARH missiles", "advanced RWR"],
            Limitations = ["limited fuel capacity"]
        },
        [3] = new AircraftSensor
        {
            Id = 3,
            AircraftName = "F-4E Phantom II",
            Nation = "USA",
            BattleRating = 11.0m,
            RadarPresent = true,
            RadarType = "pulse",
            RadarModes = ["SRC", "ACM"],
            LockState = "search",
            LookDownCapable = false,
            NotchSusceptible = true,
            RwrPresent = true,
            RwrAlertTypes = ["search", "lock"],
            GuidanceType = "SARH",
            Countermeasures = ["chaff", "flare"],
            Classification = "Second-gen multirole",
            Strengths = ["strong radar", "good missile load"],
            Limitations = ["no look-down capability", "pulse radar limitations"]
        },
        [4] = new AircraftSensor
        {
            Id = 4,
            AircraftName = "Mirage 2000-5F",
            Nation = "France",
            BattleRating = 12.3m,
            RadarPresent = true,
            RadarType = "pulse_doppler",
            RadarModes = ["SRC", "PD", "ACM", "TWS"],
            LockState = "track",
            LookDownCapable = true,
            NotchSusceptible = false,
            RwrPresent = true,
            RwrAlertTypes = ["search", "lock", "missile"],
            GuidanceType = "ARH",
            Countermeasures = ["chaff", "flare"],
            Classification = "Advanced interceptor",
            Strengths = ["TWS tracking", "ARH capability", "low notch susceptibility"],
            Limitations = ["limited payload compared to larger aircraft"]
        },
        [5] = new AircraftSensor
        {
            Id = 5,
            AircraftName = "Su-27",
            Nation = "USSR",
            BattleRating = 12.7m,
            RadarPresent = true,
            RadarType = "pulse_doppler",
            RadarModes = ["SRC", "PD", "ACM", "TWS", "IRST"],
            LockState = "search",
            LookDownCapable = true,
            NotchSusceptible = true,
            RwrPresent = true,
            RwrAlertTypes = ["search", "lock", "missile"],
            GuidanceType = "SARH",
            Countermeasures = ["chaff", "flare"],
            Classification = "Heavy air superiority fighter",
            Strengths = ["IRST capability", "TWS mode", "excellent maneuverability"],
            Limitations = ["SARH missiles only", "notch susceptible"]
        }
    };

    private static int _nextId = _aircraftSensors.Keys.DefaultIfEmpty(0).Max();

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<AircraftSensor>> GetAll()
    {
        return Ok(_aircraftSensors.Values.OrderBy(x => x.Id));
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<AircraftSensor> GetById(int id)
    {
        return _aircraftSensors.TryGetValue(id, out var aircraftSensor)
            ? Ok(aircraftSensor)
            : Problem(
                title: "Not Found",
                detail: $"AircraftSensor {id} not found.",
                statusCode: StatusCodes.Status404NotFound);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public ActionResult<AircraftSensor> Create([FromBody] AircraftSensor aircraftSensor)
    {
        if (aircraftSensor.Id <= 0 || _aircraftSensors.ContainsKey(aircraftSensor.Id))
        {
            aircraftSensor.Id = Interlocked.Increment(ref _nextId);
        }

        if (!_aircraftSensors.TryAdd(aircraftSensor.Id, aircraftSensor))
        {
            return Problem(
                title: "Conflict",
                detail: $"An AircraftSensor with id {aircraftSensor.Id} already exists.",
                statusCode: StatusCodes.Status409Conflict);
        }

        return CreatedAtAction(nameof(GetById), new { id = aircraftSensor.Id }, aircraftSensor);
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<AircraftSensor> Update(int id, [FromBody] AircraftSensor aircraftSensor)
    {
        if (aircraftSensor.Id != 0 && aircraftSensor.Id != id)
        {
            return Problem(
                title: "Bad Request",
                detail: $"Route id {id} must match body id {aircraftSensor.Id}.",
                statusCode: StatusCodes.Status400BadRequest);
        }

        if (!_aircraftSensors.ContainsKey(id))
        {
            return Problem(
                title: "Not Found",
                detail: $"AircraftSensor {id} not found.",
                statusCode: StatusCodes.Status404NotFound);
        }

        aircraftSensor.Id = id;
        _aircraftSensors[id] = aircraftSensor;
        return Ok(aircraftSensor);
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult DeleteById(int id)
    {
        return _aircraftSensors.TryRemove(id, out _)
           ? NoContent()
           : Problem(
               title: "Not Found",
               detail: $"AircraftSensor {id} not found.",
               statusCode: StatusCodes.Status404NotFound);
    }
}
