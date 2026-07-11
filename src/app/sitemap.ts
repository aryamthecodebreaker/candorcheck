import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/benchmark", "/scoring", "/methodology", "/leaderboard"];

  return routes.map((route) => ({
    url: `https://hallucinationbench.vercel.app${route}`,
    lastModified: new Date("2026-07-11"),
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.8,
  }));
}
