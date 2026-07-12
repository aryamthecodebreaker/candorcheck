import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://candorcheck.vercel.app"),
  title: {
    default: "CandorCheck — See when AI starts guessing",
    template: "%s · CandorCheck",
  },
  description:
    "An open-source, local-first pressure test for examining when an AI guesses, over-refuses, or stays honestly useful.",
  openGraph: {
    title: "CandorCheck",
    description:
      "Run difficult prompts, score the first response locally, and export a transparent behavioral report.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CandorCheck",
    description: "See when AI starts guessing—without uploading the response.",
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
