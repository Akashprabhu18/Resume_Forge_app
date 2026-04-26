"use client";
import { useResumeStore } from "@/store/useResumeStore";
import RichEditor from "@/components/ui/RichEditor";
import { SummarySection } from "@/types/resume";
import { useState } from "react";
import ProfessionSuggestions from "./ProfessionSuggestions";
import { FileText } from "lucide-react";

const KEYWORDS = ["Results-driven", "Passionate", "Detail-oriented", "Collaborative", "Innovative", "Strategic", "Motivated"];

export default function SummaryStep() {
  const { resume, updateSummary } = useResumeStore();
  const summary = resume.sections.summary as SummarySection;
  const professionId = resume.meta.profession;

  // Track which suggestions have been used so we can show ✓ state
  const [usedSuggestions, setUsedSuggestions] = useState<Set<string>>(new Set());

  const handleSuggestionSelect = (text: string) => {
    updateSummary(text);
    setUsedSuggestions((prev) => new Set(prev).add(text));
  };

  const handleKeyword = (kw: string) => {
    const current = summary?.content ?? "";
    updateSummary(current + (current ? " " : "") + kw);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Profession-based summary suggestions */}
      {professionId && (
        <ProfessionSuggestions
          professionId={professionId}
          type="summary"
          onSelect={handleSuggestionSelect}
          added={usedSuggestions}
        />
      )}

      {/* No profession selected: gentle nudge */}
      {!professionId && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "10px 14px",
          borderRadius: 10, background: "rgba(99,102,241,0.07)",
          border: "1px dashed rgba(99,102,241,0.25)",
        }}>
          <FileText size={13} style={{ color: "var(--accent)" }} />
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Go back to <strong style={{ color: "var(--accent)" }}>Profession</strong> step to get personalised summary suggestions.
          </span>
        </div>
      )}

      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
        Write a compelling 2–4 sentence professional summary highlighting your experience, skills, and goals.
      </p>

      <RichEditor
        content={summary?.content ?? ""}
        onChange={updateSummary}
        placeholder="Results-driven professional with X+ years of experience..."
        minHeight={160}
      />

      {/* Quick keyword chips */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Add a power word
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {KEYWORDS.map((kw) => (
            <button
              key={kw}
              className="badge badge-accent"
              style={{ cursor: "pointer" }}
              onClick={() => handleKeyword(kw)}
            >
              + {kw}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
