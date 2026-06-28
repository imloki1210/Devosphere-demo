import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://devosphere-demo.vercel.app";

  // Static pages
  const staticRoutes = [
    "",
    "/who-we-are",
    "/careers",
    "/contact",
    "/industries",
    "/our-clients",
    "/resources",
    "/services",
    "/services/how-it-works",
    "/services/technologies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic career opening pages from database
  try {
    const jobs = await db.jobOpening.findMany({
      select: { id: true, createdAt: true },
    });

    const jobRoutes = jobs.map((job) => ({
      url: `${baseUrl}/careers/${job.id}`,
      lastModified: job.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...jobRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
