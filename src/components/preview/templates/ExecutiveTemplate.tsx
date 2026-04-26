// Executive — Navy accent band, serif headings, single-column, double-line section headings
import { ResumeData, ResumeTheme } from "@/types/resume";
import { ContactRow, SectionBlock } from "../TemplateBase";

interface Props { data: ResumeData; theme: ResumeTheme; }

export default function ExecutiveTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  return (
    <div style={{ fontFamily: "var(--resume-body-font)", fontSize: 12, color: theme.text, backgroundColor: theme.bg, minHeight: "100%" }}>
      {/* Top accent bar */}
      <div style={{ height: 6, background: theme.primary }} />
      <div style={{ padding: "36px 52px 28px" }}>
        {/* Header */}
        <header style={{ marginBottom: 28, borderBottom: `1px solid ${theme.primary}30`, paddingBottom: 20 }}>
          <h1 style={{ fontFamily: "var(--resume-heading-font)", fontSize: 32, fontWeight: 800, margin: 0, color: theme.primary, letterSpacing: "-0.02em" }}>
            {personal.name || "Your Name"}
          </h1>
          {personal.title && (
            <p style={{ fontSize: 14, color: theme.secondary, marginTop: 4, fontWeight: 500, fontStyle: "italic" }}>{personal.title}</p>
          )}
          <div style={{ marginTop: 10 }}>
            <ContactRow personal={personal} theme={theme} sep=" | " />
          </div>
        </header>
        {/* Sections */}
        {sectionOrder.map((sid) => (
          <SectionBlock key={sid} sid={sid} sections={sections} theme={theme} variant="double-line" />
        ))}
      </div>
    </div>
  );
}
