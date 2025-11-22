import { api } from "@/lib/api/apiClient";
import type { components } from "@/lib/api/v1";

type WeatherForecast = components["schemas"]["WeatherForecast"];
type WeatherForecastList = WeatherForecast[];

export async function getWeatherForecast(signal?: AbortSignal): Promise<WeatherForecastList> {
    const { data } = await api.GET("/WeatherForecast", { signal });
    return data ?? [];
}

export async function getWeatherForecastById(id: number, signal?: AbortSignal): Promise<WeatherForecast | null> {
    const { data } = await api.GET("/WeatherForecast/{id}", {
        params: { path: { id } },
        signal,
    });
    return data ?? null;
}