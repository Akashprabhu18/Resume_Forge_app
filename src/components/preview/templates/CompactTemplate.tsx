// Compact — Dense 2-col layout throughout, small fonts, maximum content density
import { ResumeData, ResumeTheme, SkillsSection, SummarySection } from "@/types/resume";
import { ContactRow, SectionBlock, HtmlContent } from "../TemplateBase";

interface Props { data: ResumeData; theme: ResumeTheme; }

const SIDEBAR_IDS = ["skills", "certifications", "education"];

export default function CompactTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  const mainIds = sectionOrder.filter(id => !SIDEBAR_IDS.includes(id));
  const sideIds = sectionOrder.filter(id => SIDEBAR_IDS.includes(id));

  return (
    <div style={{ fontFamily: "var(--resume-body-font)", fontSize: 11, color: theme.text, backgroundColor: theme.bg, minHeight: "100%" }}>
      {/* Compact header */}
      <header style={{ background: theme.primary, padding: "18px 28px 14px", color: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontFamily: "var(--resume-heading-font)", fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>
              {personal.name || "Your Name"}
            </h1>
            {personal.title && <p style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>{personal.title}</p>}
          </div>
          <div style={{ textAlign: "right", fontSize: 10, opacity: 0.85 }}>
            <ContactRow personal={personal} theme={{ ...theme, muted: "rgba(255,255,255,0.8)" }} sep=" | " />
          </div>
        </div>
      </header>

      {/* Summary strip */}
      {sections.summary && (sections.summary as SummarySection).content && (
        <div style={{ background: `${theme.primary}12`, padding: "10px 28px", borderBottom: `1px solid ${theme.primary}20` }}>
          <HtmlContent html={(sections.summary as SummarySection).content} style={{ fontSize: 10.5, color: theme.secondary }} />
        </div>
      )}

      {/* Two-column body */}
      <div style={{ display: "flex" }}>
        {/* Main */}
        <div style={{ flex: 1, padding: "18px 20px 24px 28px" }}>
          {mainIds.filter(id => id !== "summary").map(sid => (
            <SectionBlock key={sid} sid={sid} sections={sections} theme={theme} variant="caps" compact />
          ))}
        </div>
        {/* Sidebar */}
        <div style={{ width: 200, borderLeft: `1px solid ${theme.primary}20`, padding: "18px 18px 24px 16px", background: `${theme.primary}04` }}>
          {sideIds.map(sid => (
            <SectionBlock key={sid} sid={sid} sections={sections} theme={theme} variant="caps" compact />
          ))}
        </div>
      </div>
    </div>
  );
}
