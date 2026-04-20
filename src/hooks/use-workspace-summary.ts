"use client";

import { useEffect, useState } from "react";

export type WorkspaceSummary = {
  id: string;
  name: string;
  slug: string;
  role: string;
};

export type GrowthSummary = {
  score: number;
  label: string;
  nextActions: string[];
  publicSignals: {
    branches: number;
    tables: number;
    menus: number;
    qrCodes: number;
    leads: number;
  };
};

export function useWorkspaceSummary() {
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState<WorkspaceSummary | null>(null);
  const [growth, setGrowth] = useState<GrowthSummary | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const res = await fetch("/api/workspaces/me", { cache: "no-store" });
      if (!mounted) return;
      if (res.ok) {
        const json = (await res.json()) as {
          workspace: WorkspaceSummary | null;
          growth: GrowthSummary;
        };
        setWorkspace(json.workspace);
        setGrowth(json.growth);
      }
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { loading, workspace, growth, setWorkspace, setGrowth };
}
