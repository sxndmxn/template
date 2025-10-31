import { api } from "@/lib/api/apiClient";
import type { components } from "@/lib/api/v1";

type WeatherForecast = components["schemas"]["WeatherForecast"];
type WeatherForecastList = WeatherForecast[];

export async function getWeatherForecast(signal?: AbortSignal): Promise<WeatherForecastList> {
    const { data, error } = await api.GET("/WeatherForecast", { signal });
    if (error) {
        throw error;
    }
    return data ?? [];
}
