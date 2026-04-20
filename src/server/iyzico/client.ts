import crypto from "node:crypto";
import { env } from "@/env";

export type IyzicoConfig = {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
};

type IyzicoRequestOptions = {
  path: string;
  body: unknown;
};

function toJson(body: unknown) {
  return JSON.stringify(body ?? {});
}

function buildAuthorizationHeader(cfg: IyzicoConfig, rnd: string, bodyJson: string) {
  const hash = crypto.createHash("sha1").update(bodyJson).digest("base64");
  const signature = crypto
    .createHmac("sha256", cfg.secretKey)
    .update(`${cfg.apiKey}${rnd}${hash}`)
    .digest("base64");

  return `IYZWSv2 ${Buffer.from(`${cfg.apiKey}:${signature}`).toString("base64")}`;
}

export async function iyzicoRequest<T>({ path, body }: IyzicoRequestOptions): Promise<T> {
  const cfg: IyzicoConfig = {
    apiKey: env.IYZICO_API_KEY ?? "",
    secretKey: env.IYZICO_SECRET_KEY ?? "",
    baseUrl: env.IYZICO_BASE_URL ?? "",
  };

  if (!cfg.apiKey || !cfg.secretKey || !cfg.baseUrl) {
    throw new Error("IYZICO_ENV_missing");
  }

  const rnd = `${Date.now()}`;
  const bodyJson = toJson(body);

  const res = await fetch(`${cfg.baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: buildAuthorizationHeader(cfg, rnd, bodyJson),
      "x-iyzi-rnd": rnd,
    },
    body: bodyJson,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`iyzico_request_failed status=${res.status} body=${text.slice(0, 500)}`);
  }

  return (await res.json()) as T;
}
