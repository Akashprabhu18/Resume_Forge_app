"use client";
import { useResumeStore } from "@/store/useResumeStore";
import { THEMES, FONT_PAIRS, THEME_LABELS } from "@/config/themes";
import type { ThemeId, TemplateId, FontPair } from "@/types/resume";
import { X, Palette, Layout, Type, CheckCircle2 } from "lucide-react";

// Visual thumbnail representations for each template (mini layout diagram)
const TEMPLATE_META: Record<TemplateId, { label: string; desc: string; preview: string }> = {
  minimal:      { label: "Minimal",       desc: "Clean single-column",          preview: "M" },
  modern:       { label: "Modern",        desc: "Colored header + sidebar",      preview: "D" },
  creative:     { label: "Creative",      desc: "Bold sidebar layout",           preview: "S" },
  executive:    { label: "Executive",     desc: "Double-line headings",          preview: "M" },
  elegant:      { label: "Elegant",       desc: "Centered serif header",         preview: "C" },
  bold:         { label: "Bold",          desc: "Gradient hero header",          preview: "H" },
  tech:         { label: "Tech",          desc: "Dark header, badge labels",     preview: "T" },
  compact:      { label: "Compact",       desc: "Dense 2-column, max content",   preview: "D" },
  academic:     { label: "Academic",      desc: "Traditional CV, serif",         preview: "C" },
  infographic:  { label: "Infographic",   desc: "Skill bars + avatar sidebar",   preview: "S" },
  professional: { label: "Professional",  desc: "ATS-safe black & white",        preview: "M" },
  startup:      { label: "Startup",       desc: "Card sections, gradient hero",  preview: "G" },
  graduate:     { label: "Graduate",      desc: "Education-first layout",        preview: "M" },
  designer:     { label: "Designer",      desc: "Portrait display name",         preview: "S" },
  timeline:     { label: "Timeline",      desc: "Visual experience timeline",    preview: "T" },
};

// Mini layout thumbnails using colored blocks
function TemplateThumbnail({ tid, accent, selected }: { tid: TemplateId; accent: string; selected: boolean }) {
  const side = { width: "38%", background: selected ? accent : "rgba(255,255,255,0.2)", height: "100%", borderRadius: "2px 0 0 2px" };
  const LAYOUT: Record<string, React.ReactNode> = {
    M: (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ height: 10, background: selected ? accent : "rgba(255,255,255,0.35)", borderRadius: 2 }} />
        {["100%","80%","90%","70%"].map((w,i) => <div key={i} style={{ height: 4, width: w, background: "rgba(255,255,255,0.2)", borderRadius: 2 }} />)}
      </div>
    ),
    S: (
      <div style={{ width: "100%", display: "flex", gap: 3, height: "100%" }}>
        <div style={side} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {["100%","80%","90%","60%","75%"].map((w,i) => <div key={i} style={{ height: 4, width: w, background: "rgba(255,255,255,0.2)", borderRadius: 2 }} />)}
        </div>
      </div>
    ),
    H: (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ height: 16, background: selected ? accent : "rgba(255,255,255,0.25)", borderRadius: 2 }} />
        {["100%","80%","90%"].map((w,i) => <div key={i} style={{ height: 4, width: w, background: "rgba(255,255,255,0.2)", borderRadius: 2 }} />)}
      </div>
    ),
    C: (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <div style={{ height: 8, width: "60%", background: selected ? accent : "rgba(255,255,255,0.3)", borderRadius: 2 }} />
        {["80%","90%","70%","85%"].map((w,i) => <div key={i} style={{ height: 4, width: w, background: "rgba(255,255,255,0.2)", borderRadius: 2 }} />)}
      </div>
    ),
    D: (
      <div style={{ width: "100%", display: "flex", gap: 3, height: "100%" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ height: 10, background: selected ? accent : "rgba(255,255,255,0.25)", borderRadius: 2 }} />
          {["100%","80%","90%"].map((w,i) => <div key={i} style={{ height: 4, width: w, background: "rgba(255,255,255,0.2)", borderRadius: 2 }} />)}
        </div>
        <div style={{ width: "35%", display: "flex", flexDirection: "column", gap: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2, padding: 2 }}>
          {["100%","80%","90%","70%","85%"].map((w,i) => <div key={i} style={{ height: 3, width: w, background: "rgba(255,255,255,0.2)", borderRadius: 2 }} />)}
        </div>
      </div>
    ),
    T: (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ height: 8, background: selected ? accent : "rgba(255,255,255,0.25)", borderRadius: 2 }} />
        {[0,1,2].map(i => (
          <div key={i} style={{ display: "flex", gap: 3, alignItems: "center" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: selected ? accent : "rgba(255,255,255,0.3)", flexShrink: 0 }} />
            <div style={{ height: 4, flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 2 }} />
          </div>
        ))}
      </div>
    ),
    G: (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ height: 12, background: `linear-gradient(90deg, ${selected ? accent : "rgba(255,255,255,0.3)"}, rgba(255,255,255,0.1))`, borderRadius: 2 }} />
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 2, padding: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {["100%","80%"].map((w,i) => <div key={i} style={{ height: 3, width: w, background: "rgba(255,255,255,0.2)", borderRadius: 2 }} />)}
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 2, padding: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {["90%","70%"].map((w,i) => <div key={i} style={{ height: 3, width: w, background: "rgba(255,255,255,0.15)", borderRadius: 2 }} />)}
        </div>
      </div>
    ),
  };
  const preview = TEMPLATE_META[tid].preview;
  return (
    <div style={{ width: "100%", height: 58, padding: 6, background: "rgba(0,0,0,0.15)", borderRadius: 6, overflow: "hidden" }}>
      {LAYOUT[preview]}
    </div>
  );
}

export default function ThemePanel() {
  const { resume, setTheme, setTemplate, setFont, setLayoutColumns, setThemePanelOpen } = useResumeStore();
  const { themeId, template, fontPair, layoutColumns } = resume.meta;

  return (
    <div
      className="glass-panel"
      style={{
        width: 280,
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Header */}
      <div className="flex-between" style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Palette size={16} style={{ color: "var(--accent)" }} />
          <span style={{ fontWeight: 600, fontSize: 14 }}>Customize</span>
        </div>
        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setThemePanelOpen(false)} title="Close Panel">
          <X size={14} />
        </button>
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Template Grid — 15 templates */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Layout size={14} style={{ color: "var(--text-secondary)" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Template — {Object.keys(TEMPLATE_META).length} Designs
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {(Object.keys(TEMPLATE_META) as TemplateId[]).map((tid) => {
              const isActive = template === tid;
              const accentColor = THEMES[themeId]?.primary ?? "#6366f1";
              return (
                <button
                  key={tid}
                  onClick={() => setTemplate(tid)}
                  style={{
                    padding: "8px 8px 10px",
                    borderRadius: "var(--radius-md)",
                    border: `2px solid ${isActive ? "var(--accent)" : "var(--border-default)"}`,
                    background: isActive ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.025)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all var(--transition-fast)",
                    position: "relative",
                  }}
                >
                  {isActive && (
                    <CheckCircle2 size={13} style={{ position: "absolute", top: 6, right: 6, color: "var(--accent)" }} />
                  )}
                  <TemplateThumbnail tid={tid} accent={accentColor} selected={isActive} />
                  <div style={{ fontWeight: 600, fontSize: 11, color: isActive ? "var(--accent)" : "var(--text-primary)", marginTop: 7 }}>
                    {TEMPLATE_META[tid].label}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2, lineHeight: 1.3 }}>
                    {TEMPLATE_META[tid].desc}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Theme Colors */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Palette size={14} style={{ color: "var(--text-secondary)" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Color Theme
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {(Object.entries(THEMES) as [ThemeId, { primary: string }][]).map(([tid, tData]) => (
              <button
                key={tid}
                onClick={() => setTheme(tid)}
                title={THEME_LABELS[tid]}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 10px",
                  borderRadius: "var(--radius-sm)",
                  border: `1px solid ${themeId === tid ? tData.primary : "var(--border-default)"}`,
                  background: themeId === tid ? `${tData.primary}20` : "rgba(255,255,255,0.03)",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
              >
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: tData.primary,
                    flexShrink: 0,
                    boxShadow: themeId === tid ? `0 0 8px ${tData.primary}80` : "none",
                  }}
                />
                <span style={{ fontSize: 11, color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {THEME_LABELS[tid]}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Font */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Type size={14} style={{ color: "var(--text-secondary)" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Typography
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {(Object.keys(FONT_PAIRS) as FontPair[]).map((fp) => (
              <button
                key={fp}
                onClick={() => setFont(fp)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "var(--radius-sm)",
                  border: `1px solid ${fontPair === fp ? "var(--accent)" : "var(--border-default)"}`,
                  background: fontPair === fp ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.03)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: FONT_PAIRS[fp].heading,
                  fontSize: 13,
                  color: fontPair === fp ? "var(--accent)" : "var(--text-primary)",
                  transition: "all var(--transition-fast)",
                }}
              >
                {FONT_PAIRS[fp].label}
              </button>
            ))}
          </div>
        </section>

        {/* Layout Columns */}
        <section>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 12 }}>
            Layout
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {([1, 2] as const).map((c) => (
              <button
                key={c}
                onClick={() => setLayoutColumns(c)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "var(--radius-sm)",
                  border: `1px solid ${layoutColumns === c ? "var(--accent)" : "var(--border-default)"}`,
                  background: layoutColumns === c ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.03)",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  color: layoutColumns === c ? "var(--accent)" : "var(--text-secondary)",
                  transition: "all var(--transition-fast)",
                }}
              >
                {c === 1 ? "Single Col" : "Two Col"}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
