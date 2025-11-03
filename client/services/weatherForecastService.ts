import { api } from "@/lib/api/apiClient";
import type { components } from "@/lib/api/v1";

type WeatherForecast = components["schemas"]["WeatherForecast"];
type WeatherForecastList = WeatherForecast[];

export async function getWeatherForecast(signal?: AbortSignal): Promise<WeatherForecastList> {
    const { data, error, response } = await api.GET("/WeatherForecast", { signal });
    if (error || !response.ok) {
        throw Object.assign(new Error(`HTTP ${response?.status}`), { status: response?.status, cause: error });
    }
    
    return data ?? [];
}
