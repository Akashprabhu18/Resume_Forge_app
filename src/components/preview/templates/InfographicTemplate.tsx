// Infographic — Sidebar with skill bars, colored section badge headings
import { ResumeData, ResumeTheme, SkillsSection } from "@/types/resume";
import { SectionBlock, SkillBar, ContactRow } from "../TemplateBase";

interface Props { data: ResumeData; theme: ResumeTheme; }
const SIDE_IDS = ["skills", "certifications"];

export default function InfographicTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  const mainIds = sectionOrder.filter(id => !SIDE_IDS.includes(id));
  const sideIds = sectionOrder.filter(id => SIDE_IDS.includes(id));
  const skillsSection = sections["skills"] as SkillsSection | undefined;

  return (
    <div style={{ fontFamily: "var(--resume-body-font)", fontSize: 12, color: theme.text, backgroundColor: theme.bg, minHeight: "100%", display: "flex" }}>
      {/* Sidebar */}
      <aside style={{ width: 210, background: theme.primary, padding: "40px 18px 32px", flexShrink: 0 }}>
        {/* Avatar circle */}
        <div style={{ width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "white", marginBottom: 16, border: "3px solid rgba(255,255,255,0.3)" }}>
          {personal.name?.[0] ?? "?"}
        </div>

        <h1 style={{ fontFamily: "var(--resume-heading-font)", fontSize: 17, fontWeight: 800, color: "white", margin: "0 0 4px", lineHeight: 1.2 }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && <p style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginBottom: 16 }}>{personal.title}</p>}

        {/* Contact */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>Contact</div>
          {[personal.email, personal.phone, personal.location, personal.linkedin, personal.github].filter(Boolean).map((c, i) => (
            <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.78)", marginBottom: 5, wordBreak: "break-all" }}>{c}</div>
          ))}
        </div>

        {/* Skill bars from sidebar */}
        {skillsSection?.visible && skillsSection.groups.map(group => (
          <div key={group.id} style={{ marginBottom: 14 }}>
            {group.category && <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>{group.category}</div>}
            {group.skills.filter(s => s.name).map(skill => (
              <SkillBar key={skill.id} name={skill.name} level={skill.level} color="white" />
            ))}
          </div>
        ))}

        {/* Other sidebar sections */}
        {sideIds.filter(id => id !== "skills").map(sid => {
          const sec = sections[sid];
          if (!sec || !sec.visible) return null;
          return (
            <div key={sid} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>{sec.title}</div>
              <SectionBlock sid={sid} sections={sections} theme={{ ...theme, primary: "white", text: "rgba(255,255,255,0.85)", secondary: "rgba(255,255,255,0.65)", muted: "rgba(255,255,255,0.5)" }} variant="plain" compact />
            </div>
          );
        })}
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "40px 36px 32px" }}>
        {mainIds.map(sid => (
          <SectionBlock key={sid} sid={sid} sections={sections} theme={theme} variant="badge" />
        ))}
      </main>
    </div>
  );
}
