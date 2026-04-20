"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Icon } from "@/components/icon";

type PublicLeadFormProps = {
  source: string;
  ctaLabel: string;
};

export function PublicLeadForm({ source, ctaLabel }: PublicLeadFormProps) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus("saving");

    const params = new URLSearchParams(window.location.search);
    const referrerCode = params.get("ref") ?? "";
    const utmSource = params.get("utm_source") ?? "";
    const utmMedium = params.get("utm_medium") ?? "";
    const utmCampaign = params.get("utm_campaign") ?? "";
    const landingPath = `${window.location.pathname}${window.location.search}`;

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        companyName: companyName || undefined,
        source,
        referrerCode: referrerCode || undefined,
        utmSource: utmSource || undefined,
        utmMedium: utmMedium || undefined,
        utmCampaign: utmCampaign || undefined,
        landingPath: landingPath || undefined,
      }),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("done");
    setEmail("");
    setCompanyName("");
  }

  return (
    <form onSubmit={onSubmit} className="surface-panel rounded-[1.75rem] p-4 sm:p-5">
      <div className="mt-4 grid gap-3">
        <label className="flex items-center gap-3 rounded-full border border-black/12 bg-white px-4 py-1.5 shadow-[0_1px_0_rgba(23,20,18,0.02)]">
          <Icon name="mail" className="size-4 text-black/35" />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-black/28"
            autoComplete="email"
            required
          />
        </label>

        <label className="flex items-center gap-3 rounded-full border border-black/12 bg-white px-4 py-1.5 shadow-[0_1px_0_rgba(23,20,18,0.02)]">
          <Icon name="spark" className="size-4 text-black/35" />
          <input
            type="text"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            placeholder="Brand"
            className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-black/28"
            autoComplete="organization"
          />
        </label>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "saving"}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-4 text-sm font-medium text-white transition hover:bg-black/88 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Icon name="arrow-right" className="size-4" />
          {status === "saving" ? "..." : ctaLabel}
        </button>
        <div className="flex flex-1 items-center justify-end gap-2 rounded-full border border-black/8 bg-black/[0.02] px-4 py-3 text-black/42">
          <Icon name="spark" className="size-4" />
        </div>
      </div>

      {status === "done" ? (
        <div className="mt-3 inline-flex rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-950">
          <Icon name="check" className="size-4" />
        </div>
      ) : null}
      {status === "error" ? (
        <div className="mt-3 inline-flex rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-950">
          <Icon name="x" className="size-4" />
        </div>
      ) : null}
    </form>
  );
}
