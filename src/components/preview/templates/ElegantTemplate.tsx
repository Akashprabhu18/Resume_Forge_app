// Elegant — Centered header, thin serif lines, muted palatial feel
import { ResumeData, ResumeTheme } from "@/types/resume";
import { ContactRow, SectionBlock } from "../TemplateBase";

interface Props { data: ResumeData; theme: ResumeTheme; }

export default function ElegantTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  return (
    <div style={{ fontFamily: "var(--resume-body-font)", fontSize: 12, color: theme.text, backgroundColor: theme.bg, minHeight: "100%" }}>
      <div style={{ padding: "48px 60px 32px" }}>
        {/* Centered header */}
        <header style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 10 }}>
            <div style={{ flex: 1, height: 1, background: theme.primary }} />
            <h1 style={{ fontFamily: "var(--resume-heading-font)", fontSize: 28, fontWeight: 700, color: theme.primary, margin: 0, letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              {personal.name || "Your Name"}
            </h1>
            <div style={{ flex: 1, height: 1, background: theme.primary }} />
          </div>
          {personal.title && (
            <p style={{ fontSize: 13, color: theme.secondary, fontStyle: "italic", marginBottom: 10 }}>{personal.title}</p>
          )}
          <ContactRow personal={personal} theme={theme} sep=" · " />
        </header>
        {/* Sections */}
        {sectionOrder.map((sid) => (
          <SectionBlock key={sid} sid={sid} sections={sections} theme={theme} variant="caps" />
        ))}
      </div>
    </div>
  );
}
