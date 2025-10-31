import createClient, { Middleware } from "openapi-fetch";
import type { paths } from "@/lib/api/v1"

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5294";

const api = createClient<paths>({ baseUrl: apiBaseUrl });

const myMiddleware: Middleware = {
  async onRequest({ request, options }) {
    request.headers.set("foo", "bar");
    return request;
  },
  async onResponse({ request, response, options }) {
    const { body, ...resOptions } = response;
    return new Response(body, { ...resOptions, status: 200 });
  },
  async onError({ error }) {
    throw new Error("Oops, fetch failed", { cause: error });
  },
};

api.use(myMiddleware);

export{
  api,
};
