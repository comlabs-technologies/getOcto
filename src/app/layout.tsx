import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Octo — Customer Operations Intelligence",
  description:
    "Octo turns every customer conversation into operational intelligence, helping support teams detect failures, understand root causes and improve resolution quality.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* Icons come from src/app/icon.svg, icon.png and apple-icon.png. */}
      <body>{children}</body>
    </html>
  );
}
