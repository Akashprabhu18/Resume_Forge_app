// Professional — Classic ATS-safe black/grey, no color accents, traditional
import { ResumeData, ResumeTheme } from "@/types/resume";
import { SectionBlock, ContactRow } from "../TemplateBase";

interface Props { data: ResumeData; theme: ResumeTheme; }

const MONO: ResumeTheme = {
  id: "mono", primary: "#1a1a1a", secondary: "#333",
  accent: "#555", text: "#1a1a1a", muted: "#666", bg: "#ffffff",
};

export default function ProfessionalTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  return (
    <div style={{ fontFamily: "'Times New Roman', Georgia, serif", fontSize: 12, color: "#1a1a1a", backgroundColor: "white", minHeight: "100%", padding: "44px 56px" }}>
      {/* Header */}
      <header style={{ marginBottom: 20, textAlign: "center" }}>
        <h1 style={{ fontFamily: "Arial, sans-serif", fontSize: 22, fontWeight: 700, margin: "0 0 4px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && <p style={{ fontSize: 12, color: "#333", margin: "0 0 8px" }}>{personal.title}</p>}
        <ContactRow personal={personal} theme={MONO} sep=" | " />
      </header>
      <hr style={{ border: "none", borderTop: "1.5px solid black", margin: "0 0 18px" }} />
      {/* Sections */}
      {sectionOrder.map(sid => (
        <SectionBlock key={sid} sid={sid} sections={sections} theme={MONO} variant="underline" />
      ))}
    </div>
  );
}
