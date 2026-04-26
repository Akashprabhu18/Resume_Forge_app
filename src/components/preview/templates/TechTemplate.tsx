// Tech — Dark accent band header + mono-style contact, badge section labels
import { ResumeData, ResumeTheme } from "@/types/resume";
import { ContactRow, SectionBlock } from "../TemplateBase";

interface Props { data: ResumeData; theme: ResumeTheme; }

export default function TechTemplate({ data, theme }: Props) {
  const { personal, sectionOrder, sections } = data;
  return (
    <div style={{ fontFamily: "var(--resume-body-font)", fontSize: 12, color: theme.text, backgroundColor: theme.bg, minHeight: "100%" }}>
      {/* Dark header */}
      <header style={{ background: "#0d1117", padding: "32px 48px 24px", borderBottom: `3px solid ${theme.primary}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ fontFamily: "var(--resume-heading-font)", fontSize: 28, fontWeight: 800, margin: 0, color: "white", letterSpacing: "-0.01em" }}>
              {personal.name || "Your Name"}
            </h1>
            {personal.title && (
              <p style={{ fontSize: 13, color: theme.primary, marginTop: 4, fontWeight: 600, fontFamily: "monospace" }}>
                {"// "}{personal.title}
              </p>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <ContactRow personal={personal} theme={{ ...theme, muted: "#8b949e" }} sep="\n" />
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{ padding: "28px 48px 32px" }}>
        {sectionOrder.map((sid) => (
          <SectionBlock key={sid} sid={sid} sections={sections} theme={theme} variant="badge" />
        ))}
      </div>
    </div>
  );
}
