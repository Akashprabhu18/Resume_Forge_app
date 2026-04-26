// Graduate — Clean simple, education prominently first, blue accents
import { ResumeData, ResumeTheme } from "@/types/resume";
import { ContactRow, SectionBlock } from "../TemplateBase";

interface Props { data: ResumeData; theme: ResumeTheme; }

const GRAD_ORDER = ["education", "summary", "experience", "skills", "projects", "certifications"];

export default function GraduateTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  // Sort with education first for graduates
  const orderedIds = [
    ...GRAD_ORDER.filter(id => sectionOrder.includes(id)),
    ...sectionOrder.filter(id => !GRAD_ORDER.includes(id)),
  ];

  return (
    <div style={{ fontFamily: "var(--resume-body-font)", fontSize: 12, color: theme.text, backgroundColor: theme.bg, minHeight: "100%" }}>
      {/* Clean top header */}
      <header style={{ borderTop: `5px solid ${theme.primary}`, padding: "28px 48px 20px", borderBottom: `1px solid ${theme.primary}20` }}>
        <h1 style={{ fontFamily: "var(--resume-heading-font)", fontSize: 26, fontWeight: 800, margin: 0, color: theme.primary }}>
          {personal.name || "Your Name"}
        </h1>
        {personal.title && (
          <p style={{ fontSize: 13, color: theme.secondary, marginTop: 3, fontWeight: 500 }}>{personal.title}</p>
        )}
        <div style={{ marginTop: 8 }}>
          <ContactRow personal={personal} theme={theme} />
        </div>
      </header>

      <div style={{ padding: "24px 48px 32px" }}>
        {orderedIds.map(sid => (
          <SectionBlock key={sid} sid={sid} sections={sections} theme={theme} variant="border-left" />
        ))}
      </div>
    </div>
  );
}
