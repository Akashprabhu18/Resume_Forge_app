import {
  ResumeData,
  ResumeTheme,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  ProjectsSection,
  CertificationsSection,
  SummarySection,
  CustomSection,
} from "@/types/resume";
import { DynamicIcon } from "@/components/ui/IconPicker";

interface Props { data: ResumeData; theme: ResumeTheme; }

function HtmlContent({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} style={{ fontSize: 12, lineHeight: 1.6 }} />;
}

export default function ModernTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  const isTwo = data.meta.layoutColumns === 2;
  const sidebarIds = ["skills", "certifications"];
  const mainIds = sectionOrder.filter((id) => !sidebarIds.includes(id) || !isTwo);
  const sideIds = isTwo ? sectionOrder.filter((id) => sidebarIds.includes(id)) : [];

  function SectionBlock({ sid }: { sid: string }) {
    const section = sections[sid];
    if (!section || !section.visible) return null;
    return (
      <section style={{ marginBottom: 22 }}>
        <h2 style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: theme.primary,
          marginBottom: 10,
          paddingBottom: 4,
          borderBottom: `2px solid ${theme.primary}`,
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}>
          {section.icon && (
            <DynamicIcon name={section.icon} size={11} style={{ color: theme.primary, flexShrink: 0 }} />
          )}
          {section.title}
        </h2>

        {section.type === "summary" && <HtmlContent html={(section as SummarySection).content} />}

        {section.type === "experience" &&
          (section as ExperienceSection).items.map((item) => (
            <div key={item.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: 13, color: theme.text }}>{item.role}</strong>
                <span style={{ fontSize: 10, color: theme.muted, whiteSpace: "nowrap" }}>
                  {item.startDate}{item.startDate && " – "}{item.current ? "Present" : item.endDate}
                </span>
              </div>
              <div style={{ fontSize: 12, color: theme.secondary, fontWeight: 500 }}>{item.company}{item.location && ` · ${item.location}`}</div>
              {item.description && <div style={{ marginTop: 4 }}><HtmlContent html={item.description} /></div>}
            </div>
          ))}

        {section.type === "education" &&
          (section as EducationSection).items.map((item) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 12 }}>{item.degree}{item.field && `, ${item.field}`}</strong>
                <span style={{ fontSize: 10, color: theme.muted }}>{item.endDate}</span>
              </div>
              <div style={{ fontSize: 11, color: theme.muted }}>{item.institution}{item.gpa ? ` · GPA ${item.gpa}` : ""}</div>
            </div>
          ))}

        {section.type === "skills" &&
          (section as SkillsSection).groups.map((group) => (
            <div key={group.id} style={{ marginBottom: 8 }}>
              {group.category && <div style={{ fontSize: 11, fontWeight: 600, color: theme.secondary, marginBottom: 4 }}>{group.category}</div>}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {group.skills.filter((s) => s.name).map((skill) => (
                  <span key={skill.id} style={{
                    padding: "2px 8px",
                    borderRadius: 20,
                    fontSize: 10,
                    background: `${theme.primary}18`,
                    color: theme.secondary,
                    border: `1px solid ${theme.primary}30`,
                  }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}

        {section.type === "projects" &&
          (section as ProjectsSection).items.map((item) => (
            <div key={item.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                <strong style={{ fontSize: 12 }}>{item.name}</strong>
                {item.url && <span style={{ fontSize: 10, color: theme.primary }}>{item.url}</span>}
              </div>
              {item.description && <div style={{ marginTop: 4 }}><HtmlContent html={item.description} /></div>}
              {item.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 4 }}>
                  {item.tags.map((t, i) => (
                    <span key={i} style={{ fontSize: 9, padding: "1px 6px", borderRadius: 10, background: `${theme.accent}30`, color: theme.secondary }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

        {section.type === "certifications" &&
          (section as CertificationsSection).items.map((item) => (
            <div key={item.id} style={{ marginBottom: 6 }}>
              <strong style={{ fontSize: 11 }}>{item.name}</strong>
              {item.issuer && <span style={{ fontSize: 10, color: theme.muted }}> · {item.issuer}</span>}
              {item.date && <span style={{ fontSize: 10, color: theme.muted }}> · {item.date}</span>}
            </div>
          ))}

        {section.type === "custom" &&
          (section as CustomSection).blocks.map((block) => (
            <div key={block.id} style={{ marginBottom: 6 }}>
              <HtmlContent html={block.content} />
            </div>
          ))}
      </section>
    );
  }

  return (
    <div style={{ fontFamily: "var(--resume-body-font)", fontSize: 12, color: theme.text, backgroundColor: theme.bg, minHeight: "100%" }}>
      {/* Colored Header */}
      <header style={{ background: theme.primary, padding: "36px 48px 28px", color: "white" }}>
        <h1 style={{ fontFamily: "var(--resume-heading-font)", fontSize: 30, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && <p style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>{personal.title}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", marginTop: 12, fontSize: 11, opacity: 0.8 }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </header>

      {/* Body */}
      <div style={{ display: isTwo ? "flex" : "block", gap: 0 }}>
        {/* Main */}
        <div style={{ flex: 1, padding: "28px 40px 32px" }}>
          {mainIds.map((sid) => <SectionBlock key={sid} sid={sid} />)}
        </div>

        {/* Sidebar */}
        {isTwo && sideIds.length > 0 && (
          <aside style={{
            width: 220,
            padding: "28px 20px 32px",
            background: `${theme.primary}0a`,
            borderLeft: `2px solid ${theme.primary}20`,
          }}>
            {sideIds.map((sid) => <SectionBlock key={sid} sid={sid} />)}
          </aside>
        )}
      </div>
    </div>
  );
}
