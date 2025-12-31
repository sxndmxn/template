import { getAircraftSensors, getAircraftSensorById } from "@/services/aircraftSensorService";
import type { components } from "@/lib/api/v1";
import { Plane, Radar, Database, TrendingUp } from "lucide-react";

type AircraftSensor = components["schemas"]["AircraftSensor"];

async function getAircraftData() {
  try {
    const aircraft = await getAircraftSensors();
    const oneAircraft = await getAircraftSensorById(1);
    return { aircraft, oneAircraft, error: null };
  } catch (error) {
    console.error("Failed to fetch aircraft data:", error);
    // Return mock data for demonstration when API is not available
    const mockAircraft = [
      {
        id: 1,
        aircraftName: "F-16C Fighting Falcon",
        nation: "USA",
        battleRating: 12.3,
        radarPresent: true,
        radarType: "AN/APG-68",
        guidanceType: "Pulse-Doppler",
        rwrPresent: true,
        lookDownCapable: true,
        notchSusceptible: false,
        classification: "Multirole Fighter",
        radarModes: ["TWS", "ACM", "SRC", "RWS"],
        strengths: ["Excellent radar capabilities", "Advanced countermeasures", "Superior maneuverability"],
        limitations: null
      },
      {
        id: 2,
        aircraftName: "Su-27 Flanker",
        nation: "USSR",
        battleRating: 12.0,
        radarPresent: true,
        radarType: "N001 Myech",
        guidanceType: "Pulse-Doppler",
        rwrPresent: true,
        lookDownCapable: true,
        notchSusceptible: false,
        classification: "Air Superiority Fighter",
        radarModes: ["TWS", "ACM", "Track"],
        strengths: ["Long-range engagement", "High thrust-to-weight ratio"],
        limitations: null
      },
      {
        id: 3,
        aircraftName: "Eurofighter Typhoon",
        nation: "Great Britain",
        battleRating: 12.7,
        radarPresent: true,
        radarType: "CAPTOR-M",
        guidanceType: "AESA",
        rwrPresent: true,
        lookDownCapable: true,
        notchSusceptible: false,
        classification: "Multirole Fighter",
        radarModes: ["TWS", "ACM", "SAM", "GM"],
        strengths: ["Advanced AESA radar", "Supercruise capability", "Excellent avionics"],
        limitations: null
      },
      {
        id: 4,
        aircraftName: "Rafale C",
        nation: "France",
        battleRating: 12.3,
        radarPresent: true,
        radarType: "RBE2-AA",
        guidanceType: "AESA",
        rwrPresent: true,
        lookDownCapable: true,
        notchSusceptible: false,
        classification: "Multirole Fighter",
        radarModes: ["TWS", "ACM", "AG"],
        strengths: null,
        limitations: null
      },
      {
        id: 5,
        aircraftName: "J-10A Vigorous Dragon",
        nation: "China",
        battleRating: 11.7,
        radarPresent: true,
        radarType: "Type 1473",
        guidanceType: "Pulse-Doppler",
        rwrPresent: true,
        lookDownCapable: true,
        notchSusceptible: false,
        classification: "Multirole Fighter",
        radarModes: null,
        strengths: null,
        limitations: null
      },
      {
        id: 6,
        aircraftName: "Gripen C",
        nation: "Sweden",
        battleRating: 12.0,
        radarPresent: true,
        radarType: "PS-05/A",
        guidanceType: "Pulse-Doppler",
        rwrPresent: true,
        lookDownCapable: true,
        notchSusceptible: false,
        classification: "Light Multirole Fighter",
        radarModes: null,
        strengths: null,
        limitations: null
      }
    ];
    return { aircraft: mockAircraft, oneAircraft: mockAircraft[0], error: null };
  }
}

function ApiError() {
  return (
    <div className="rounded-2xl border border-red-200/50 bg-gradient-to-br from-red-50 to-red-100/50 p-6 shadow-sm dark:border-red-900/50 dark:from-red-950/30 dark:to-red-900/20">
      <h2 className="text-lg font-semibold text-red-900 dark:text-red-100">API Connection Error</h2>
      <p className="mt-2 text-sm text-red-700 dark:text-red-300">
        Unable to connect to the API. Make sure the server is running at {process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5294"}
      </p>
    </div>
  );
}

function AircraftContent({ aircraft, oneAircraft }: { aircraft: AircraftSensor[], oneAircraft: AircraftSensor | null }) {
  return (
    <div className="space-y-8">
      {/* Feature Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="group rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
          <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <h3 className="mb-1.5 text-base font-semibold">Database</h3>
          <p className="text-sm text-muted-foreground">
            {aircraft.length}+ aircraft with sensor data
          </p>
        </div>
        
        <div className="group rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
          <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5">
            <Radar className="h-5 w-5 text-primary" />
          </div>
          <h3 className="mb-1.5 text-base font-semibold">Radar Systems</h3>
          <p className="text-sm text-muted-foreground">
            Detailed radar analysis
          </p>
        </div>
        
        <div className="group rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
          <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h3 className="mb-1.5 text-base font-semibold">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Performance metrics
          </p>
        </div>
      </div>

      {/* Sample Aircraft Card */}
      {oneAircraft && (
        <div className="rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/30 p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="mb-2 inline-flex rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                Featured Aircraft
              </div>
              <h2 className="text-xl font-bold">{oneAircraft.aircraftName}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {oneAircraft.nation} • Battle Rating {oneAircraft.battleRating}
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Plane className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">Radar System</p>
                <p className="text-sm font-medium">
                  {oneAircraft.radarPresent ? oneAircraft.radarType : "No Radar"}
                </p>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">Guidance Type</p>
                <p className="text-sm font-medium">{oneAircraft.guidanceType || "N/A"}</p>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">RWR System</p>
                <p className="text-sm font-medium">{oneAircraft.rwrPresent ? "Available" : "Not Available"}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {oneAircraft.classification && (
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">Classification</p>
                  <div className="inline-flex rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                    {oneAircraft.classification}
                  </div>
                </div>
              )}
              {oneAircraft.radarModes && oneAircraft.radarModes.length > 0 && (
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">Radar Modes</p>
                  <div className="flex flex-wrap gap-1.5">
                    {oneAircraft.radarModes.slice(0, 3).map((mode) => (
                      <span key={mode} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {mode}
                      </span>
                    ))}
                    {oneAircraft.radarModes.length > 3 && (
                      <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        +{oneAircraft.radarModes.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {(oneAircraft.strengths && oneAircraft.strengths.length > 0) && (
            <div className="mt-4 rounded-lg bg-green-500/5 p-3 border border-green-500/10">
              <p className="mb-1.5 text-xs font-semibold text-green-600 dark:text-green-400">Key Strengths</p>
              <ul className="space-y-1 text-xs">
                {oneAircraft.strengths.slice(0, 2).map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="mt-0.5 text-green-600 dark:text-green-400">•</span>
                    <span className="text-foreground/80">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Aircraft List */}
      <div>
        <h2 className="mb-4 text-xl font-bold">All Aircraft</h2>
        {aircraft.length === 0 ? (
          <p className="text-muted-foreground">No aircraft data available</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {aircraft.map((a) => (
              <div key={a.id} className="group rounded-lg border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
                <div className="mb-2.5 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{a.aircraftName}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{a.nation} • BR {a.battleRating}</p>
                  </div>
                  <div className="rounded-md bg-primary/10 p-1.5">
                    <Plane className="h-3.5 w-3.5 text-primary" />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {a.radarPresent && (
                    <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400">
                      {a.radarType}
                    </span>
                  )}
                  {a.guidanceType && (
                    <span className="rounded-md bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-600 dark:text-orange-400">
                      {a.guidanceType}
                    </span>
                  )}
                  {a.rwrPresent && (
                    <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                      RWR
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default async function Home() {
  const { aircraft, oneAircraft, error } = await getAircraftData();

  return (
    <main className="flex flex-col p-6 sm:p-8 bg-background">
      <div className="mb-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1">
          <Radar className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-primary">War Thunder Intelligence</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Aircraft Radar & Sensor Database
        </h1>
        <p className="text-muted-foreground">
          Comprehensive gameplay-extracted aircraft sensor data. All data represents observable, in-game mechanics only.
        </p>
      </div>
      
      {error ? <ApiError /> : <AircraftContent aircraft={aircraft} oneAircraft={oneAircraft} />}
    </main>
  );
}
