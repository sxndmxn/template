namespace Server.Tests;

public class AircraftSensorTests
{
    [Fact]
    public void AircraftSensor_CanSetAndGetAllRequiredProperties()
    {
        // Arrange
        var id = 1;
        var aircraftName = "MiG-23ML";
        var nation = "USSR";
        var battleRating = 11.3m;

        // Act
        var sensor = new AircraftSensor
        {
            Id = id,
            AircraftName = aircraftName,
            Nation = nation,
            BattleRating = battleRating
        };

        // Assert
        Assert.Equal(id, sensor.Id);
        Assert.Equal(aircraftName, sensor.AircraftName);
        Assert.Equal(nation, sensor.Nation);
        Assert.Equal(battleRating, sensor.BattleRating);
    }

    [Fact]
    public void AircraftSensor_CanSetOptionalProperties()
    {
        // Arrange & Act
        var sensor = new AircraftSensor
        {
            Id = 1,
            AircraftName = "F-16C",
            Nation = "USA",
            BattleRating = 13.0m,
            RadarPresent = true,
            RadarType = "pulse_doppler",
            RadarModes = ["SRC", "PD", "TWS"],
            LookDownCapable = true,
            NotchSusceptible = false,
            RwrPresent = true,
            RwrAlertTypes = ["search", "lock", "missile"],
            GuidanceType = "ARH",
            Countermeasures = ["chaff", "flare"]
        };

        // Assert
        Assert.True(sensor.RadarPresent);
        Assert.Equal("pulse_doppler", sensor.RadarType);
        Assert.Equal(3, sensor.RadarModes?.Count);
        Assert.True(sensor.LookDownCapable);
        Assert.False(sensor.NotchSusceptible);
        Assert.True(sensor.RwrPresent);
        Assert.Equal("ARH", sensor.GuidanceType);
        Assert.Equal(2, sensor.Countermeasures?.Count);
    }

    [Fact]
    public void AircraftSensor_OptionalPropertiesCanBeNull()
    {
        // Arrange & Act
        var sensor = new AircraftSensor
        {
            Id = 1,
            AircraftName = "Basic Aircraft",
            Nation = "USA",
            BattleRating = 5.0m,
            RadarPresent = false,
            RadarType = null,
            RadarModes = null,
            LockState = null,
            RwrAlertTypes = null,
            GuidanceType = null,
            Countermeasures = null
        };

        // Assert
        Assert.Null(sensor.RadarType);
        Assert.Null(sensor.RadarModes);
        Assert.Null(sensor.LockState);
        Assert.Null(sensor.RwrAlertTypes);
        Assert.Null(sensor.GuidanceType);
        Assert.Null(sensor.Countermeasures);
    }

    [Fact]
    public void AircraftSensor_CanSetClassificationAndAnalysis()
    {
        // Arrange & Act
        var sensor = new AircraftSensor
        {
            Id = 1,
            AircraftName = "MiG-23ML",
            Nation = "USSR",
            BattleRating = 11.3m,
            Classification = "PD-capable interceptor",
            Strengths = ["look-down engagement", "ACM lock speed"],
            Limitations = ["notch vulnerability", "single-target tracking"]
        };

        // Assert
        Assert.Equal("PD-capable interceptor", sensor.Classification);
        Assert.Equal(2, sensor.Strengths?.Count);
        Assert.Equal(2, sensor.Limitations?.Count);
        Assert.NotNull(sensor.Strengths);
        Assert.Contains("look-down engagement", sensor.Strengths);
        Assert.NotNull(sensor.Limitations);
        Assert.Contains("notch vulnerability", sensor.Limitations);
    }

    [Fact]
    public void AircraftSensor_BattleRatingAcceptsDecimalValues()
    {
        // Arrange & Act
        var sensor = new AircraftSensor
        {
            Id = 1,
            AircraftName = "Test",
            Nation = "Test",
            BattleRating = 10.7m
        };

        // Assert
        Assert.Equal(10.7m, sensor.BattleRating);
    }

    [Fact]
    public void AircraftSensor_SupportsMultipleRadarModes()
    {
        // Arrange & Act
        var sensor = new AircraftSensor
        {
            Id = 1,
            AircraftName = "Su-27",
            Nation = "USSR",
            BattleRating = 12.7m,
            RadarModes = ["SRC", "PD", "ACM", "TWS", "IRST"]
        };

        // Assert
        Assert.Equal(5, sensor.RadarModes?.Count);
        Assert.NotNull(sensor.RadarModes);
        Assert.Contains("IRST", sensor.RadarModes);
        Assert.Contains("TWS", sensor.RadarModes);
    }
}
