"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type PublicLeadFormProps = {
  source: string;
  title: string;
  description: string;
  ctaLabel: string;
};

export function PublicLeadForm({
  source,
  title,
  description,
  ctaLabel,
}: PublicLeadFormProps) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus("saving");

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        companyName,
        country,
        source,
      }),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStatus("done");
    setEmail("");
    setCompanyName("");
    setCountry("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="surface-panel rounded-[1.75rem] p-5 sm:p-6"
    >
      <div className="text-sm font-medium">{title}</div>
      <p className="mt-2 max-w-md text-sm leading-6 text-black/60">{description}</p>

      <div className="mt-5 grid gap-3">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Work email"
          className="h-11 rounded-full border border-black/12 bg-white px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30"
          autoComplete="email"
          required
        />
        <input
          type="text"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          placeholder="Restaurant or brand"
          className="h-11 rounded-full border border-black/12 bg-white px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30"
          autoComplete="organization"
        />
        <input
          type="text"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          placeholder="Country"
          className="h-11 rounded-full border border-black/12 bg-white px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30"
          autoComplete="country-name"
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "saving"}
          className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-black/88 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "saving" ? "Sending..." : ctaLabel}
        </button>
        <div className="text-xs leading-5 text-black/50">
          No spam. We only use this to respond with launch materials and pricing.
        </div>
      </div>

      {status === "done" ? (
        <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-950">
          Request received. We&apos;ll send the launch pack to your inbox.
        </div>
      ) : null}
      {status === "error" ? (
        <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-950">
          Something failed. Please try again or reach out via the sign-up flow.
        </div>
      ) : null}
    </form>
  );
}
