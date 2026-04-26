"use client";
import { useResumeStore } from "@/store/useResumeStore";
import RichEditor from "@/components/ui/RichEditor";
import { SummarySection } from "@/types/resume";

export default function SummaryStep() {
  const { resume, updateSummary } = useResumeStore();
  const summary = resume.sections.summary as SummarySection;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
        Write a compelling professional summary or career objective. Keep it 2–4 sentences
        highlighting your experience, skills, and goals.
      </p>
      <RichEditor
        content={summary?.content ?? ""}
        onChange={updateSummary}
        placeholder="Results-driven software engineer with 5+ years building scalable web applications..."
        minHeight={180}
      />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[
          "Results-driven",
          "Passionate",
          "Detail-oriented",
          "Collaborative",
          "Innovative",
        ].map((kw) => (
          <button
            key={kw}
            className="badge badge-accent"
            style={{ cursor: "pointer", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}
            onClick={() => updateSummary(summary.content + (summary.content ? " " : "") + kw)}
          >
            + {kw}
          </button>
        ))}
      </div>
    </div>
  );
}
