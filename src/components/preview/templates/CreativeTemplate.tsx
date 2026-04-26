import {
  ResumeData, ResumeTheme,
  ExperienceSection, EducationSection, SkillsSection,
  ProjectsSection, CertificationsSection, SummarySection, CustomSection,
} from "@/types/resume";
import { DynamicIcon } from "@/components/ui/IconPicker";

interface Props { data: ResumeData; theme: ResumeTheme; }

function HtmlContent({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} style={{ fontSize: 11, lineHeight: 1.6 }} />;
}

export default function CreativeTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  const sidebarIds = ["skills", "certifications", "education"];
  const mainIds = sectionOrder.filter((id) => !sidebarIds.includes(id));
  const sideIds = sectionOrder.filter((id) => sidebarIds.includes(id));

  function SideSection({ sid }: { sid: string }) {
    const section = sections[sid];
    if (!section || !section.visible) return null;
    return (
      <section style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)", marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
          {section.icon && (
            <DynamicIcon name={section.icon} size={10} style={{ color: "rgba(255,255,255,0.6)", flexShrink: 0 }} />
          )}
          {section.title}
        </h3>
        {section.type === "skills" &&
          (section as SkillsSection).groups.map((group) => (
            <div key={group.id} style={{ marginBottom: 10 }}>
              {group.category && <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.75)", marginBottom: 4 }}>{group.category}</div>}
              {group.skills.filter((s) => s.name).map((skill) => (
                <div key={skill.id} style={{ marginBottom: 5 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.85)" }}>{skill.name}</span>
                  </div>
                  <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(skill.level / 5) * 100}%`, background: "rgba(255,255,255,0.6)", borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        {section.type === "education" &&
          (section as EducationSection).items.map((item) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{item.degree}</div>
              {item.field && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}>{item.field}</div>}
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{item.institution}</div>
              {item.endDate && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{item.endDate}</div>}
            </div>
          ))}
        {section.type === "certifications" &&
          (section as CertificationsSection).items.map((item) => (
            <div key={item.id} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{item.name}</div>
              {item.issuer && <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>{item.issuer}</div>}
            </div>
          ))}
      </section>
    );
  }

  function MainSection({ sid }: { sid: string }) {
    const section = sections[sid];
    if (!section || !section.visible) return null;
    return (
      <section style={{ marginBottom: 22 }}>
        <h2 style={{
          fontSize: 12,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: theme.primary,
          marginBottom: 10,
          paddingLeft: 10,
          borderLeft: `3px solid ${theme.primary}`,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          {section.icon && (
            <DynamicIcon name={section.icon} size={11} style={{ color: theme.primary, flexShrink: 0 }} />
          )}
          {section.title}
        </h2>

        {section.type === "summary" && <HtmlContent html={(section as SummarySection).content} />}

        {section.type === "experience" &&
          (section as ExperienceSection).items.map((item) => (
            <div key={item.id} style={{ marginBottom: 16, position: "relative", paddingLeft: 14 }}>
              <div style={{ position: "absolute", left: 0, top: 6, width: 5, height: 5, borderRadius: "50%", background: theme.primary }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: 12 }}>{item.role}</strong>
                <span style={{ fontSize: 10, color: theme.muted }}>
                  {item.startDate}{item.startDate && "–"}{item.current ? "Present" : item.endDate}
                </span>
              </div>
              <div style={{ fontSize: 11, color: theme.secondary, fontWeight: 500 }}>{item.company}</div>
              {item.description && <div style={{ marginTop: 4 }}><HtmlContent html={item.description} /></div>}
            </div>
          ))}

        {section.type === "projects" &&
          (section as ProjectsSection).items.map((item) => (
            <div key={item.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <strong style={{ fontSize: 12 }}>{item.name}</strong>
                {item.url && <span style={{ fontSize: 10, color: theme.primary }}>{item.url}</span>}
              </div>
              {item.tags.length > 0 && (
                <div style={{ display: "flex", gap: 3, marginTop: 3, flexWrap: "wrap" }}>
                  {item.tags.map((t, i) => (
                    <span key={i} style={{ fontSize: 9, padding: "1px 5px", borderRadius: 8, background: `${theme.accent}30`, color: theme.secondary }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {item.description && <div style={{ marginTop: 4 }}><HtmlContent html={item.description} /></div>}
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
    <div style={{ fontFamily: "var(--resume-body-font)", fontSize: 12, color: theme.text, backgroundColor: theme.bg, minHeight: "100%", display: "flex" }}>
      {/* Sidebar */}
      <aside style={{
        width: 220,
        minHeight: "100%",
        background: theme.primary,
        padding: "40px 20px 32px",
        flexShrink: 0,
      }}>
        {/* Avatar / Initials */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 700,
          color: "white",
          marginBottom: 16,
          border: "2px solid rgba(255,255,255,0.25)",
          overflow: "hidden",
        }}>
          {personal.avatar
            ? <img src={personal.avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : (personal.name?.[0] ?? "?")}
        </div>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "var(--resume-heading-font)", fontSize: 18, fontWeight: 800, color: "white", margin: 0, lineHeight: 1.2 }}>
            {personal.name || "Your Name"}
          </h1>
          {personal.title && (
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>{personal.title}</p>
          )}
        </div>

        {/* Contact */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
            Contact
          </h3>
          {[
            { label: personal.email },
            { label: personal.phone },
            { label: personal.location },
            { label: personal.website },
            { label: personal.linkedin },
            { label: personal.github },
          ].filter((c) => c.label).map((c, i) => (
            <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", marginBottom: 4, wordBreak: "break-all" }}>
              {c.label}
            </div>
          ))}
        </div>

        {sideIds.map((sid) => <SideSection key={sid} sid={sid} />)}
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "40px 36px 32px" }}>
        {mainIds.map((sid) => <MainSection key={sid} sid={sid} />)}
      </main>
    </div>
  );
}
