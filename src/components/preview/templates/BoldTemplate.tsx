// Bold — Full-bleed color hero covering top ~30%, white text, high-impact name
import { ResumeData, ResumeTheme } from "@/types/resume";
import { ContactRow, SectionBlock } from "../TemplateBase";

interface Props { data: ResumeData; theme: ResumeTheme; }

export default function BoldTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  return (
    <div style={{ fontFamily: "var(--resume-body-font)", fontSize: 12, color: theme.text, backgroundColor: theme.bg, minHeight: "100%" }}>
      {/* Hero header */}
      <header style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`, padding: "40px 52px 32px", color: "white" }}>
        <h1 style={{ fontFamily: "var(--resume-heading-font)", fontSize: 40, fontWeight: 900, margin: 0, letterSpacing: "-0.03em", lineHeight: 1 }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && (
          <p style={{ fontSize: 16, opacity: 0.88, marginTop: 8, fontWeight: 500 }}>{personal.title}</p>
        )}
        <div style={{ marginTop: 14, opacity: 0.8 }}>
          <ContactRow personal={personal} theme={{ ...theme, muted: "rgba(255,255,255,0.75)" }} sep=" · " />
        </div>
      </header>

      {/* Accent strip */}
      <div style={{ height: 4, background: theme.accent }} />

      {/* Content */}
      <div style={{ padding: "32px 52px" }}>
        {sectionOrder.map((sid) => (
          <SectionBlock key={sid} sid={sid} sections={sections} theme={theme} variant="border-left" />
        ))}
      </div>
    </div>
  );
}
