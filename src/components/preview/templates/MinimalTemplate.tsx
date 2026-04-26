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

interface Props {
  data: ResumeData;
  theme: ResumeTheme;
}

// ─── Shared section helpers ────────────────────────────────

function stripHtml(html: string): string {
  if (typeof window === "undefined") return html.replace(/<[^>]*>/g, " ");
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function HtmlContent({ html }: { html: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ fontSize: 12, lineHeight: 1.6 }}
    />
  );
}

export default function MinimalTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;

  return (
    <div
      style={{
        padding: "48px 52px",
        fontFamily: "var(--resume-body-font)",
        fontSize: 12,
        color: theme.text,
        backgroundColor: theme.bg,
        minHeight: "100%",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: 32, borderBottom: `2px solid ${theme.primary}`, paddingBottom: 20 }}>
        <h1
          style={{
            fontFamily: "var(--resume-heading-font)",
            fontSize: 28,
            fontWeight: 700,
            margin: 0,
            color: theme.primary,
            letterSpacing: "-0.02em",
          }}
        >
          {personal.name || "Your Name"}
        </h1>
        {personal.title && (
          <p style={{ fontSize: 14, color: theme.muted, marginTop: 4, fontWeight: 500 }}>
            {personal.title}
          </p>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 20px",
            marginTop: 10,
            fontSize: 11,
            color: theme.muted,
          }}
        >
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>📞 {personal.phone}</span>}
          {personal.location && <span>📍 {personal.location}</span>}
          {personal.website && <span>🔗 {personal.website}</span>}
          {personal.linkedin && <span>in {personal.linkedin}</span>}
          {personal.github && <span>⌥ {personal.github}</span>}
        </div>
      </header>

      {/* Sections */}
      {sectionOrder.map((sid) => {
        const section = sections[sid];
        if (!section || !section.visible) return null;

        return (
          <section key={sid} style={{ marginBottom: 24 }}>
            <h2
              style={{
                fontFamily: "var(--resume-heading-font)",
                fontSize: 14,
                fontWeight: 700,
                color: theme.primary,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 12,
                paddingBottom: 4,
                borderBottom: `1px solid ${theme.accent}40`,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {section.icon && (
                <DynamicIcon name={section.icon} size={13} style={{ color: theme.primary, flexShrink: 0 }} />
              )}
              {section.title}
            </h2>

            {section.type === "summary" && (
              <HtmlContent html={(section as SummarySection).content} />
            )}

            {section.type === "experience" &&
              (section as ExperienceSection).items.map((item) => (
                <div key={item.id} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <strong style={{ fontSize: 13, color: theme.text }}>{item.role || "Role"}</strong>
                      <span style={{ color: theme.muted, fontSize: 12 }}> — {item.company}</span>
                    </div>
                    <span style={{ fontSize: 11, color: theme.muted, whiteSpace: "nowrap" }}>
                      {item.startDate}{item.startDate && " – "}{item.current ? "Present" : item.endDate}
                    </span>
                  </div>
                  {item.location && (
                    <div style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>{item.location}</div>
                  )}
                  {item.description && (
                    <div style={{ marginTop: 6 }}>
                      <HtmlContent html={item.description} />
                    </div>
                  )}
                </div>
              ))}

            {section.type === "education" &&
              (section as EducationSection).items.map((item) => (
                <div key={item.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <strong style={{ fontSize: 13 }}>{item.degree} {item.field && `in ${item.field}`}</strong>
                      <div style={{ fontSize: 12, color: theme.muted }}>{item.institution}</div>
                    </div>
                    <span style={{ fontSize: 11, color: theme.muted, whiteSpace: "nowrap" }}>
                      {item.startDate}{item.startDate && " – "}{item.endDate}
                    </span>
                  </div>
                  {item.gpa && <div style={{ fontSize: 11, color: theme.muted }}>GPA: {item.gpa}</div>}
                </div>
              ))}

            {section.type === "skills" &&
              (section as SkillsSection).groups.map((group) => (
                <div key={group.id} style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 12, color: theme.secondary }}>{group.category}: </strong>
                  <span style={{ fontSize: 12, color: theme.muted }}>
                    {group.skills.map((s) => s.name).filter(Boolean).join(", ")}
                  </span>
                </div>
              ))}

            {section.type === "projects" &&
              (section as ProjectsSection).items.map((item) => (
                <div key={item.id} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: 13 }}>{item.name}</strong>
                    {item.url && <span style={{ fontSize: 11, color: theme.primary }}>{item.url}</span>}
                  </div>
                  {item.tags.length > 0 && (
                    <div style={{ fontSize: 11, color: theme.muted, marginTop: 2 }}>
                      {item.tags.join(" · ")}
                    </div>
                  )}
                  {item.description && <div style={{ marginTop: 4 }}><HtmlContent html={item.description} /></div>}
                </div>
              ))}

            {section.type === "certifications" &&
              (section as CertificationsSection).items.map((item) => (
                <div key={item.id} style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <strong style={{ fontSize: 12 }}>{item.name}</strong>
                    {item.issuer && <span style={{ fontSize: 11, color: theme.muted }}> — {item.issuer}</span>}
                  </div>
                  <span style={{ fontSize: 11, color: theme.muted }}>{item.date}</span>
                </div>
              ))}

            {section.type === "custom" &&
              (section as CustomSection).blocks.map((block) => (
                <div key={block.id} style={{ marginBottom: 8 }}>
                  <HtmlContent html={block.content} />
                </div>
              ))}
          </section>
        );
      })}
    </div>
  );
}
