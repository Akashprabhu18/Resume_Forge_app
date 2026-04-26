// Startup — Gradient header, rounded cards for sections, modern sans bold
import { ResumeData, ResumeTheme } from "@/types/resume";
import { SectionBlock, ContactRow, SectionContent } from "../TemplateBase";

interface Props { data: ResumeData; theme: ResumeTheme; }

export default function StartupTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  return (
    <div style={{ fontFamily: "var(--resume-body-font)", fontSize: 12, color: theme.text, backgroundColor: "#f8fafc", minHeight: "100%" }}>
      {/* Gradient hero */}
      <header style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 60%, ${theme.secondary} 100%)`, padding: "36px 44px 28px" }}>
        <h1 style={{ fontFamily: "var(--resume-heading-font)", fontSize: 34, fontWeight: 900, margin: 0, color: "white", letterSpacing: "-0.03em" }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && <p style={{ fontSize: 14, color: "rgba(255,255,255,0.88)", marginTop: 6 }}>{personal.title}</p>}
        <div style={{ marginTop: 12, opacity: 0.82 }}>
          <ContactRow personal={personal} theme={{ ...theme, muted: "rgba(255,255,255,0.75)" }} />
        </div>
      </header>

      {/* Card body */}
      <div style={{ padding: "28px 36px", display: "grid", gap: 16 }}>
        {sectionOrder.map(sid => {
          const section = sections[sid];
          if (!section || !section.visible) return null;
          return (
            <div key={sid} style={{ background: "white", borderRadius: 12, padding: "18px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: `1px solid ${theme.primary}15` }}>
              <h2 style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--resume-heading-font)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: theme.primary, margin: "0 0 12px", paddingBottom: 8, borderBottom: `2px solid ${theme.primary}20` }}>
                {section.title}
              </h2>
              <SectionContent section={section} theme={theme} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
