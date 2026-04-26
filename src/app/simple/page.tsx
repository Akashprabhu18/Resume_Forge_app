"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import { ToastProvider, toast } from "@/components/ui/Toast";
import Toolbar from "@/components/shared/Toolbar";
import ThemePanel from "@/components/shared/ThemePanel";
import ResumePreview from "@/components/preview/ResumePreview";
import PersonalStep from "@/components/simple/PersonalStep";
import SummaryStep from "@/components/simple/SummaryStep";
import ExperienceStep from "@/components/simple/ExperienceStep";
import EducationStep from "@/components/simple/EducationStep";
import SkillsStep from "@/components/simple/SkillsStep";
import ProfessionStep from "@/components/simple/ProfessionStep";
import TemplateStep from "@/components/simple/TemplateStep";
import {
  User, FileText, Briefcase, GraduationCap, Zap,
  ChevronLeft, ChevronRight, LayoutTemplate, Sparkles,
} from "lucide-react";

const STEPS = [
  { label: "Personal",   icon: <User size={16} />,           component: PersonalStep },
  { label: "Summary",    icon: <FileText size={16} />,        component: SummaryStep },
  { label: "Experience", icon: <Briefcase size={16} />,      component: ExperienceStep },
  { label: "Education",  icon: <GraduationCap size={16} />,  component: EducationStep },
  { label: "Skills",     icon: <Zap size={16} />,            component: SkillsStep },
  { label: "Template",   icon: <LayoutTemplate size={16} />, component: TemplateStep },
];

export default function SimplePage() {
  const { resume, setMode, ui } = useResumeStore();
  const router = useRouter();
  // -1 = profession picker, 0-4 = wizard steps
  const [step, setStep] = useState<number>(-1);
  const [showPreview, setShowPreview] = useState(false);

  const StepComponent = step >= 0 ? STEPS[step]?.component : null;
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  const handleNext = () => {
    if (isLast) {
      router.push("/preview");
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleSwitchAdvanced = () => {
    setMode("advanced");
    toast.info("Switched to Advanced Editor — your data is preserved!");
    router.push("/editor");
  };

  return (
    <>
      <ToastProvider />
      <div className="bg-animated">
        <div className="bg-grid" />
        <div className="bg-orb-3" />
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        height: "100vh",          /* fixed viewport height — no body scroll */
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        <Toolbar mode="simple" />

        <div style={{ flex: 1, display: "flex", minHeight: 0 /* ← key: lets children shrink below content size */ }}>
          {/* Left: Form panel — this is the ONLY scrollable area */}
          <div
            style={{
              flex: showPreview ? "0 0 55%" : "1",
              overflowY: "auto",
              overflowX: "hidden",
              padding: "32px",
              minHeight: 0,          /* required by flex scroll fix */
              transition: "flex var(--transition-base)",
            }}
          >
      {/* Step Progress (only shown in wizard steps) */}
            {step >= 0 && (
            <div style={{ display: "flex", alignItems: "center", marginBottom: 36 }}>
              {STEPS.map((s, i) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <button
                    onClick={() => setStep(i)}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer" }}
                  >
                    <div className={`step-dot${i === step ? " active" : i < step ? " completed" : ""}`}>
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span style={{ fontSize: 11, color: i === step ? "var(--accent)" : "var(--text-muted)", fontWeight: i === step ? 600 : 400, whiteSpace: "nowrap" }}>
                      {s.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`step-line${i < step ? " completed" : ""}`} />
                  )}
                </div>
              ))}
            </div>
            )}

            {/* Step Card */}
            {step === -1 ? (
              <div key="profession" className="glass-card animate-slide-up" style={{ marginBottom: 24 }}>
                <ProfessionStep
                  onComplete={() => setStep(0)}
                  onSkip={() => setStep(0)}
                />
              </div>
            ) : StepComponent ? (
            <div
              key={step}
              className="glass-card animate-slide-up"
              style={{ padding: "32px", marginBottom: 24 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "rgba(99,102,241,0.15)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                }}>
                  {STEPS[step].icon}
                </div>
                <div>
                  <h2 style={{ fontWeight: 700, fontSize: 20, margin: 0 }}>
                    Step {step + 1} of {STEPS.length}: {STEPS[step].label}
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
                    Fill in your {STEPS[step].label.toLowerCase()} information
                  </p>
                </div>
              </div>

              <StepComponent />
            </div>
            ) : null}

            {/* Navigation (only in wizard steps) */}
            {step >= 0 && (
            <div className="flex-between">
              <button
                className="btn btn-ghost"
                onClick={() => setStep((s) => s - 1)}
                disabled={isFirst}
                style={{ opacity: isFirst ? 0.4 : 1 }}
              >
                <ChevronLeft size={16} /> Back
              </button>

              <div style={{ display: "flex", gap: 10 }}>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setStep(-1)}
                    title="Change profession"
                  >
                    <Sparkles size={14} />
                    Profession
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? "Hide" : "Show"} Preview
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={handleSwitchAdvanced}
                    title="Switch to Advanced Editor"
                  >
                    <LayoutTemplate size={14} />
                    Advanced
                  </button>
                  <button className="btn btn-primary" onClick={handleNext}>
                    {isLast ? "Preview Resume" : "Next"}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Live Preview */}
          {showPreview && (
            <div
              style={{
                flex: "0 0 45%",
                borderLeft: "1px solid var(--border-subtle)",
                overflowY: "auto",
                padding: "24px",
                background: "rgba(0,0,0,0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>LIVE PREVIEW</span>
              <div style={{ transform: "scale(0.55)", transformOrigin: "top center", width: 794, marginBottom: -500 }}>
                <ResumePreview data={resume} />
              </div>
            </div>
          )}

          {/* Theme Panel */}
          {ui.themePanelOpen && (
            <div style={{ borderLeft: "1px solid var(--border-subtle)", height: "calc(100vh - 56px)", position: "sticky", top: 56 }}>
              <ThemePanel />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
