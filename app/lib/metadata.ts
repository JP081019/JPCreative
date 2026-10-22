import type { Metadata } from "next";
import { site } from "../data/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "pt_BR",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "JP Creative — Construímos o próximo nível." }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
