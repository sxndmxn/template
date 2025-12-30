import { getAircraftSensors, getAircraftSensorById } from "@/services/aircraftSensorService";
import type { components } from "@/lib/api/v1";

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
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
      <h2 className="text-lg font-semibold text-red-900 dark:text-red-100">API Connection Error</h2>
      <p className="mt-2 text-sm text-red-700 dark:text-red-300">
        Unable to connect to the API. Make sure the server is running at {process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5294"}
      </p>
    </div>
  );
}

function AircraftContent({ aircraft, oneAircraft }: { aircraft: AircraftSensor[], oneAircraft: AircraftSensor | null }) {
  return (
    <>
      {oneAircraft && (
        <div className="mb-8 rounded-lg border p-4 bg-card">
          <h2 className="text-lg font-semibold">Sample Aircraft (ID: {oneAircraft.id})</h2>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <p className="font-medium">{oneAircraft.aircraftName}</p>
              <p className="text-sm text-muted-foreground">Nation: {oneAircraft.nation}</p>
              <p className="text-sm text-muted-foreground">BR: {oneAircraft.battleRating}</p>
            </div>
            <div>
              <p className="text-sm">Radar: {oneAircraft.radarPresent ? oneAircraft.radarType : "None"}</p>
              <p className="text-sm">Guidance: {oneAircraft.guidanceType || "N/A"}</p>
              <p className="text-sm">RWR: {oneAircraft.rwrPresent ? "Yes" : "No"}</p>
            </div>
          </div>
          {oneAircraft.classification && (
            <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
              Classification: {oneAircraft.classification}
            </p>
          )}
          {oneAircraft.radarModes && oneAircraft.radarModes.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">Radar Modes:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {oneAircraft.radarModes.map((mode) => (
                  <span key={mode} className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                    {mode}
                  </span>
                ))}
              </div>
            </div>
          )}
          {oneAircraft.strengths && oneAircraft.strengths.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Strengths:</p>
              <ul className="text-xs list-disc list-inside">
                {oneAircraft.strengths.map((strength, idx) => (
                  <li key={idx}>{strength}</li>
                ))}
              </ul>
            </div>
          )}
          {oneAircraft.limitations && oneAircraft.limitations.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Limitations:</p>
              <ul className="text-xs list-disc list-inside">
                {oneAircraft.limitations.map((limitation, idx) => (
                  <li key={idx}>{limitation}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      <h1 className="text-xl font-bold mb-4">Aircraft Sensor Data</h1>
      {aircraft.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No aircraft data available</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {aircraft.map((a) => (
            <li key={a.id} className="rounded border p-3 bg-card">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{a.aircraftName}</div>
                  <div className="text-sm text-muted-foreground">{a.nation} • BR {a.battleRating}</div>
                </div>
                <div className="text-right">
                  {a.radarPresent && (
                    <span className="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded mr-1">
                      {a.radarType}
                    </span>
                  )}
                  {a.guidanceType && (
                    <span className="text-xs bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded">
                      {a.guidanceType}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2 text-xs grid grid-cols-3 gap-2">
                <div>
                  <span className="font-medium">Look-down:</span> {a.lookDownCapable ? "✓" : "✗"}
                </div>
                <div>
                  <span className="font-medium">Notch:</span> {a.notchSusceptible ? "Susceptible" : "Resistant"}
                </div>
                <div>
                  <span className="font-medium">RWR:</span> {a.rwrPresent ? "✓" : "✗"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
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
    <main className="flex min-h-screen flex-col p-8 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Aircraft Radar & Sensor Database</h1>
        <p className="text-muted-foreground">
          Comprehensive gameplay-extracted aircraft sensor data. All data represents observable, in-game mechanics only.
        </p>
      </div>
      
      {renderContent(error, aircraft, oneAircraft)}
    </main>
  );
}
