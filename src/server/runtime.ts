import { env } from "@/env";

export function isFrontendRuntime() {
  if (env.APP_RUNTIME) return env.APP_RUNTIME === "frontend";
  return Boolean(env.BACKEND_API_URL);
}

export function getBackendApiUrl() {
  const value = env.BACKEND_API_URL ?? "";
  return value.trim().length > 0 ? value.replace(/\/+$/, "") : null;
}

export async function proxyRequestToBackend(req: Request, pathOverride?: string) {
  const backendApiUrl = getBackendApiUrl();
  if (!backendApiUrl) {
    throw new Error("BACKEND_API_URL_missing");
  }

  const incomingUrl = new URL(req.url);
  const targetUrl = new URL(
    pathOverride ?? `${incomingUrl.pathname}${incomingUrl.search}`,
    backendApiUrl,
  );
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");

  const init: RequestInit = {
    method: req.method,
    headers,
    cache: "no-store",
    redirect: "manual",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    const body = await req.arrayBuffer();
    if (body.byteLength > 0) {
      init.body = Buffer.from(body);
    }
  }

  const upstream = await fetch(targetUrl, init);
  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("transfer-encoding");

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}
