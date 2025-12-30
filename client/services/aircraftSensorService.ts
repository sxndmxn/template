import { api } from "@/lib/api/apiClient";
import type { components } from "@/lib/api/v1";

type AircraftSensor = components["schemas"]["AircraftSensor"];
type AircraftSensorList = AircraftSensor[];

export async function getAircraftSensors(signal?: AbortSignal): Promise<AircraftSensorList> {
    const { data } = await api.GET("/AircraftSensor", { signal });
    return data ?? [];
}

export async function getAircraftSensorById(id: number, signal?: AbortSignal): Promise<AircraftSensor | null> {
    const { data } = await api.GET("/AircraftSensor/{id}", {
        params: { path: { id } },
        signal,
    });
    return data ?? null;
}
