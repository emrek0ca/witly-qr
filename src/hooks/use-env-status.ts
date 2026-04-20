"use client";

import { useEffect, useState } from "react";

export type EnvStatus = {
  clerk: boolean;
  database: boolean;
  iyzico: boolean;
  appUrl: string | null;
};

export function useEnvStatus() {
  const [status, setStatus] = useState<EnvStatus | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const res = await fetch("/api/health/env", { cache: "no-store" });
      if (!mounted || !res.ok) return;
      const json = (await res.json()) as { status: EnvStatus };
      setStatus(json.status);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return status;
}
