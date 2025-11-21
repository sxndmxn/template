namespace Server;

/// <summary>
/// Represents a weather forecast for a specific date.
/// This is a sample data model demonstrating basic properties and computed values.
/// </summary>
public class WeatherForecast
{
    /// <summary>
    /// Gets or sets the unique identifier for this forecast.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the date for this forecast.
    /// Uses DateOnly for date values without time component.
    /// </summary>
    public DateOnly Date { get; set; }

    /// <summary>
    /// Gets or sets the temperature in Celsius.
    /// </summary>
    public int TemperatureC { get; set; }

    /// <summary>
    /// Gets the temperature in Fahrenheit.
    /// This is a computed property that automatically converts from Celsius.
    /// Formula: F = C × 1.8 + 32
    /// </summary>
    public int TemperatureF => 32 + (int)(TemperatureC * 1.8);

    /// <summary>
    /// Gets or sets a brief description of the weather conditions (e.g., "Sunny", "Rainy").
    /// </summary>
    public string? Summary { get; set; }
}
