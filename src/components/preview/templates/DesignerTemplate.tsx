// Designer — Portfolio style: large bold header, right sidebar for bio/contact
import { ResumeData, ResumeTheme } from "@/types/resume";
import { SectionBlock, ContactRow } from "../TemplateBase";

interface Props { data: ResumeData; theme: ResumeTheme; }
const SIDE_IDS = ["skills", "education", "certifications"];

export default function DesignerTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  const mainIds = sectionOrder.filter(id => !SIDE_IDS.includes(id));
  const sideIds = sectionOrder.filter(id => SIDE_IDS.includes(id));

  return (
    <div style={{ fontFamily: "var(--resume-body-font)", fontSize: 12, color: theme.text, backgroundColor: theme.bg, minHeight: "100%", display: "flex" }}>
      {/* Main */}
      <main style={{ flex: 1, padding: "40px 32px 32px" }}>
        {/* Large display name */}
        <header style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--resume-heading-font)", fontSize: 44, fontWeight: 900, margin: 0, color: theme.primary, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
            {(personal.name || "Your Name").split(" ").map((word, i) => (
              <span key={i} style={{ display: "block" }}>{word}</span>
            ))}
          </h1>
          {personal.title && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
              <div style={{ width: 32, height: 2, background: theme.accent }} />
              <p style={{ fontSize: 13, color: theme.secondary, margin: 0, fontWeight: 500 }}>{personal.title}</p>
            </div>
          )}
        </header>
        {mainIds.map(sid => (
          <SectionBlock key={sid} sid={sid} sections={sections} theme={theme} variant="minimal-dot" />
        ))}
      </main>

      {/* Sidebar */}
      <aside style={{ width: 200, borderLeft: `3px solid ${theme.primary}`, padding: "40px 20px 32px 18px", background: `${theme.primary}06` }}>
        {/* Contact */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: theme.primary, marginBottom: 10 }}>Contact</h3>
          {[personal.email, personal.phone, personal.location, personal.linkedin, personal.github, personal.website].filter(Boolean).map((c, i) => (
            <div key={i} style={{ fontSize: 10, color: theme.secondary, marginBottom: 5, wordBreak: "break-all" }}>{c}</div>
          ))}
        </div>
        {sideIds.map(sid => (
          <SectionBlock key={sid} sid={sid} sections={sections} theme={theme} variant="caps" compact />
        ))}
      </aside>
    </div>
  );
}
