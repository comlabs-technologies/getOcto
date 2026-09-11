"use client";

/**
 * Delicate orange node-and-line illustrations for the workspace columns.
 * Drawn as original inline SVG so each one can carry its own meaning and
 * scale cleanly at every breakpoint.
 */

const STROKE = "#fe4c00";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 300 130"
      fill="none"
      aria-hidden="true"
      className="h-auto w-full"
    >
      <line
        x1="0"
        y1="129.5"
        x2="300"
        y2="129.5"
        stroke="rgba(30,30,30,0.08)"
      />
      {children}
    </svg>
  );
}

function Node({
  cx,
  cy,
  delay = 0,
}: {
  cx: number;
  cy: number;
  delay?: number;
}) {
  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r="7"
        fill={STROKE}
        className="node-pulse"
        style={{ animationDelay: `${delay}s`, opacity: 0.35 }}
      />
      <circle cx={cx} cy={cy} r="3" fill={STROKE} />
    </>
  );
}

const line = {
  stroke: STROKE,
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function WorkflowGlyph({ id }: { id: string }) {
  switch (id) {
    /* ---------------------------------------------------------------- AI */
    case "monitor":
      return (
        <Frame>
          <path d="M0 52H300" {...line} />
          <path d="M0 78H300" {...line} />
          <path d="M150 52V78" {...line} strokeDasharray="3 4" />
          <Node cx={150} cy={52} />
          <Node cx={150} cy={78} delay={0.4} />
        </Frame>
      );

    case "detect":
      return (
        <Frame>
          <path d="M0 86H118L150 22L182 86H300" {...line} />
          <path d="M150 22V86" {...line} strokeDasharray="3 4" />
          <Node cx={150} cy={22} />
        </Frame>
      );

    case "diagnose":
      return (
        <Frame>
          <path d="M0 26C86 26 112 104 300 104" {...line} />
          <path d="M0 104C86 104 112 26 300 26" {...line} />
          <Node cx={150} cy={65} />
        </Frame>
      );

    case "improve":
      return (
        <Frame>
          <path d="M0 104C78 104 132 98 186 66C226 42 258 30 300 26" {...line} />
          <path d="M186 66V104" {...line} strokeDasharray="3 4" />
          <Node cx={186} cy={66} />
          <Node cx={276} cy={28} delay={0.5} />
        </Frame>
      );

    /* ------------------------------------------------------------- human */
    case "listen":
      return (
        <Frame>
          <path d="M0 65H108" {...line} />
          <path d="M192 65H300" {...line} />
          <path d="M128 40C114 54 114 76 128 90" {...line} />
          <path d="M172 40C186 54 186 76 172 90" {...line} />
          <path d="M112 24C90 44 90 86 112 106" {...line} opacity={0.5} />
          <path d="M188 24C210 44 210 86 188 106" {...line} opacity={0.5} />
          <Node cx={150} cy={65} />
        </Frame>
      );

    case "assist":
      return (
        <Frame>
          <path d="M0 65H132" {...line} />
          <path d="M132 65C172 65 186 34 300 34" {...line} />
          <path d="M132 65C172 65 186 96 300 96" {...line} />
          <Node cx={132} cy={65} />
          <Node cx={264} cy={34} delay={0.6} />
        </Frame>
      );

    case "coaching":
      return (
        <Frame>
          <path d="M0 100H82V74H166V48H248V26H300" {...line} />
          <Node cx={82} cy={100} />
          <Node cx={166} cy={74} delay={0.3} />
          <Node cx={248} cy={48} delay={0.6} />
        </Frame>
      );

    default:
      return null;
  }
}
