// Timeline — Vertical timeline bar for experience, clean single column
import { ResumeData, ResumeTheme, ExperienceSection, EducationSection } from "@/types/resume";
import { ContactRow, SectionBlock, SectionContent, HtmlContent } from "../TemplateBase";

interface Props { data: ResumeData; theme: ResumeTheme; }

function TimelineItem({ label, sublabel, date, body, theme, isLast }: {
  label: string; sublabel?: string; date?: string; body?: string; theme: ResumeTheme; isLast?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: isLast ? 0 : 4, position: "relative" }}>
      {/* Timeline rail */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: theme.primary, border: `2px solid ${theme.primary}`, flexShrink: 0, marginTop: 3 }} />
        {!isLast && <div style={{ width: 2, flex: 1, background: `${theme.primary}25`, marginTop: 2 }} />}
      </div>
      {/* Content */}
      <div style={{ paddingBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <strong style={{ fontSize: 12, color: theme.text }}>{label}</strong>
            {sublabel && <div style={{ fontSize: 11, color: theme.secondary }}>{sublabel}</div>}
          </div>
          {date && <span style={{ fontSize: 10, color: theme.muted, whiteSpace: "nowrap" }}>{date}</span>}
        </div>
        {body && <div style={{ marginTop: 5 }}><HtmlContent html={body} style={{ fontSize: 11 }} /></div>}
      </div>
    </div>
  );
}

export default function TimelineTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  const expSection = sections.experience as ExperienceSection | undefined;
  const eduSection = sections.education as EducationSection | undefined;
  const otherIds = sectionOrder.filter(id => !["experience", "education"].includes(id));

  return (
    <div style={{ fontFamily: "var(--resume-body-font)", fontSize: 12, color: theme.text, backgroundColor: theme.bg, minHeight: "100%", padding: "40px 48px 32px" }}>
      {/* Header */}
      <header style={{ marginBottom: 28, paddingBottom: 18, borderBottom: `2px solid ${theme.primary}` }}>
        <h1 style={{ fontFamily: "var(--resume-heading-font)", fontSize: 28, fontWeight: 800, margin: 0, color: theme.primary }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && <p style={{ fontSize: 13, color: theme.secondary, marginTop: 3 }}>{personal.title}</p>}
        <div style={{ marginTop: 8 }}><ContactRow personal={personal} theme={theme} /></div>
      </header>

      {/* Timeline sections */}
      {expSection?.visible && (
        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: theme.primary, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "inline-block", width: 20, height: 2, background: theme.primary }} />
            {expSection.title}
          </h2>
          {expSection.items.map((item, i) => (
            <TimelineItem
              key={item.id}
              label={item.role || "Role"}
              sublabel={`${item.company}${item.location ? ` · ${item.location}` : ""}`}
              date={`${item.startDate} – ${item.current ? "Present" : item.endDate}`}
              body={item.description}
              theme={theme}
              isLast={i === expSection.items.length - 1}
            />
          ))}
        </section>
      )}

      {eduSection?.visible && (
        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: theme.primary, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "inline-block", width: 20, height: 2, background: theme.primary }} />
            {eduSection.title}
          </h2>
          {eduSection.items.map((item, i) => (
            <TimelineItem
              key={item.id}
              label={`${item.degree}${item.field ? ` in ${item.field}` : ""}`}
              sublabel={item.institution}
              date={item.endDate}
              theme={theme}
              isLast={i === eduSection.items.length - 1}
            />
          ))}
        </section>
      )}

      {/* Remaining sections */}
      {otherIds.map(sid => (
        <SectionBlock key={sid} sid={sid} sections={sections} theme={theme} variant="caps" />
      ))}
    </div>
  );
}
