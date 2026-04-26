"use client";

import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import { ToastProvider } from "@/components/ui/Toast";
import {
  Wand2, Zap, LayoutTemplate, Download, Sparkles,
  CheckCircle, ArrowRight, ChevronRight, FileText,
} from "lucide-react";

const FEATURES = [
  { icon: <Wand2 size={20} />,         title: "Simple Mode",    desc: "6-step guided wizard for beginners" },
  { icon: <LayoutTemplate size={20} />, title: "15 Templates",   desc: "From minimal to infographic layouts" },
  { icon: <Sparkles size={20} />,       title: "AI-Powered",     desc: "Profession-based section suggestions" },
  { icon: <Download size={20} />,       title: "PDF Export",     desc: "A4-ready, print-perfect output" },
];

const CHECKLIST = [
  "Real-time live preview",
  "Undo / Redo support",
  "localStorage auto-save",
  "ATS-friendly formatting",
  "Custom color themes",
  "JSON import / export",
];

// ── Floating resume document illustration ──────────────────────────────────
function ResumeIllustration() {
  return (
    <div style={{ position: "relative", width: 340, height: 420, flexShrink: 0 }}>
      {/* Glow behind */}
      <div style={{
        position: "absolute", inset: -40,
        background: "radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Main resume card — bobbing */}
      <div style={{
        position: "absolute", left: 20, top: 20, right: 20, bottom: 20,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 20,
        padding: "28px 24px",
        boxShadow: "0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
        animation: "float-resume 4s ease-in-out infinite",
      }}>
        {/* Header strip */}
        <div style={{
          height: 8, borderRadius: 4, marginBottom: 6,
          background: "linear-gradient(90deg, #6366f1, #a855f7)",
          animation: "shimmer-bar 2.5s ease-in-out infinite alternate",
        }} />

        {/* Name skeleton */}
        <div style={{ height: 16, width: "62%", background: "rgba(255,255,255,0.3)", borderRadius: 4, marginBottom: 6 }} />
        <div style={{ height: 9, width: "45%", background: "rgba(99,102,241,0.5)", borderRadius: 4, marginBottom: 14 }} />

        {/* Contact row */}
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {["38%","28%","22%"].map((w, i) => (
            <div key={i} style={{ height: 7, width: w, background: "rgba(255,255,255,0.15)", borderRadius: 3 }} />
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1.5, background: "rgba(99,102,241,0.4)", marginBottom: 14, borderRadius: 1 }} />

        {/* Section blocks */}
        {[
          { label: "55%", lines: ["88%","72%","81%"] },
          { label: "42%", lines: ["90%","65%","75%","80%"] },
          { label: "38%", lines: ["60%","70%"] },
        ].map((sec, si) => (
          <div key={si} style={{ marginBottom: 14 }}>
            <div style={{
              height: 8, width: sec.label,
              background: "rgba(99,102,241,0.6)",
              borderRadius: 3, marginBottom: 7,
            }} />
            {sec.lines.map((w, li) => (
              <div key={li} style={{
                height: 6, width: w,
                background: "rgba(255,255,255,0.12)",
                borderRadius: 3, marginBottom: li < sec.lines.length - 1 ? 5 : 0,
                animation: `shimmer-line ${1.8 + li * 0.3}s ease-in-out ${si * 0.4 + li * 0.15}s infinite alternate`,
              }} />
            ))}
          </div>
        ))}
      </div>

      {/* Floating badge — "ATS Ready" */}
      <div style={{
        position: "absolute", bottom: 30, left: -18,
        background: "linear-gradient(135deg,#10b981,#059669)",
        color: "white", fontWeight: 700, fontSize: 11,
        padding: "8px 14px", borderRadius: 30,
        boxShadow: "0 8px 24px rgba(16,185,129,0.4)",
        display: "flex", alignItems: "center", gap: 6,
        animation: "float-badge-l 3.5s ease-in-out 0.5s infinite",
        whiteSpace: "nowrap",
      }}>
        <CheckCircle size={12} /> ATS Ready
      </div>

      {/* Floating badge — "15 Templates" */}
      <div style={{
        position: "absolute", top: 30, right: -22,
        background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        color: "white", fontWeight: 700, fontSize: 11,
        padding: "8px 14px", borderRadius: 30,
        boxShadow: "0 8px 24px rgba(99,102,241,0.45)",
        display: "flex", alignItems: "center", gap: 6,
        animation: "float-badge-r 3s ease-in-out 1s infinite",
        whiteSpace: "nowrap",
      }}>
        <Sparkles size={11} /> 15 Templates
      </div>

      {/* Floating badge — "Live Preview" */}
      <div style={{
        position: "absolute", top: "52%", right: -30,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "var(--text-primary)", fontWeight: 600, fontSize: 11,
        padding: "7px 12px", borderRadius: 24,
        display: "flex", alignItems: "center", gap: 6,
        animation: "float-badge-r 4s ease-in-out 0.3s infinite",
        whiteSpace: "nowrap",
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", animation: "pulse-dot 1.5s ease-in-out infinite" }} />
        Live Preview
      </div>

      {/* Small floating sparkles */}
      {[
        { top: "8%", left: "6%", delay: "0s", size: 6, color: "#6366f1" },
        { top: "18%", right: "8%", delay: "0.7s", size: 5, color: "#a855f7" },
        { bottom: "16%", right: "14%", delay: "1.3s", size: 7, color: "#06b6d4" },
        { bottom: "35%", left: "4%", delay: "0.4s", size: 5, color: "#f59e0b" },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute", ...s,
          width: s.size, height: s.size, borderRadius: "50%",
          background: s.color,
          boxShadow: `0 0 8px ${s.color}`,
          animation: `twinkle 2s ease-in-out ${s.delay} infinite`,
        }} />
      ))}
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const { resume } = useResumeStore();
  const hasSavedResume = Boolean(resume.personal.name || resume.meta.updatedAt !== resume.meta.createdAt);

  return (
    <>
      <ToastProvider />

      {/* Animated background */}
      <div className="bg-animated">
        <div className="bg-grid" />
        <div className="bg-orb-3" />
      </div>

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Nav */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 48px",
          borderBottom: "1px solid var(--border-subtle)",
        }}>
          {/* Animated logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", width: 36, height: 36, flexShrink: 0 }}>
              <span style={{
                position: "absolute", inset: -5, borderRadius: "50%",
                border: "1.5px solid rgba(99,102,241,0.4)",
                animation: "logo-ring 2.6s ease-in-out infinite",
              }} />
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: "logo-bob 3s ease-in-out infinite",
                boxShadow: "0 0 16px rgba(99,102,241,0.5)",
              }}>
                <Wand2 size={18} color="white" />
              </div>
            </div>
            <span style={{
              fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em",
              background: "linear-gradient(90deg,#6366f1 0%,#a855f7 40%,#06b6d4 70%,#6366f1 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "logo-shimmer 3s linear infinite",
            }}>
              ResumeForge
            </span>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {hasSavedResume && (
              <button className="btn btn-ghost btn-sm" onClick={() => router.push("/simple")}>
                Continue Editing
              </button>
            )}
            <button className="btn btn-primary btn-sm" onClick={() => router.push("/simple")}>
              Get Started <ArrowRight size={14} />
            </button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "60px 48px 40px",
          gap: 64,
          maxWidth: 1160, margin: "0 auto", width: "100%",
        }}>
          {/* Left: copy */}
          <div style={{ flex: 1, maxWidth: 580 }}>
            <div
              className="badge badge-accent animate-fade-in"
              style={{ marginBottom: 22, padding: "6px 14px", fontSize: 12, display: "inline-flex" }}
            >
              <Sparkles size={12} /> 100% Free · No signup required
            </div>

            <h1
              className="animate-slide-up"
              style={{
                fontWeight: 900,
                fontSize: "clamp(32px,5vw,62px)",
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
                marginBottom: 22,
              }}
            >
              Build a{" "}
              <span style={{
                background: "linear-gradient(135deg,#6366f1,#a855f7,#06b6d4)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "logo-shimmer 4s linear infinite",
                backgroundSize: "200% auto",
              }}>
                stunning resume
              </span>{" "}
              that gets you hired
            </h1>

            <p
              className="animate-slide-up animate-delay-100"
              style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.72, marginBottom: 36 }}
            >
              Professional resume builder with profession-smart section suggestions,
              15 beautiful templates, real-time preview, and drag-and-drop editing.
              All free — no account needed.
            </p>

            <div className="animate-slide-up animate-delay-200" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
              <button id="btn-simple-mode" className="btn btn-primary btn-lg" onClick={() => router.push("/simple")}>
                <Zap size={18} /> Start Simple Mode
              </button>
              <button id="btn-advanced-editor" className="btn btn-ghost btn-lg" onClick={() => router.push("/editor")}>
                <LayoutTemplate size={18} /> Advanced Editor <ChevronRight size={16} />
              </button>
            </div>

            {/* Checklist */}
            <div
              className="animate-fade-in animate-delay-300"
              style={{ display: "flex", flexWrap: "wrap", gap: "7px 20px" }}
            >
              {CHECKLIST.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-secondary)" }}>
                  <CheckCircle size={13} style={{ color: "var(--success)" }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Animated illustration */}
          <div className="animate-fade-in animate-delay-200" style={{ flexShrink: 0 }}>
            <ResumeIllustration />
          </div>
        </section>

        {/* ── Mode Cards ── */}
        <section style={{ padding: "0 48px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 960, margin: "0 auto", width: "100%" }}>
          {/* Simple Mode */}
          <div id="card-simple-mode" className="glass-card animate-slide-up animate-delay-200"
            style={{ padding: "32px 28px", cursor: "pointer", position: "relative", overflow: "hidden" }}
            onClick={() => router.push("/simple")}
          >
            <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(99,102,241,0.07)" }} />
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "var(--accent)" }}>
              <Zap size={22} />
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Simple Mode</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>
              6-step guided wizard. Pick your profession, fill in your details, choose a template  — get a professional resume instantly.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {["Profession-smart suggestions", "3 template choices", "Instant preview"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
                  <CheckCircle size={13} style={{ color: "var(--success)" }} /> {f}
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 22, width: "100%" }}>
              Start Simple Mode <ArrowRight size={14} />
            </button>
          </div>

          {/* Advanced Mode */}
          <div id="card-advanced-editor" className="glass-card animate-slide-up animate-delay-300"
            style={{ padding: "32px 28px", cursor: "pointer", position: "relative", overflow: "hidden" }}
            onClick={() => router.push("/editor")}
          >
            <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(168,85,247,0.07)" }} />
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "#a855f7" }}>
              <LayoutTemplate size={22} />
            </div>
            <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Advanced Editor</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>
              Full control with drag-and-drop sections, rich text editing, all 15 templates,
              custom colour themes, and live preview.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {["Drag-and-drop reordering", "Rich text editor (TipTap)", "Custom sections + 15 themes"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
                  <CheckCircle size={13} style={{ color: "#a855f7" }} /> {f}
                </div>
              ))}
            </div>
            <button className="btn btn-ghost" style={{ marginTop: 22, width: "100%", borderColor: "rgba(168,85,247,0.3)", color: "#a855f7" }}>
              Open Advanced Editor <ArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* ── Features row ── */}
        <section style={{ padding: "0 48px 72px", maxWidth: 960, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className="glass animate-fade-in"
                style={{ borderRadius: "var(--radius-lg)", padding: "20px 16px", textAlign: "center",
                  animationDelay: `${i * 80}ms` }}
              >
                <div style={{ color: "var(--accent)", marginBottom: 10, display: "flex", justifyContent: "center" }}>{f.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "20px", borderTop: "1px solid var(--border-subtle)", fontSize: 12, color: "var(--text-muted)" }}>
          ResumeForge · 100% Free · All Rights Reserved © 2026
        </footer>
      </div>
    </>
  );
}
