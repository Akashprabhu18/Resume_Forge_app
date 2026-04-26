"use client";

import { useState } from "react";
import { getProfessionById } from "@/config/professions";
import { Sparkles, ChevronDown, ChevronUp, Plus, Check } from "lucide-react";

interface Props {
  professionId: string | undefined;
  /** "summary" | "experience" | "skills" */
  type: "summary" | "experience" | "skills";
  /** Called when user clicks a suggestion chip */
  onSelect: (text: string) => void;
  /** Optional: set of already-added items (to show ✓ state) */
  added?: Set<string>;
}

export default function ProfessionSuggestions({ professionId, type, onSelect, added }: Props) {
  const [expanded, setExpanded] = useState(true);

  if (!professionId) return null;
  const prof = getProfessionById(professionId);
  if (!prof) return null;

  const suggestions =
    type === "summary"    ? prof.summarySuggestions :
    type === "experience" ? prof.experienceBullets  :
    prof.keySkills;

  if (!suggestions?.length) return null;

  const label =
    type === "summary"    ? "Summary templates for " :
    type === "experience" ? "Suggested bullet points for " :
    "Key skills for ";

  return (
    <div style={{
      border: `1.5px solid ${prof.color}30`,
      borderRadius: 14,
      overflow: "hidden",
      animation: "fadeIn 0.3s ease",
    }}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          background: `${prof.color}0E`,
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <Sparkles size={13} style={{ color: prof.color, flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: prof.color, flex: 1 }}>
          {label}<strong>{prof.label}</strong>
        </span>
        <span style={{ fontSize: 10, color: "var(--text-muted)", marginRight: 4 }}>
          {suggestions.length} suggestions
        </span>
        {expanded
          ? <ChevronUp size={13} style={{ color: "var(--text-muted)" }} />
          : <ChevronDown size={13} style={{ color: "var(--text-muted)" }} />
        }
      </button>

      {/* Suggestions list */}
      {expanded && (
        <div style={{ padding: "10px 12px", background: `${prof.color}06`, display: "flex", flexDirection: "column", gap: 6 }}>
          {type === "skills" ? (
            // Skills: compact wrap chips
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {suggestions.map((s) => {
                const isAdded = added?.has(s);
                return (
                  <button
                    key={s}
                    onClick={() => !isAdded && onSelect(s)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      padding: "4px 10px", borderRadius: 20,
                      border: `1.5px solid ${isAdded ? prof.color : `${prof.color}40`}`,
                      background: isAdded ? `${prof.color}18` : "transparent",
                      color: isAdded ? prof.color : "var(--text-secondary)",
                      fontSize: 11.5, fontWeight: 500,
                      cursor: isAdded ? "default" : "pointer",
                      transition: "all 150ms ease",
                    }}
                  >
                    {isAdded
                      ? <Check size={10} strokeWidth={3} />
                      : <Plus size={10} strokeWidth={2.5} />
                    }
                    {s}
                  </button>
                );
              })}
            </div>
          ) : (
            // Summary / Bullets: full-width clickable rows
            suggestions.map((s) => {
              const isAdded = added?.has(s);
              return (
                <button
                  key={s}
                  onClick={() => !isAdded && onSelect(s)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    padding: "9px 12px",
                    borderRadius: 10,
                    border: `1.5px solid ${isAdded ? prof.color : `${prof.color}25`}`,
                    background: isAdded ? `${prof.color}12` : "rgba(255,255,255,0.02)",
                    cursor: isAdded ? "default" : "pointer",
                    textAlign: "left",
                    transition: "all 150ms ease",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    if (!isAdded) (e.currentTarget as HTMLElement).style.background = `${prof.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    if (!isAdded) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                    background: isAdded ? prof.color : `${prof.color}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 150ms ease",
                  }}>
                    {isAdded
                      ? <Check size={11} color="white" strokeWidth={3} />
                      : <Plus size={11} style={{ color: prof.color }} strokeWidth={2.5} />
                    }
                  </div>
                  {/* Text */}
                  <span style={{
                    fontSize: 12.5, lineHeight: 1.55,
                    color: isAdded ? "var(--text-muted)" : "var(--text-secondary)",
                    textDecoration: isAdded ? "line-through" : "none",
                    transition: "all 150ms ease",
                  }}>
                    {s}
                  </span>
                </button>
              );
            })
          )}
          <p style={{ fontSize: 10.5, color: "var(--text-muted)", marginTop: 4, lineHeight: 1.5 }}>
            ✦ Click any suggestion to {type === "summary" ? "use it as your summary" : type === "experience" ? "add it as a bullet point" : "add it to your skills"}. You can edit it after.
          </p>
        </div>
      )}
    </div>
  );
}
