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
      heading: "AI operations",
      items: [
        {
          title: "Conversation monitoring",
          description:
            "See where service quality breaks across every interaction.",
          href: "#agent-workspace",
        },
        {
          title: "Resolution intelligence",
          description: "Learn from successful resolutions and reuse what works.",
          href: "#outcomes",
        },
        {
          title: "Customer signals",
          description: "Identify friction, escalation risk and churn behaviour.",
          href: "#outcomes",
        },
      ],
    },
    {
      heading: "Human operations",
      items: [
        {
          title: "Quality insights",
          description: "Review every interaction, not a sample of them.",
          href: "#agent-workspace",
        },
        {
          title: "Workflow improvement",
          description: "Turn recurring patterns into stronger workflows.",
          href: "#outcomes",
        },
        {
          title: "Coaching",
          description: "Turn review findings into specific coaching.",
          href: "#agent-workspace",
        },
      ],
    },
  ],
  footer: {
    title: "Integrations",
    description: "Connect Octo to the systems your operation runs on.",
    href: "#integrations",
  },
};

export const primaryNav: { label: string; href: string }[] = [
  { label: "Stories", href: "#case-study" },
  { label: "Company", href: "#footer" },
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

/**
 * Illustrative marks only. The image assets are unchanged, but nothing here
 * names a company or implies one is an Octo customer — `name` is a sector
 * descriptor used for the accessible name and the typeset fallback.
 */
export const trustLogos: TrustLogo[] = [
  { name: "Business banking platform", src: media.markQonto },
  { name: "Payments group", src: media.markLesaka },
  { name: "Money transfer service", src: media.markNala },
  { name: "Treasury platform", src: media.markRho },
  { name: "Payment processor", src: media.markInterswitch },
  { name: "Digital bank", src: media.markKuda },
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
    label: "AI operations",
    cards: [
      {
        id: "monitor",
        title: "Observe",
        description:
          "Bring chat, voice and workflow interactions into one operational view.",
      },
      {
        id: "detect",
        title: "Detect",
        description:
          "Surface unresolved issues, policy gaps, repeat contacts and emerging risk.",
      },
      {
        id: "diagnose",
        title: "Understand",
        description:
          "Connect failed interactions with customer history and successful resolutions.",
      },
      {
        id: "improve",
        title: "Improve",
        description:
          "Turn recurring patterns into clearer guidance, stronger workflows and better outcomes.",
      },
    ],
  },
  {
    id: "human",
    label: "Human operations",
    cards: [
      {
        id: "listen",
        title: "Listen",
        description:
          "Review every conversation across chat, voice and email instead of a sample.",
      },
      {
        id: "assist",
        title: "Assist",
        description:
          "Surface the policy, account history and next step while the customer waits.",
      },
      {
        id: "coaching",
        title: "Coaching",
        description:
          "Turn review findings into focused coaching and track whether behaviour changes.",
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
    title: "Conversation monitoring",
    description:
      "See where service quality breaks across AI and human interactions.",
  },
  {
    id: "self-improvement",
    title: "Resolution intelligence",
    description:
      "Learn from successful resolutions and reuse what works.",
  },
  {
    id: "customer-intelligence",
    title: "Customer signals",
    description:
      "Identify friction, escalation risk and changing customer behaviour.",
  },
];

/* -------------------------------------------------------------------------- */
/* Security                                                                   */
/* -------------------------------------------------------------------------- */

export type SecurityFeature = {
  id: string;
  title: string;
  description: string;
  /** Icon keys are unchanged so the section's illustrations stay identical. */
  icon: "soc" | "gdpr" | "pci" | "encryption";
};

export const securityFeatures: SecurityFeature[] = [
  {
    id: "access",
    title: "Access controls",
    description:
      "Role-based permissions help teams control who can view conversations and operational data.",
    icon: "soc",
  },
  {
    id: "governance",
    title: "Data governance",
    description:
      "Configurable retention and handling policies support responsible customer-data management.",
    icon: "gdpr",
  },
  {
    id: "workflows",
    title: "Protected workflows",
    description:
      "Sensitive actions can require review, approval and complete audit history.",
    icon: "pci",
  },
  {
    id: "encryption",
    title: "Encryption",
    description:
      "Data is designed to remain encrypted in transit and at rest, across every integration.",
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
  "When customer conversations disappear into disconnected queues, unresolved risk compounds. Octo reconnects the interaction, operational response and final outcome.";

/* -------------------------------------------------------------------------- */
/* Integration grid                                                           */
/* -------------------------------------------------------------------------- */

export type IntegrationCell =
  | { kind: "empty" }
  | { kind: "brand" }
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
    { kind: "brand" },
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
      { label: "Conversation monitoring", href: "#outcomes" },
      { label: "Resolution intelligence", href: "#outcomes" },
      { label: "Customer signals", href: "#outcomes" },
      { label: "Workflow improvement", href: "#agent-workspace" },
      { label: "Quality insights", href: "#agent-workspace" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Stories", href: "#case-study" },
      { label: "Company", href: "#footer" },
      { label: "Contact", href: "#footer" },
      { label: "Security", href: "#security" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Product overview", href: "#outcomes" },
      { label: "Privacy", href: "#footer" },
      { label: "Terms", href: "#footer" },
      { label: "Cookie settings", href: "#cookie-settings", action: "cookies" },
    ],
  },
  {
    heading: "Integrations",
    links: [
      { label: "Support platforms", href: "#integrations" },
      { label: "Contact centres", href: "#integrations" },
      { label: "CRM systems", href: "#integrations" },
      { label: "Knowledge tools", href: "#integrations" },
      { label: "Workflow systems", href: "#integrations" },
    ],
  },
];
