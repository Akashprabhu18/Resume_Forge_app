"use client";

import { useResumeStore } from "@/store/useResumeStore";
import type { TemplateId } from "@/types/resume";
import { CheckCircle2, LayoutTemplate } from "lucide-react";

// ── The 3 curated simple-mode templates ──────────────────────
const SIMPLE_TEMPLATES: {
  id: TemplateId;
  label: string;
  description: string;
  tag: string;
  tagColor: string;
  preview: React.ReactNode;
}[] = [
  {
    id: "minimal",
    label: "Minimal",
    description: "Clean & spacious. ATS-friendly, great for any industry.",
    tag: "Most Popular",
    tagColor: "#6366f1",
    preview: (
      <div style={{ width: "100%", height: "100%", background: "white", padding: 10, display: "flex", flexDirection: "column", gap: 5 }}>
        {/* Header */}
        <div style={{ borderBottom: "2px solid #6366f1", paddingBottom: 6 }}>
          <div style={{ height: 9, width: "55%", background: "#1a1a2e", borderRadius: 2, marginBottom: 3 }} />
          <div style={{ height: 6, width: "35%", background: "#6366f1", borderRadius: 2, marginBottom: 4 }} />
          <div style={{ display: "flex", gap: 6 }}>
            {["40%","30%","25%"].map((w,i) => <div key={i} style={{ height: 4, width: w, background: "#94a3b8", borderRadius: 2 }} />)}
          </div>
        </div>
        {/* Sections */}
        {[
          { w: "28%", lines: ["85%","70%","80%"] },
          { w: "32%", lines: ["90%","65%","75%","80%"] },
          { w: "24%", lines: ["60%","70%"] },
        ].map((sec, si) => (
          <div key={si}>
            <div style={{ height: 5, width: sec.w, background: "#6366f1", borderRadius: 1, marginBottom: 4, borderBottom: "1px solid #6366f155" }} />
            {sec.lines.map((w, li) => <div key={li} style={{ height: 3.5, width: w, background: "#cbd5e1", borderRadius: 1, marginBottom: 2.5 }} />)}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "modern",
    label: "Modern",
    description: "Bold colored header with two-column layout. Visually striking.",
    tag: "Recommended",
    tagColor: "#10b981",
    preview: (
      <div style={{ width: "100%", height: "100%", background: "white", display: "flex", flexDirection: "column" }}>
        {/* Colored header */}
        <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", padding: "10px 10px 8px" }}>
          <div style={{ height: 9, width: "50%", background: "rgba(255,255,255,0.9)", borderRadius: 2, marginBottom: 4 }} />
          <div style={{ height: 5, width: "35%", background: "rgba(255,255,255,0.6)", borderRadius: 2, marginBottom: 5 }} />
          <div style={{ display: "flex", gap: 5 }}>
            {["30%","25%","22%"].map((w,i) => <div key={i} style={{ height: 3.5, width: w, background: "rgba(255,255,255,0.5)", borderRadius: 2 }} />)}
          </div>
        </div>
        {/* Two-col body */}
        <div style={{ flex: 1, display: "flex", gap: 0, padding: 6 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, paddingRight: 6, borderRight: "1px solid #e2e8f0" }}>
            {[["85%","70%","80%"],["90%","65%"]].map((lines, si) => (
              <div key={si}>
                <div style={{ height: 4.5, width: "60%", background: "#6366f1", borderRadius: 1, marginBottom: 3 }} />
                {lines.map((w,i) => <div key={i} style={{ height: 3, width: w, background: "#cbd5e1", borderRadius: 1, marginBottom: 2 }} />)}
              </div>
            ))}
          </div>
          <div style={{ width: 44, paddingLeft: 6, display: "flex", flexDirection: "column", gap: 4 }}>
            {[["80%","65%","75%"],["70%","85%"]].map((lines, si) => (
              <div key={si}>
                <div style={{ height: 4, width: "90%", background: "#8b5cf6", borderRadius: 1, marginBottom: 3 }} />
                {lines.map((w,i) => <div key={i} style={{ height: 3, width: w, background: "#ddd6fe", borderRadius: 1, marginBottom: 2 }} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "creative",
    label: "Creative",
    description: "Vivid sidebar with accent colour. Perfect for design roles.",
    tag: "Stand Out",
    tagColor: "#f59e0b",
    preview: (
      <div style={{ width: "100%", height: "100%", background: "white", display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: 52, background: "linear-gradient(180deg,#4f46e5,#7c3aed)", padding: "10px 7px", display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(255,255,255,0.25)", marginBottom: 4 }} />
          {[["90%"],["80%","70%"],["90%","75%","80%"]].map((lines, si) => (
            <div key={si} style={{ width: "100%" }}>
              <div style={{ height: 3.5, width: "70%", background: "rgba(255,255,255,0.5)", borderRadius: 1, marginBottom: 3 }} />
              {lines.map((w,i) => <div key={i} style={{ height: 2.5, width: w, background: "rgba(255,255,255,0.3)", borderRadius: 1, marginBottom: 2 }} />)}
            </div>
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 5 }}>
            <div style={{ height: 8, width: "60%", background: "#1a1a2e", borderRadius: 2, marginBottom: 3 }} />
            <div style={{ height: 5, width: "40%", background: "#7c3aed", borderRadius: 2 }} />
          </div>
          {[["85%","70%","80%"],["90%","65%","75%"]].map((lines, si) => (
            <div key={si}>
              <div style={{ height: 4.5, width: "50%", background: "#4f46e5", borderRadius: 1, marginBottom: 3 }} />
              {lines.map((w,i) => <div key={i} style={{ height: 3, width: w, background: "#e2e8f0", borderRadius: 1, marginBottom: 2 }} />)}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function TemplateStep() {
  const { resume, setTemplate } = useResumeStore();
  const current = resume.meta.template;

  // If user is on a non-simple-mode template, default highlight to minimal
  const activeId = SIMPLE_TEMPLATES.find(t => t.id === current)?.id ?? "minimal";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <LayoutTemplate size={16} style={{ color: "var(--accent)" }} />
        <div>
          <h3 style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>Pick a Template</h3>
          <p style={{ margin: 0, fontSize: 12.5, color: "var(--text-muted)" }}>
            You can change this anytime from the Theme panel.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 20 }}>
        {SIMPLE_TEMPLATES.map((tmpl) => {
          const isActive = tmpl.id === activeId || tmpl.id === current;
          return (
            <button
              key={tmpl.id}
              onClick={() => setTemplate(tmpl.id)}
              style={{
                background: "none",
                border: `2.5px solid ${isActive ? "var(--accent)" : "var(--border-default)"}`,
                borderRadius: 14,
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
                overflow: "hidden",
                transition: "all 200ms ease",
                boxShadow: isActive
                  ? "0 0 0 4px rgba(99,102,241,0.15), 0 8px 24px rgba(0,0,0,0.2)"
                  : "0 2px 12px rgba(0,0,0,0.1)",
                transform: isActive ? "translateY(-3px)" : "none",
                position: "relative",
              }}
            >
              {/* Active checkmark */}
              {isActive && (
                <div style={{
                  position: "absolute", top: 8, right: 8, zIndex: 2,
                  background: "var(--accent)", borderRadius: "50%", padding: 2,
                }}>
                  <CheckCircle2 size={14} color="white" />
                </div>
              )}

              {/* Tag */}
              <div style={{
                position: "absolute", top: 8, left: 8, zIndex: 2,
                background: tmpl.tagColor,
                color: "white", fontSize: 9, fontWeight: 700,
                padding: "2px 8px", borderRadius: 20,
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                {tmpl.tag}
              </div>

              {/* Visual preview box */}
              <div style={{
                height: 180,
                background: "#f8faff",
                overflow: "hidden",
                position: "relative",
                borderBottom: `2px solid ${isActive ? "var(--accent)" : "var(--border-subtle)"}`,
              }}>
                {tmpl.preview}
              </div>

              {/* Label */}
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: isActive ? "var(--accent)" : "var(--text-primary)", marginBottom: 4 }}>
                  {tmpl.label}
                </div>
                <div style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {tmpl.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p style={{ marginTop: 16, fontSize: 11.5, color: "var(--text-muted)", textAlign: "center" }}>
        ✦ Want more layouts? Switch to the{" "}
        <strong style={{ color: "var(--accent)" }}>Advanced Editor</strong> to unlock all 15 templates.
      </p>
    </div>
  );
}
