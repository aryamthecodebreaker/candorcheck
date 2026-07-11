import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://hallucinationbench.vercel.app"),
  title: {
    default: "HallucinationBench — One prompt. 24 traps.",
    template: "%s · HallucinationBench",
  },
  description:
    "A transparent 24-part benchmark for measuring AI hallucination, groundedness, abstention, and capability honesty in one message.",
  openGraph: {
    title: "HallucinationBench",
    description:
      "One prompt. 24 independent tests. A measurable picture of AI factual reliability.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HallucinationBench",
    description: "One prompt. 24 traps. Less guessing, more evidence.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
