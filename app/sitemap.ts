import type { MetadataRoute } from "next";
import { caseStudies } from "./data/projects";
import { site } from "./data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/projetos", "/solucoes", "/sobre", "/contato", ...caseStudies.map(({ slug }) => `/projetos/${slug}`)];
  // Preliminary legal pages remain noindex until approved.
  return routes.map((path) => ({ url: `${site.url}${path === "/" ? "" : path}`, changeFrequency: "monthly", priority: path === "/" ? 1 : .7 }));
}
