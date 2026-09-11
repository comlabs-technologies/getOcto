import { media } from "@/lib/media";

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export type MenuItem = { title: string; description: string; href: string };

export const megaMenu: {
  columns: { heading: string; items: MenuItem[] }[];
  footer: MenuItem;
} = {
  columns: [
    {
      heading: "AI agents",
      items: [
        {
          title: "Agent monitoring",
          description: "Monitor every AI interaction and customer outcome.",
          href: "#agent-workspace",
        },
        {
          title: "Simulations",
          description: "Test agents safely before changes go live.",
          href: "#agent-workspace",
        },
        {
          title: "Self improvements",
          description: "Turn failures into prompt, knowledge, and tool fixes.",
          href: "#outcomes",
        },
      ],
    },
    {
      heading: "Human agents",
      items: [
        {
          title: "AutoQA",
          description: "Review every interaction, not a sample.",
          href: "#agent-workspace",
        },
        {
          title: "Insights",
          description: "Find quality gaps, risks, and customer signals.",
          href: "#outcomes",
        },
        {
          title: "Coaching",
          description: "Turn QA findings into focused coaching.",
          href: "#agent-workspace",
        },
      ],
    },
  ],
  footer: {
    title: "MCP",
    description: "Connect Rulebase to your customer systems.",
    href: "#integrations",
  },
};

export const primaryNav: { label: string; href: string }[] = [
  { label: "Media", href: "#case-study" },
  { label: "Careers", href: "#footer" },
  { label: "Contact", href: "#footer" },
];

/* -------------------------------------------------------------------------- */
/* Trust strip                                                                */
/* -------------------------------------------------------------------------- */

export type TrustLogo = {
  name: string;
  src: string;
  label?: string;
  wordmarkClass?: string;
};

export const trustLogos: TrustLogo[] = [
  { name: "Qonto", src: media.markQonto },
  { name: "Lesaka", src: media.markLesaka, label: "Nasdaq: LSAK" },
  { name: "nala", src: media.markNala, wordmarkClass: "lowercase" },
  { name: "Rho", src: media.markRho, label: "Case study" },
  { name: "Interswitch", src: media.markInterswitch },
  { name: "Kuda", src: media.markKuda, label: "Case study" },
];

/* -------------------------------------------------------------------------- */
/* Agent workspace                                                            */
/* -------------------------------------------------------------------------- */

export type WorkspaceCard = {
  id: string;
  title: string;
  description: string;
};

export const workspaceTabs: {
  id: "ai" | "human";
  label: string;
  cards: WorkspaceCard[];
}[] = [
  {
    id: "ai",
    label: "AI Agents",
    cards: [
      {
        id: "monitor",
        title: "Monitor",
        description:
          "Review every AI and human interaction across chat, voice, and workflows.",
      },
      {
        id: "detect",
        title: "Detect",
        description:
          "Find silent failures, quality gaps, policy breaches, and emerging risk.",
      },
      {
        id: "diagnose",
        title: "Diagnose",
        description:
          "Compare failed AI journeys with human resolutions to find root causes.",
      },
      {
        id: "improve",
        title: "Improve",
        description:
          "Prioritize fixes, automate recovery, and measure the impact on outcomes.",
      },
    ],
  },
  {
    id: "human",
    label: "Human agents",
    cards: [
      {
        id: "listen",
        title: "Listen",
        description:
          "Score every conversation across chat, voice, and email instead of a sample.",
      },
      {
        id: "assist",
        title: "Assist",
        description:
          "Surface the policy, account history, and next step while the customer waits.",
      },
      {
        id: "coaching",
        title: "Coaching",
        description:
          "Turn QA findings into focused coaching and track whether behaviour changes.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Outcome showcase modes                                                     */
/* -------------------------------------------------------------------------- */

export type ShowcaseMode = {
  id: "monitoring" | "self-improvement" | "customer-intelligence";
  title: string;
  description: string;
};

export const showcaseModes: ShowcaseMode[] = [
  {
    id: "monitoring",
    title: "Monitoring",
    description:
      "See every AI and human agent failure, not only the ones customers complain about.",
  },
  {
    id: "self-improvement",
    title: "Self improvement",
    description:
      "Close the loop from a detected failure to the prompt, knowledge, or process fix.",
  },
  {
    id: "customer-intelligence",
    title: "Customer intelligence",
    description:
      "Unify what every conversation says about churn, risk, and revenue.",
  },
];

/* -------------------------------------------------------------------------- */
/* Security                                                                   */
/* -------------------------------------------------------------------------- */

export type SecurityFeature = {
  id: string;
  title: string;
  description: string;
  icon: "soc" | "gdpr" | "pci" | "encryption";
};

export const securityFeatures: SecurityFeature[] = [
  {
    id: "soc",
    title: "SOC Type 2",
    description:
      "We are SOC 2 Type II compliant for access controls and complete management of data across all our systems.",
    icon: "soc",
  },
  {
    id: "gdpr",
    title: "GDPR",
    description:
      "With our residency controls, we are also under GDPR — the world's strictest standard for data privacy.",
    icon: "gdpr",
  },
  {
    id: "pci",
    title: "PCI DSS",
    description:
      "We protect cardholder and payment data in line with PCI DSS standards, and ring-fence processing across environments.",
    icon: "pci",
  },
  {
    id: "encryption",
    title: "Encryption",
    description:
      "We encrypt your data with AES-256 at rest and TLS 1.3 in transit, ensuring end-to-end protection for every byte.",
    icon: "encryption",
  },
];

/* -------------------------------------------------------------------------- */
/* Sticky problem sequence                                                    */
/* -------------------------------------------------------------------------- */

export type ProblemPanel = {
  id: string;
  heading: string;
  rows: { label: string; value: string; tone: "neutral" | "warn" | "risk" }[];
  texture?: string;
};

export const problemPanels: ProblemPanel[] = [
  {
    id: "atlas",
    heading: "Atlas support AI",
    rows: [
      { label: "Agent reply", value: "Sent", tone: "neutral" },
      { label: "Customer outcome", value: "Unknown", tone: "warn" },
      { label: "Complaint risk", value: "Rising", tone: "risk" },
    ],
    texture: media.textureChatStone,
  },
  {
    id: "gap",
    heading: "Monitoring gap",
    rows: [
      { label: "Failure marked resolved", value: "0:09", tone: "neutral" },
      { label: "Customer still waiting", value: "1w", tone: "risk" },
    ],
  },
  {
    id: "outcome",
    heading: "Customer outcome",
    rows: [
      { label: "Complaint escalated", value: "Now", tone: "risk" },
      { label: "Valuable customer at risk", value: "Now", tone: "risk" },
    ],
    texture: media.textureStoneRelief,
  },
];

export const problemStatement =
  "AI and human agents go unmonitored. Silent failures stay detached from customer outcomes until complaints escalate and valuable customers leave.";

/* -------------------------------------------------------------------------- */
/* Integration grid                                                           */
/* -------------------------------------------------------------------------- */

export type IntegrationCell =
  | { kind: "empty" }
  | { kind: "rulebase" }
  | { kind: "tile"; src: string; name: string }
  | { kind: "mark"; src: string; name: string }
  | { kind: "wordmark"; name: string };

const t = media.tiles;
const tile = (src: string, name: string): IntegrationCell => ({
  kind: "tile",
  src,
  name,
});
const word = (name: string): IntegrationCell => ({ kind: "wordmark", name });
const empty: IntegrationCell = { kind: "empty" };

/** The remaining supplied anonymous marks, rendered as low-opacity tiles. */
const mark = (i: number, name: string): IntegrationCell => ({
  kind: "mark",
  src: media.integrationMarks[i],
  name,
});

/** Three rows of fourteen square cells, clipped by the viewport. */
export const integrationRows: IntegrationCell[][] = [
  [
    empty,
    mark(0, "Workforce platform"),
    word("Avaya"),
    empty,
    tile(t.r0c4, "Helpdesk platform"),
    tile(t.r0c5, "Telephony platform"),
    word("Zendesk"),
    tile(t.r0c7, "Knowledge platform"),
    tile(t.r0c8, "Workflow platform"),
    word("Visa"),
    tile(t.r0c10, "CRM platform"),
    tile(t.r0c11, "Messaging platform"),
    tile(t.r0c12, "Analytics platform"),
    tile(t.r0c13, "Payments platform"),
  ],
  [
    mark(1, "Survey platform"),
    word("Five9"),
    empty,
    tile(t.r1c6, "Contact centre platform"),
    word("Google Drive"),
    word("Intercom"),
    { kind: "rulebase" },
    tile(t.r1c7, "Ticketing platform"),
    word("Stripe"),
    tile(t.r1c10, "Data warehouse"),
    word("Salesforce"),
    tile(t.r1c12, "Identity platform"),
    tile(t.r1c13, "Storage platform"),
    mark(2, "Billing platform"),
  ],
  [
    empty,
    empty,
    mark(3, "Scheduling platform"),
    word("Mastercard"),
    tile(t.r2c4, "Voice platform"),
    empty,
    word("Freshdesk"),
    empty,
    tile(t.r2c8, "Collaboration platform"),
    word("Help Scout"),
    mark(4, "Ledger platform"),
    word("Crisp"),
    empty,
    empty,
  ],
];

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export type FooterColumn = {
  heading: string;
  links: { label: string; href: string; action?: "cookies" }[];
};

export const footerColumns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Agent monitoring", href: "#agent-workspace" },
      { label: "Simulations", href: "#agent-workspace" },
      { label: "Self improvements", href: "#outcomes" },
      { label: "AutoQA", href: "#agent-workspace" },
      { label: "Insights", href: "#outcomes" },
      { label: "Coaching", href: "#agent-workspace" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Media", href: "#case-study" },
      { label: "Careers", href: "#footer" },
      { label: "Contact", href: "#footer" },
      { label: "Trust and Security", href: "#security" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Terms and Conditions", href: "#footer" },
      { label: "Privacy Policy", href: "#footer" },
      { label: "Cookie Settings", href: "#cookie-settings", action: "cookies" },
    ],
  },
  {
    heading: "MCP",
    links: [
      { label: "Skills library", href: "#integrations" },
      { label: "MCP for Intercom", href: "#integrations" },
      { label: "MCP for Zendesk", href: "#integrations" },
      { label: "MCP for Freshdesk", href: "#integrations" },
      { label: "MCP for Help Scout", href: "#integrations" },
      { label: "MCP for Crisp", href: "#integrations" },
    ],
  },
];
