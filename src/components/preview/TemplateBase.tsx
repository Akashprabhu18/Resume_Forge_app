// ─── Shared template rendering utilities ─────────────────────────────────────
// All templates import from here to avoid duplicating section-rendering logic.

import {
  ResumeData, ResumeTheme,
  ExperienceSection, EducationSection, SkillsSection,
  ProjectsSection, CertificationsSection, SummarySection, CustomSection,
  ResumeSection,
} from "@/types/resume";
import { DynamicIcon } from "@/components/ui/IconPicker";

// ─── Tiny helpers ────────────────────────────────────────────
export function HtmlContent({ html, style }: { html: string; style?: React.CSSProperties }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ fontSize: 12, lineHeight: 1.65, ...style }}
    />
  );
}

export function DateRange({ start, end, current, style }: {
  start?: string; end?: string; current?: boolean; style?: React.CSSProperties;
}) {
  if (!start && !end) return null;
  return (
    <span style={{ fontSize: 11, whiteSpace: "nowrap", ...style }}>
      {start}{start && " – "}{current ? "Present" : end}
    </span>
  );
}

export function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11 }}>{name}</span>
        <span style={{ fontSize: 10, opacity: 0.6 }}>{level * 20}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "rgba(0,0,0,0.1)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${level * 20}%`, background: color, borderRadius: 2 }} />
      </div>
    </div>
  );
}

export function SkillPill({ name, color, bg }: { name: string; color: string; bg: string }) {
  return (
    <span style={{
      display: "inline-flex", padding: "2px 8px", borderRadius: 20,
      fontSize: 10, fontWeight: 500, background: bg, color, border: `1px solid ${color}30`,
      marginRight: 4, marginBottom: 4,
    }}>{name}</span>
  );
}

export function ContactRow({ personal, theme, sep = " · " }: {
  personal: ResumeData["personal"]; theme: ResumeTheme; sep?: string;
}) {
  const items = [
    personal.email, personal.phone, personal.location,
    personal.linkedin, personal.website, personal.github,
  ].filter(Boolean);
  return (
    <div style={{ fontSize: 11, color: theme.muted, display: "flex", flexWrap: "wrap", gap: "3px 0" }}>
      {items.map((item, i) => (
        <span key={i}>
          {item}
          {i < items.length - 1 && <span style={{ opacity: 0.5, margin: "0 5px" }}>{sep}</span>}
        </span>
      ))}
    </div>
  );
}

// ─── Section heading variants ────────────────────────────────
export type HeadingVariant =
  | "underline"       // text + bottom border
  | "border-left"     // left colored border
  | "caps"            // uppercase + line
  | "badge"           // colored pill label
  | "double-line"     // thick + thin line sandwich
  | "plain"           // just text
  | "minimal-dot";    // dot before text

export function SectionHeading({
  title, icon, theme, variant = "underline", style,
}: {
  title: string; icon?: string; theme: ResumeTheme;
  variant?: HeadingVariant; style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = {
    fontFamily: "var(--resume-heading-font)",
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    gap: 6,
    ...style,
  };

  if (variant === "underline") return (
    <h2 style={{ ...base, borderBottom: `2px solid ${theme.primary}`, paddingBottom: 5, color: theme.primary }}>
      {icon && <DynamicIcon name={icon} size={12} style={{ color: theme.primary }} />}
      {title}
    </h2>
  );

  if (variant === "border-left") return (
    <h2 style={{ ...base, borderLeft: `4px solid ${theme.primary}`, paddingLeft: 10, color: theme.primary, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 11 }}>
      {icon && <DynamicIcon name={icon} size={11} style={{ color: theme.primary }} />}
      {title}
    </h2>
  );

  if (variant === "caps") return (
    <div style={{ marginBottom: 10 }}>
      <h2 style={{ ...base, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 10, color: theme.muted, fontWeight: 700 }}>
        {icon && <DynamicIcon name={icon} size={10} style={{ color: theme.muted }} />}
        {title}
      </h2>
      <div style={{ height: 1, background: `${theme.primary}30`, marginTop: 4 }} />
    </div>
  );

  if (variant === "badge") return (
    <div style={{ marginBottom: 10 }}>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px",
        background: `${theme.primary}15`, border: `1px solid ${theme.primary}40`,
        borderRadius: 20, fontSize: 10, fontWeight: 700, color: theme.primary,
        textTransform: "uppercase", letterSpacing: "0.08em",
      }}>
        {icon && <DynamicIcon name={icon} size={10} style={{ color: theme.primary }} />}
        {title}
      </span>
    </div>
  );

  if (variant === "double-line") return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ height: 2, background: theme.primary, marginBottom: 2 }} />
      <h2 style={{ ...base, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: theme.primary, marginBottom: 2 }}>
        {icon && <DynamicIcon name={icon} size={11} style={{ color: theme.primary }} />}
        {title}
      </h2>
      <div style={{ height: 1, background: `${theme.primary}50` }} />
    </div>
  );

  if (variant === "minimal-dot") return (
    <h2 style={{ ...base, color: theme.primary, fontSize: 12 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: theme.primary, flexShrink: 0 }} />
      {icon && <DynamicIcon name={icon} size={11} style={{ color: theme.primary }} />}
      {title}
    </h2>
  );

  // plain
  return (
    <h2 style={{ ...base, color: theme.primary }}>
      {icon && <DynamicIcon name={icon} size={12} style={{ color: theme.primary }} />}
      {title}
    </h2>
  );
}

// ─── Section content renderer (all section types) ────────────
export function SectionContent({
  section, theme, compact = false,
}: {
  section: ResumeSection; theme: ResumeTheme; compact?: boolean;
}) {
  const mb = compact ? 10 : 16;
  const fs = compact ? 11 : 12;

  if (section.type === "summary") {
    return <HtmlContent html={(section as SummarySection).content} style={{ fontSize: fs }} />;
  }

  if (section.type === "experience") {
    return (
      <>
        {(section as ExperienceSection).items.map((item) => (
          <div key={item.id} style={{ marginBottom: mb }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
              <div>
                <strong style={{ fontSize: fs + 1, color: theme.text }}>{item.role || "Role"}</strong>
                <span style={{ fontSize: fs, color: theme.secondary }}>{item.company && ` · ${item.company}`}{item.location && `, ${item.location}`}</span>
              </div>
              <DateRange start={item.startDate} end={item.endDate} current={item.current} style={{ color: theme.muted }} />
            </div>
            {item.description && <div style={{ marginTop: 5 }}><HtmlContent html={item.description} style={{ fontSize: fs }} /></div>}
          </div>
        ))}
      </>
    );
  }

  if (section.type === "education") {
    return (
      <>
        {(section as EducationSection).items.map((item) => (
          <div key={item.id} style={{ marginBottom: compact ? 8 : 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <div>
                <strong style={{ fontSize: fs }}>{item.degree}{item.field && ` in ${item.field}`}</strong>
                <div style={{ fontSize: fs - 1, color: theme.muted }}>{item.institution}{item.gpa && ` · GPA ${item.gpa}`}</div>
              </div>
              <DateRange start={item.startDate} end={item.endDate} style={{ color: theme.muted }} />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (section.type === "skills") {
    return (
      <>
        {(section as SkillsSection).groups.map((group) => (
          <div key={group.id} style={{ marginBottom: compact ? 6 : 10 }}>
            {group.category && (
              <strong style={{ fontSize: fs - 1, color: theme.secondary, display: "block", marginBottom: 4 }}>{group.category}: </strong>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 4px" }}>
              {group.skills.filter(s => s.name).map((skill) => (
                <SkillPill key={skill.id} name={skill.name} color={theme.secondary} bg={`${theme.primary}12`} />
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }

  if (section.type === "projects") {
    return (
      <>
        {(section as ProjectsSection).items.map((item) => (
          <div key={item.id} style={{ marginBottom: compact ? 10 : 14 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
              <strong style={{ fontSize: fs }}>{item.name}</strong>
              {item.url && <span style={{ fontSize: 10, color: theme.primary }}>{item.url}</span>}
            </div>
            {item.tags.length > 0 && (
              <div style={{ marginTop: 3, display: "flex", flexWrap: "wrap", gap: "2px 3px" }}>
                {item.tags.map((t, i) => (
                  <SkillPill key={i} name={t} color={theme.secondary} bg={`${theme.accent}20`} />
                ))}
              </div>
            )}
            {item.description && <div style={{ marginTop: 4 }}><HtmlContent html={item.description} style={{ fontSize: fs }} /></div>}
          </div>
        ))}
      </>
    );
  }

  if (section.type === "certifications") {
    return (
      <>
        {(section as CertificationsSection).items.map((item) => (
          <div key={item.id} style={{ marginBottom: compact ? 5 : 8, display: "flex", justifyContent: "space-between" }}>
            <div>
              <strong style={{ fontSize: fs }}>{item.name}</strong>
              {item.issuer && <span style={{ fontSize: fs - 1, color: theme.muted }}> · {item.issuer}</span>}
            </div>
            {item.date && <span style={{ fontSize: 10, color: theme.muted }}>{item.date}</span>}
          </div>
        ))}
      </>
    );
  }

  if (section.type === "custom") {
    return (
      <>
        {(section as CustomSection).blocks.map((block) => (
          <div key={block.id} style={{ marginBottom: 6 }}>
            <HtmlContent html={block.content} style={{ fontSize: fs }} />
          </div>
        ))}
      </>
    );
  }

  return null;
}

// ─── Full section block (heading + content) ──────────────────
export function SectionBlock({
  sid, sections, theme, variant = "underline", compact = false,
}: {
  sid: string; sections: Record<string, ResumeSection>; theme: ResumeTheme;
  variant?: HeadingVariant; compact?: boolean;
}) {
  const section = sections[sid];
  if (!section || !section.visible) return null;
  return (
    <section style={{ marginBottom: compact ? 16 : 22 }}>
      <SectionHeading title={section.title} icon={section.icon} theme={theme} variant={variant} />
      <SectionContent section={section} theme={theme} compact={compact} />
    </section>
  );
}
