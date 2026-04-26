"use client";

import { useState, useEffect } from "react";
import { PROFESSIONS, ProfessionConfig, ProfessionSection } from "@/config/professions";
import { useResumeStore } from "@/store/useResumeStore";
import { DynamicIcon } from "@/components/ui/IconPicker";
import {
  Sparkles, ChevronRight, CheckCircle2, Lightbulb, X,
  Check, Minus, Plus, Eye, EyeOff,
} from "lucide-react";

interface Props {
  onComplete: () => void;
  onSkip: () => void;
}

// Human-readable labels for built-in section IDs
const SECTION_LABELS: Record<string, string> = {
  summary:        "Career Summary",
  experience:     "Work Experience",
  education:      "Education",
  skills:         "Skills",
  projects:       "Projects",
  certifications: "Certifications",
};

export default function ProfessionStep({ onComplete, onSkip }: Props) {
  const { applyProfession, resume } = useResumeStore();

  const [selected, setSelected] = useState<ProfessionConfig | null>(
    resume.meta.profession
      ? PROFESSIONS.find((p) => p.id === resume.meta.profession) ?? null
      : null
  );
  const [hovered, setHovered] = useState<string | null>(null);

  // Local per-section include/exclude toggles — initialized from profession config
  const [sectionToggles, setSectionToggles] = useState<Record<string, boolean>>({});

  // Reset toggles whenever a profession is selected
  useEffect(() => {
    if (!selected) { setSectionToggles({}); return; }
    const init: Record<string, boolean> = {};
    selected.sectionOrder.forEach((s) => { init[s.sectionId] = s.visible; });
    setSectionToggles(init);
  }, [selected]);

  const toggleSection = (sectionId: string) => {
    setSectionToggles((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleApply = () => {
    if (!selected) return;
    // Build a modified profession config with user-chosen visibility
    const modifiedProfession: ProfessionConfig = {
      ...selected,
      sectionOrder: selected.sectionOrder.map((s) => ({
        ...s,
        visible: sectionToggles[s.sectionId] ?? s.visible,
      })),
    };
    applyProfession(modifiedProfession);
    onComplete();
  };

  const includedCount = Object.values(sectionToggles).filter(Boolean).length;

  return (
    <div style={{ padding: "28px 32px", maxWidth: 820, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "5px 14px", borderRadius: 20, marginBottom: 12,
          background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
        }}>
          <Sparkles size={13} style={{ color: "var(--accent)" }} />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--accent)" }}>Smart Setup</span>
        </div>
        <h2 style={{
          fontSize: 22, fontWeight: 800, margin: "0 0 6px",
          background: "linear-gradient(135deg, #6366f1, #a855f7)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          What's your profession?
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0 }}>
          Pick your field — then choose which sections to include in your resume.
        </p>
      </div>

      {/* Profession grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 9, marginBottom: 20 }}>
        {PROFESSIONS.map((prof) => {
          const isSelected = selected?.id === prof.id;
          const isHov = hovered === prof.id;
          return (
            <button
              key={prof.id}
              onClick={() => setSelected(isSelected ? null : prof)}
              onMouseEnter={() => setHovered(prof.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${prof.color}22, ${prof.color}10)`
                  : isHov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                border: isSelected
                  ? `2px solid ${prof.color}`
                  : isHov ? "2px solid rgba(255,255,255,0.2)" : "2px solid rgba(255,255,255,0.07)",
                borderRadius: 12, padding: "12px 14px", cursor: "pointer",
                textAlign: "left", transition: "all 200ms ease", position: "relative",
                transform: isHov || isSelected ? "translateY(-2px)" : "none",
                boxShadow: isSelected ? `0 4px 20px ${prof.color}30` : isHov ? "0 4px 16px rgba(0,0,0,0.2)" : "none",
              }}
            >
              {isSelected && (
                <CheckCircle2 size={14} style={{ position: "absolute", top: 8, right: 8, color: prof.color }} />
              )}
              <div style={{
                width: 32, height: 32, borderRadius: 9, marginBottom: 8,
                background: `${prof.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <DynamicIcon name={prof.icon} size={16} style={{ color: prof.color }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 12.5, color: "var(--text-primary)", marginBottom: 2 }}>
                {prof.label}
              </div>
              <div style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.3 }}>
                {prof.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive config panel — only shown when a profession is selected */}
      {selected && (
        <div style={{
          background: `${selected.color}0A`,
          border: `1.5px solid ${selected.color}35`,
          borderRadius: 16,
          padding: "18px 20px",
          marginBottom: 22,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Lightbulb size={14} style={{ color: selected.color }} />
            <span style={{ fontWeight: 700, fontSize: 13, color: selected.color }}>
              Customize your resume sections
            </span>
            {selected && (
              <span style={{
                marginLeft: "auto", fontSize: 11, fontWeight: 600,
                padding: "2px 10px", borderRadius: 20,
                background: `${selected.color}20`, color: selected.color,
              }}>
                {includedCount} of {selected.sectionOrder.length} included
              </span>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* ── Interactive section toggles ── */}
            <div>
              <div style={{
                fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 10,
              }}>
                Click to include or skip each section
              </div>

              {[...selected.sectionOrder]
                .sort((a, b) => a.order - b.order)
                .map((s) => {
                  const isIncluded = sectionToggles[s.sectionId] ?? s.visible;
                  const label = s.title || SECTION_LABELS[s.sectionId]
                    || (s.sectionId.charAt(0).toUpperCase() + s.sectionId.slice(1));
                  return (
                    <button
                      key={s.sectionId}
                      onClick={() => toggleSection(s.sectionId)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        marginBottom: 7,
                        padding: "9px 12px",
                        borderRadius: 10,
                        border: `1.5px solid ${isIncluded ? `${selected.color}50` : "rgba(255,255,255,0.08)"}`,
                        background: isIncluded
                          ? `${selected.color}12`
                          : "rgba(255,255,255,0.02)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 180ms ease",
                      }}
                    >
                      {/* Checkbox indicator */}
                      <div style={{
                        width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: isIncluded ? selected.color : "rgba(255,255,255,0.06)",
                        border: `1.5px solid ${isIncluded ? selected.color : "rgba(255,255,255,0.15)"}`,
                        transition: "all 180ms ease",
                      }}>
                        {isIncluded
                          ? <Check size={12} color="white" strokeWidth={3} />
                          : <Minus size={12} color="rgba(255,255,255,0.3)" strokeWidth={2} />
                        }
                      </div>

                      {/* Label */}
                      <span style={{
                        fontSize: 12.5,
                        fontWeight: isIncluded ? 600 : 400,
                        color: isIncluded ? "var(--text-primary)" : "var(--text-muted)",
                        textDecoration: isIncluded ? "none" : "line-through",
                        flex: 1,
                        transition: "all 180ms ease",
                      }}>
                        {label}
                      </span>

                      {/* Include / Skip badge */}
                      <span style={{
                        fontSize: 10, fontWeight: 600,
                        padding: "2px 7px", borderRadius: 20,
                        background: isIncluded ? `${selected.color}20` : "rgba(255,255,255,0.04)",
                        color: isIncluded ? selected.color : "var(--text-muted)",
                        border: `1px solid ${isIncluded ? `${selected.color}40` : "rgba(255,255,255,0.08)"}`,
                        transition: "all 180ms ease",
                      }}>
                        {isIncluded ? "Include" : "Skip"}
                      </span>
                    </button>
                  );
                })}

              <p style={{ fontSize: 10.5, color: "var(--text-muted)", marginTop: 8, lineHeight: 1.5 }}>
                ✦ Skipped sections won't appear in your resume. You can always re-enable them in the editor.
              </p>
            </div>

            {/* ── Right column: Tips + Skills ── */}
            <div>
              {/* Pro Tips */}
              <div style={{ marginBottom: 16 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 10,
                }}>
                  Pro Tips for {selected.label}
                </div>
                {selected.tips.map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                    <span style={{
                      fontSize: 16, lineHeight: 1, color: selected.color, flexShrink: 0,
                    }}>›</span>
                    <span style={{ fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>
                      {tip}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key skills */}
              {selected.keySkills.length > 0 && (
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 8,
                  }}>
                    Suggested Key Skills
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {selected.keySkills.slice(0, 12).map((skill) => (
                      <span key={skill} style={{
                        fontSize: 10.5, padding: "3px 9px", borderRadius: 20,
                        background: `${selected.color}18`, color: selected.color,
                        border: `1px solid ${selected.color}30`, fontWeight: 500,
                      }}>{skill}</span>
                    ))}
                    {selected.keySkills.length > 12 && (
                      <span style={{ fontSize: 10, color: "var(--text-muted)", padding: "3px 6px" }}>
                        +{selected.keySkills.length - 12} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={onSkip}
          style={{ gap: 6, color: "var(--text-muted)" }}
        >
          <X size={13} />
          Skip setup
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={handleApply}
          disabled={!selected || includedCount === 0}
          style={{
            gap: 8,
            opacity: selected && includedCount > 0 ? 1 : 0.4,
            transition: "opacity 200ms",
          }}
        >
          <Sparkles size={13} />
          Apply {includedCount > 0 ? `${includedCount} sections` : ""} & Continue
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
