"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import { ToastProvider } from "@/components/ui/Toast";
import Toolbar from "@/components/shared/Toolbar";
import ThemePanel from "@/components/shared/ThemePanel";
import SectionList from "@/components/editor/SectionList";
import ResumePreview from "@/components/preview/ResumePreview";
import { GlassInput } from "@/components/ui/GlassInput";
import { User } from "lucide-react";

export default function EditorPage() {
  const { resume, updatePersonal, undo, redo, ui } = useResumeStore();

  // Global Ctrl+Z / Ctrl+Y
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  return (
    <>
      <ToastProvider />
      <div className="bg-animated">
        <div className="bg-grid" />
        <div className="bg-orb-3" />
      </div>

      <div style={{ position: "relative", zIndex: 1, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Toolbar mode="editor" />

        <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
          {/* Left editor panel */}
          <div
            style={{
              width: 480,
              borderRight: "1px solid var(--border-subtle)",
              overflowY: "auto",
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Personal info mini section */}
            <div style={{ padding: "20px 20px 0" }}>
              <div
                className="glass-card"
                style={{ padding: 20, marginBottom: 16 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <User size={16} style={{ color: "var(--accent)" }} />
                  <span style={{ fontWeight: 700, fontSize: 14 }}>Personal Info</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <GlassInput label="Full Name" placeholder="John Doe" value={resume.personal.name} onChange={(e) => updatePersonal({ name: e.target.value })} />
                  <GlassInput label="Title" placeholder="Software Engineer" value={resume.personal.title} onChange={(e) => updatePersonal({ title: e.target.value })} />
                  <GlassInput label="Email" placeholder="john@example.com" value={resume.personal.email} onChange={(e) => updatePersonal({ email: e.target.value })} />
                  <GlassInput label="Phone" placeholder="+1 555 0000" value={resume.personal.phone} onChange={(e) => updatePersonal({ phone: e.target.value })} />
                  <GlassInput label="Location" placeholder="New York, NY" value={resume.personal.location} onChange={(e) => updatePersonal({ location: e.target.value })} />
                  <GlassInput label="LinkedIn" placeholder="linkedin.com/in/..." value={resume.personal.linkedin} onChange={(e) => updatePersonal({ linkedin: e.target.value })} />
                  <GlassInput label="GitHub" placeholder="github.com/..." value={resume.personal.github} onChange={(e) => updatePersonal({ github: e.target.value })} />
                  <GlassInput label="Website" placeholder="https://..." value={resume.personal.website} onChange={(e) => updatePersonal({ website: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Sections — drag to reorder
                </span>
              </div>
              <SectionList />
            </div>
          </div>

          {/* Right: Live preview */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              minHeight: 0,
              background: "rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Live Preview
            </span>
            <div
              style={{
                transform: "scale(0.65)",
                transformOrigin: "top center",
                width: 794,
                marginBottom: -400,
              }}
            >
              <ResumePreview data={resume} />
            </div>
          </div>

          {/* Theme Panel */}
          {ui.themePanelOpen && (
            <div style={{ borderLeft: "1px solid var(--border-subtle)", overflowY: "auto", flexShrink: 0 }}>
              <ThemePanel />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
