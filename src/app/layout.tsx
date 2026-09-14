import type { Metadata } from "next";
import type { ReactNode } from "react";
import { media } from "@/lib/media";
import "./globals.css";

export const metadata: Metadata = {
  title: "Octo — Customer Operations Intelligence",
  description:
    "Octo turns every customer conversation into operational intelligence, helping support teams detect failures, understand root causes and improve resolution quality.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Existing asset, untouched pending the visual-branding pass. */}
        <link rel="icon" href={media.favicon} />
      </head>
      <body>{children}</body>
    </html>
  );
}
