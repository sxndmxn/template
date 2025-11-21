/**
 * API Client Configuration
 * 
 * This module sets up a type-safe API client using openapi-fetch.
 * The types are automatically generated from the API's OpenAPI specification,
 * ensuring compile-time type safety for all API requests and responses.
 * 
 * Key features:
 * - Type-safe API calls with autocomplete support
 * - Centralized configuration for base URL and middleware
 * - Request/response interceptors for cross-cutting concerns
 * - Environment-based configuration
 * 
 * @module apiClient
 */

import createClient, { type Middleware } from "openapi-fetch";
import { type paths } from "@/lib/api/v1";

/**
 * API base URL - configurable via environment variable.
 * Defaults to localhost development API if not specified.
 * 
 * Set NEXT_PUBLIC_API_BASE_URL in .env.local to override.
 */
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5294";

/**
 * Type-safe API client instance.
 * All API endpoints and types are inferred from the OpenAPI specification.
 */
const api = createClient<paths>({ baseUrl: apiBaseUrl });

/**
 * Middleware for intercepting requests, responses, and errors.
 * 
 * Use this to add:
 * - Authentication headers (e.g., Bearer tokens)
 * - Logging and monitoring
 * - Request/response transformation
 * - Error handling and retry logic
 */
const middleware: Middleware = {
  /**
   * Called before each request is sent.
   * @param request - The outgoing request
   * @returns Modified request or the original request
   */
  async onRequest({ request }) {
    // Add authentication headers, logging, etc. here
    return request;
  },
  
  /**
   * Called after each successful response.
   * @param response - The response received from the API
   * @returns Modified response or the original response
   */
  async onResponse({ response }) {
    // Transform responses, handle refresh tokens, etc. here
    return response;
  },
  
  /**
   * Called when a request fails or throws an error.
   * @param error - The error that occurred
   * @throws The error to be handled by the caller
   */
  async onError({ error }) {
    // Global error handling, logging, toast notifications, etc. here
    throw error;
  },
};

// Register the middleware with the API client
api.use(middleware);

/**
 * Helper to extract data from successful API responses.
 * @template T - The type of data expected
 * @param r - Response object containing data
 * @returns The data from the response
 */
const onGlobalSuccess = <T>(r: { data: T }) => r.data;

/**
 * Helper to handle API errors consistently.
 * @param err - The error to handle
 * @returns Rejected promise with the error
 */
const onGlobalError = (err: unknown) => Promise.reject(err);

export { api, 
  onGlobalSuccess, 
  onGlobalError,
};
