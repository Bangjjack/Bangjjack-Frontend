import { useState, type ReactNode } from "react";

const COLOR_GROUPS = [
  {
    title: "Brand",
    tokens: [
      "brand-primary",
      "brand-primary-light",
      "brand-primary-dark",
      "brand-secondary",
      "brand-secondary-light",
      "brand-secondary-dark",
    ],
  },
  {
    title: "Button",
    tokens: [
      "button-primary",
      "button-primary-pressed",
      "button-primary-ghost",
      "button-disabled",
      "button-neutral-ghost",
      "button-neutral",
      "button-neutral-pressed",
    ],
  },
  {
    title: "Text",
    tokens: [
      "text-normal",
      "text-strong",
      "text-alternative",
      "text-disabled",
      "text-placeholder",
      "text-caption",
      "text-label",
      "text-on-primary",
      "text-on-secondary",
      "text-on-success",
      "text-primary-normal",
      "text-primary-strong",
      "text-primary-alternative",
      "text-primary-disabled",
      "text-secondary-normal",
      "text-secondary-strong",
      "text-secondary-alternative",
    ],
  },
  {
    title: "Icon",
    tokens: [
      "icon-normal",
      "icon-strong",
      "icon-alternative",
      "icon-disabled",
      "icon-on-primary",
      "icon-on-secondary",
      "icon-primary-normal",
      "icon-primary-strong",
      "icon-primary-alternative",
      "icon-primary-disabled",
    ],
  },
  {
    title: "State",
    tokens: [
      "state-success",
      "state-success-light",
      "state-success-strong",
      "state-caution",
      "state-error",
      "state-error-light",
      "state-error-strong",
      "state-error-2",
    ],
  },
  {
    title: "Background",
    tokens: ["bg-primary", "bg-secondary", "bg-input", "bg-elevated", "bg-skeleton", "bg-overlay"],
  },
  {
    title: "Border",
    tokens: [
      "border-normal",
      "border-strong",
      "border-alternative",
      "border-disabled",
      "border-focus-primary",
      "border-focus-error",
    ],
  },
  {
    title: "Neutral",
    tokens: [
      "neutral-50",
      "neutral-100",
      "neutral-150",
      "neutral-200",
      "neutral-250",
      "neutral-300",
      "neutral-350",
      "neutral-400",
      "neutral-500",
      "neutral-600",
      "neutral-700",
      "neutral-800",
      "neutral-900",
      "neutral-black",
      "neutral-white",
    ],
  },
] as const;

const TYPOGRAPHY_TOKENS = [
  { name: "typo-h1", label: "Heading 1", meta: "36 / 44 / 700" },
  { name: "typo-h2", label: "Heading 2", meta: "32 / 40 / 700" },
  { name: "typo-h3", label: "Heading 3", meta: "24 / 30 / 700" },
  { name: "typo-h4", label: "Heading 4", meta: "20 / 24 / 700" },
  { name: "typo-title1", label: "Title 1", meta: "18 / 22 / 600" },
  { name: "typo-title2", label: "Title 2", meta: "16 / 20 / 600" },
  { name: "typo-title3", label: "Title 3", meta: "14 / 18 / 600" },
  { name: "typo-title4", label: "Title 4", meta: "12 / 16 / 600" },
  { name: "typo-body1", label: "Body 1", meta: "16 / 24 / 500" },
  { name: "typo-body2", label: "Body 2", meta: "14 / 20 / 500" },
  { name: "typo-caption1", label: "Caption 1", meta: "14 / 20 / 500" },
  { name: "typo-caption2", label: "Caption 2", meta: "12 / 16 / 500" },
  { name: "typo-button1", label: "Button 1", meta: "16 / 24 / 700" },
  { name: "typo-button2", label: "Button 2", meta: "14 / 20 / 600" },
  { name: "typo-label1", label: "Label 1", meta: "12 / 16 / 700" },
  { name: "typo-label2", label: "Label 2", meta: "12 / 16 / 500" },
] as const;

const SPACING_TOKENS = [
  { key: 0, value: "0" },
  { key: 100, value: "4px" },
  { key: 200, value: "8px" },
  { key: 300, value: "12px" },
  { key: 400, value: "16px" },
  { key: 450, value: "18px" },
  { key: 500, value: "20px" },
  { key: 600, value: "24px" },
  { key: 700, value: "32px" },
  { key: 800, value: "40px" },
] as const;

const RADIUS_TOKENS = [
  { name: "rounded-small", value: "8px" },
  { name: "rounded-medium", value: "12px" },
  { name: "rounded-large", value: "25px" },
] as const;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-400 rounded-medium border border-border-normal bg-bg-secondary p-500">
      <h2 className="typo-h3 text-text-strong">{title}</h2>
      {children}
    </section>
  );
}

function ColorSwatch({ token }: { token: string }) {
  const cssVar = `--color-${token}`;
  const [hex] = useState(() =>
    getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim(),
  );

  return (
    <div className="flex items-center gap-300">
      <div
        className="size-700 shrink-0 rounded-medium border border-border-normal"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="min-w-0 flex-1">
        <p className="typo-body2 truncate text-text-strong">{token}</p>
        <p className="typo-caption2 truncate text-text-caption">{hex || cssVar}</p>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="mx-auto max-w-[1024px] space-y-500 px-500 py-700">
        <header className="space-y-200">
          <h1 className="typo-h1 text-text-strong">Design System</h1>
        </header>

        <Section title="Typography">
          <div className="space-y-400">
            {TYPOGRAPHY_TOKENS.map((t, i) => (
              <div
                key={t.name}
                className={`flex flex-wrap items-baseline gap-x-400 gap-y-100 ${
                  i < TYPOGRAPHY_TOKENS.length - 1 ? "border-b border-border-normal pb-300" : ""
                }`}
              >
                <span className={`${t.name} text-text-strong`}>
                  {t.label} — 방짝에 오신 것을 환영합니다
                </span>
                <span className="typo-caption2 text-text-caption">
                  .{t.name} · {t.meta}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Font Weight">
          <div className="space-y-200">
            <p className="typo-body1 font-medium text-text-normal">
              Medium (500) — 방짝에 오신 것을 환영합니다
            </p>
            <p className="typo-body1 font-semibold text-text-normal">
              Semibold (600) — 방짝에 오신 것을 환영합니다
            </p>
            <p className="typo-body1 font-bold text-text-normal">
              Bold (700) — 방짝에 오신 것을 환영합니다
            </p>
          </div>
        </Section>

        <Section title="Colors">
          <div className="space-y-500">
            {COLOR_GROUPS.map((group) => (
              <div key={group.title} className="space-y-300">
                <h3 className="typo-title1 text-text-strong">{group.title}</h3>
                <div className="grid grid-cols-1 gap-300 sm:grid-cols-2 lg:grid-cols-3">
                  {group.tokens.map((token) => (
                    <ColorSwatch key={token} token={token} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Spacing">
          <div className="space-y-300">
            {SPACING_TOKENS.map((s) => (
              <div key={s.key} className="flex items-center gap-400">
                <span className="typo-caption1 w-[120px] text-text-strong">spacing-{s.key}</span>
                <div
                  className="h-400 bg-brand-primary"
                  style={{ width: `var(--spacing-${s.key})` }}
                />
                <span className="typo-caption2 text-text-caption">{s.value}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Border Radius">
          <div className="flex flex-wrap gap-500">
            {RADIUS_TOKENS.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-200">
                <div
                  className="h-[80px] w-[80px] bg-brand-primary"
                  style={{ borderRadius: `var(--radius-${r.name.split("-")[1]})` }}
                />
                <span className="typo-caption1 text-text-strong">{r.name}</span>
                <span className="typo-caption2 text-text-caption">{r.value}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
