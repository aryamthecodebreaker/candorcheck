import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/benchmark", "/scoring", "/compare", "/methodology"];

  return routes.map((route) => ({
    url: `https://candorcheck.vercel.app${route}`,
    lastModified: new Date("2026-07-12"),
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.8,
  }));
}
