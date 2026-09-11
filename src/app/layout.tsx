import type { Metadata } from "next";
import type { ReactNode } from "react";
import { media } from "@/lib/media";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rulebase — Monitor every agent. Improve every outcome.",
  description:
    "Rulebase monitors every AI and human customer interaction, finds where outcomes break, and shows the prompt, knowledge, coaching, or process fix that improves resolution.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Served directly from rulebase.co — never copied into this repo. */}
        <link rel="icon" href={media.favicon} />
      </head>
      <body>{children}</body>
    </html>
  );
}
