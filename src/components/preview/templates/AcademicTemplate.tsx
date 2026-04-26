// Academic — Traditional CV format, centered header, full-width, formal
import { ResumeData, ResumeTheme } from "@/types/resume";
import { SectionBlock } from "../TemplateBase";

interface Props { data: ResumeData; theme: ResumeTheme; }

export default function AcademicTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  const contactItems = [
    personal.email, personal.phone, personal.location,
    personal.linkedin, personal.website, personal.github,
  ].filter(Boolean);

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 12, color: "#1a1a1a", backgroundColor: "white", minHeight: "100%", padding: "48px 60px" }}>
      {/* Centered header */}
      <header style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, margin: 0, color: theme.primary, letterSpacing: "0.02em" }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && (
          <p style={{ fontSize: 13, color: "#555", marginTop: 4 }}>{personal.title}</p>
        )}
        <div style={{ marginTop: 8, fontSize: 11, color: "#555", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2px 12px" }}>
          {contactItems.map((item, i) => <span key={i}>{item}</span>)}
        </div>
        <hr style={{ border: "none", borderTop: `2px solid ${theme.primary}`, margin: "14px 0 0" }} />
      </header>

      {/* Sections */}
      {sectionOrder.map((sid) => (
        <SectionBlock key={sid} sid={sid} sections={sections} theme={{ ...theme, text: "#1a1a1a", secondary: "#333" }} variant="underline" />
      ))}
    </div>
  );
}
