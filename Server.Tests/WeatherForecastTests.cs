namespace Server.Tests;

public class WeatherForecastTests
{
    [Fact]
    public void TemperatureF_ConvertsFromCelsiusCorrectly_WhenTemperatureCIsZero()
    {
        // Arrange
        var forecast = new WeatherForecast { TemperatureC = 0 };

        // Act
        var temperatureF = forecast.TemperatureF;

        // Assert
        Assert.Equal(32, temperatureF);
    }

    [Theory]
    [InlineData(0, 32)]
    [InlineData(10, 50)]
    [InlineData(20, 68)]
    [InlineData(25, 77)]
    [InlineData(30, 86)]
    [InlineData(-10, 14)]
    [InlineData(-40, -40)]
    [InlineData(100, 212)]
    public void TemperatureF_ConvertsFromCelsiusCorrectly(int temperatureC, int expectedTemperatureF)
    {
        // Arrange
        var forecast = new WeatherForecast { TemperatureC = temperatureC };

        // Act
        var actualTemperatureF = forecast.TemperatureF;

        // Assert
        Assert.Equal(expectedTemperatureF, actualTemperatureF);
    }

    [Fact]
    public void WeatherForecast_CanSetAndGetAllProperties()
    {
        // Arrange
        var id = 1;
        var date = DateOnly.FromDateTime(DateTime.UtcNow);
        var temperatureC = 25;
        var summary = "Warm";

        // Act
        var forecast = new WeatherForecast
        {
            Id = id,
            Date = date,
            TemperatureC = temperatureC,
            Summary = summary
        };

        // Assert
        Assert.Equal(id, forecast.Id);
        Assert.Equal(date, forecast.Date);
        Assert.Equal(temperatureC, forecast.TemperatureC);
        Assert.Equal(summary, forecast.Summary);
        Assert.Equal(77, forecast.TemperatureF); // 25C = 77F
    }

    [Fact]
    public void Summary_CanBeNull()
    {
        // Arrange & Act
        var forecast = new WeatherForecast
        {
            Id = 1,
            Date = DateOnly.FromDateTime(DateTime.UtcNow),
            TemperatureC = 20,
            Summary = null
        };

        // Assert
        Assert.Null(forecast.Summary);
    }
}
