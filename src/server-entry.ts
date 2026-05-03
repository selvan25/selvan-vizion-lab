// src/server-entry.ts
// Custom Cloudflare Worker entry — intercepts /api/* before TanStack Start handles the request.
import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import { handleAPI, type Env } from "./api";

const tanstackFetch = createStartHandler(defaultStreamHandler);

export default {
  async fetch(request: Request, env: Env, ctx: unknown): Promise<Response> {
    const url = new URL(request.url);

    // Intercept all /api/* requests — handle before React app
    if (url.pathname.startsWith("/api/")) {
      const apiResponse = await handleAPI(request, env);
      if (apiResponse) return apiResponse;
    }

    // All other requests → TanStack Start (React SSR)
    return tanstackFetch({ request, env, ctx } as unknown as Parameters<typeof tanstackFetch>[0]);
  },
};
