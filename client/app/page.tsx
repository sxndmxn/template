import { getAircraftSensors, getAircraftSensorById } from "@/services/aircraftSensorService";
import type { components } from "@/lib/api/v1";
import { Plane, Radar, Shield, Zap, Database, TrendingUp } from "lucide-react";

type AircraftSensor = components["schemas"]["AircraftSensor"];

async function getAircraftData() {
  try {
    const aircraft = await getAircraftSensors();
    const oneAircraft = await getAircraftSensorById(1);
    return { aircraft, oneAircraft, error: null };
  } catch (error) {
    console.error("Failed to fetch aircraft data:", error);
    return { aircraft: [], oneAircraft: null, error: "Failed to connect to API" };
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
    <div className="space-y-12">
      {/* Feature Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="group rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
          <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
            <Database className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Comprehensive Database</h3>
          <p className="text-sm text-muted-foreground">
            Access detailed sensor data for {aircraft.length}+ aircraft with real-time updates
          </p>
        </div>
        
        <div className="group rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
          <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
            <Radar className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Radar Systems</h3>
          <p className="text-sm text-muted-foreground">
            Detailed analysis of radar capabilities, modes, and guidance systems
          </p>
        </div>
        
        <div className="group rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
          <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Performance Analytics</h3>
          <p className="text-sm text-muted-foreground">
            In-depth performance metrics and comparative analysis tools
          </p>
        </div>
      </div>

      {/* Sample Aircraft Card */}
      {oneAircraft && (
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/30 p-8 shadow-sm">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <div className="mb-2 inline-flex rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Featured Aircraft
              </div>
              <h2 className="text-2xl font-bold">{oneAircraft.aircraftName}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {oneAircraft.nation} • Battle Rating {oneAircraft.battleRating}
              </p>
            </div>
            <div className="rounded-xl bg-primary/10 p-3">
              <Plane className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Radar System</p>
                <p className="text-base font-medium">
                  {oneAircraft.radarPresent ? oneAircraft.radarType : "No Radar"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">Guidance Type</p>
                <p className="text-base font-medium">{oneAircraft.guidanceType || "N/A"}</p>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">RWR System</p>
                <p className="text-base font-medium">{oneAircraft.rwrPresent ? "Available" : "Not Available"}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {oneAircraft.classification && (
                <div>
                  <p className="mb-2 text-sm font-medium text-muted-foreground">Classification</p>
                  <div className="inline-flex rounded-lg bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                    {oneAircraft.classification}
                  </div>
                </div>
              )}
              {oneAircraft.radarModes && oneAircraft.radarModes.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium text-muted-foreground">Radar Modes</p>
                  <div className="flex flex-wrap gap-2">
                    {oneAircraft.radarModes.slice(0, 3).map((mode) => (
                      <span key={mode} className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {mode}
                      </span>
                    ))}
                    {oneAircraft.radarModes.length > 3 && (
                      <span className="rounded-lg bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        +{oneAircraft.radarModes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {(oneAircraft.strengths && oneAircraft.strengths.length > 0) && (
            <div className="mt-6 rounded-xl bg-green-500/5 p-4 border border-green-500/10">
              <p className="mb-2 text-sm font-semibold text-green-600 dark:text-green-400">Key Strengths</p>
              <ul className="space-y-1 text-sm">
                {oneAircraft.strengths.slice(0, 2).map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 text-green-600 dark:text-green-400">•</span>
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
        <h2 className="mb-6 text-2xl font-bold">All Aircraft</h2>
        {aircraft.length === 0 ? (
          <p className="text-muted-foreground">No aircraft data available</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aircraft.map((a) => (
              <div key={a.id} className="group rounded-xl border border-border/50 bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{a.aircraftName}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{a.nation} • BR {a.battleRating}</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Plane className="h-4 w-4 text-primary" />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {a.radarPresent && (
                    <span className="rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                      {a.radarType}
                    </span>
                  )}
                  {a.guidanceType && (
                    <span className="rounded-md bg-orange-500/10 px-2 py-1 text-xs font-medium text-orange-600 dark:text-orange-400">
                      {a.guidanceType}
                    </span>
                  )}
                  {a.rwrPresent && (
                    <span className="rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
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

function renderContent(error: string | null, aircraft: AircraftSensor[], oneAircraft: AircraftSensor | null) {
  if (error) {
    return <ApiError />;
  }
  return <AircraftContent aircraft={aircraft} oneAircraft={oneAircraft} />;
}

export default async function Home() {
  const { aircraft, oneAircraft, error } = await getAircraftData();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <Radar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">War Thunder Intelligence</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Aircraft Radar & Sensor
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Database
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Comprehensive gameplay-extracted aircraft sensor data. All data represents observable, in-game mechanics only.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {error ? <ApiError /> : <AircraftContent aircraft={aircraft} oneAircraft={oneAircraft} />}
      </div>
    </main>
  );
}
