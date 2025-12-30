namespace Server;

public class AircraftSensor
{
    public int Id { get; set; }
    public required string AircraftName { get; set; }
    public required string Nation { get; set; }
    public decimal BattleRating { get; set; }
    public bool RadarPresent { get; set; }
    public string? RadarType { get; set; }
    public List<string>? RadarModes { get; set; }
    public string? LockState { get; set; }
    public bool LookDownCapable { get; set; }
    public bool NotchSusceptible { get; set; }
    public bool RwrPresent { get; set; }
    public List<string>? RwrAlertTypes { get; set; }
    public string? GuidanceType { get; set; }
    public List<string>? Countermeasures { get; set; }
    public string? Classification { get; set; }
    public List<string>? Strengths { get; set; }
    public List<string>? Limitations { get; set; }
}
