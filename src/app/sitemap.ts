import type { MetadataRoute } from "next";
import { getFrontendAppUrl } from "@/server/app-url";

const baseUrl = getFrontendAppUrl();

const routes = ["", "/pricing", "/sign-up", "/sign-in", "/app", "/app/launch-setup", "/app/tables", "/app/menu", "/app/live", "/app/settings"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
