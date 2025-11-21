/**
 * Weather Forecast Service
 * 
 * This service provides a clean abstraction over the API client for weather forecast operations.
 * It demonstrates the service layer pattern, separating API calls from component logic.
 * 
 * Benefits of the service layer:
 * - Centralized API logic - easier to maintain and test
 * - Consistent error handling across the application
 * - Easy to mock for testing components
 * - Type-safe operations with full TypeScript support
 * 
 * @module weatherForecastService
 */

import { api } from "@/lib/api/apiClient";
import type { components } from "@/lib/api/v1";

/**
 * Type alias for a single weather forecast.
 * Auto-generated from the API's OpenAPI schema.
 */
type WeatherForecast = components["schemas"]["WeatherForecast"];

/**
 * Type alias for a list of weather forecasts.
 */
type WeatherForecastList = WeatherForecast[];

/**
 * Retrieves all weather forecasts from the API.
 * 
 * @param signal - Optional AbortSignal to cancel the request
 * @returns Promise resolving to an array of weather forecasts
 * 
 * @example
 * ```tsx
 * // In a Server Component
 * const forecasts = await getWeatherForecast();
 * 
 * // In a Client Component with cleanup
 * useEffect(() => {
 *   const controller = new AbortController();
 *   getWeatherForecast(controller.signal).then(setForecasts);
 *   return () => controller.abort();
 * }, []);
 * ```
 */
export async function getWeatherForecast(signal?: AbortSignal): Promise<WeatherForecastList> {
    const { data } = await api.GET("/WeatherForecast", { signal });
    return data ?? [];
}

/**
 * Retrieves a specific weather forecast by ID.
 * 
 * @param id - The unique identifier of the forecast
 * @param signal - Optional AbortSignal to cancel the request
 * @returns Promise resolving to the weather forecast or null if not found
 * 
 * @example
 * ```tsx
 * const forecast = await getWeatherForecastById(5);
 * if (forecast) {
 *   console.log(`Temperature: ${forecast.temperatureC}°C`);
 * }
 * ```
 */
export async function getWeatherForecastById(id: number, signal?: AbortSignal): Promise<WeatherForecast | null> {
    const { data } = await api.GET("/WeatherForecast/{id}", {
        params: { path: { id } },
        signal,
    });
    return data ?? null;
}