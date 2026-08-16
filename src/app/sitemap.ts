import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { p: "", priority: 1 },
    { p: "/services", priority: 0.9 },
    { p: "/approach", priority: 0.9 },
    { p: "/about", priority: 0.8 },
    { p: "/rates", priority: 0.8 },
    { p: "/faq", priority: 0.7 },
    { p: "/contact", priority: 0.7 },
    { p: "/begin", priority: 0.9 },
    { p: "/privacy", priority: 0.3 },
    { p: "/good-faith-estimate", priority: 0.3 },
  ];

  return [
    ...routes.map((r) => ({
      url: `${site.url}${r.p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
