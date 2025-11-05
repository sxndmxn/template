import createClient, { type Middleware } from "openapi-fetch";
import { type paths } from "@/lib/api/v1";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5294";
const api = createClient<paths>({ baseUrl: apiBaseUrl });

const middleware: Middleware = {
  async onRequest({ request }) {
    return request;
  },
  async onResponse({ response }) {
    return response;
  },
  async onError({ error }) {
    throw error;
  },
};

api.use(middleware);
const onGlobalSuccess = <T>(r: { data: T }) => r.data;
const onGlobalError = (err: unknown) => Promise.reject(err);

export { api, 
  onGlobalSuccess, 
  onGlobalError,
};
