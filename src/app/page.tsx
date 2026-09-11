import { AgentWorkspace } from "@/components/agent-workspace";
import { CookiePreferencesProvider } from "@/components/cookie-preferences";
import { Hero } from "@/components/hero";
import { IntegrationGrid } from "@/components/integration-grid";
import { OutcomeShowcase } from "@/components/outcome-showcase";
import { ProblemSequence } from "@/components/problem-sequence";
import { RhoCaseStudy } from "@/components/rho-case-study";
import { SecuritySection } from "@/components/security-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrustMarquee } from "@/components/trust-marquee";
import { VideoModalProvider } from "@/components/video-modal";

export default function HomePage() {
  return (
    <CookiePreferencesProvider>
      <VideoModalProvider>
        <SiteHeader />
        <main>
          <Hero />
          <TrustMarquee />
          <AgentWorkspace />
          <OutcomeShowcase />
          <RhoCaseStudy />
          <SecuritySection />
          <ProblemSequence />
          <IntegrationGrid />
        </main>
        <SiteFooter />
      </VideoModalProvider>
    </CookiePreferencesProvider>
  );
}
