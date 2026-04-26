"use client";
import { useResumeStore } from "@/store/useResumeStore";
import { GlassInput } from "@/components/ui/GlassInput";
import { SkillsSection } from "@/types/resume";
import { Plus, Trash2, X, Zap } from "lucide-react";
import ProfessionSuggestions from "./ProfessionSuggestions";
import { useState } from "react";

const FALLBACK_SKILLS = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Python", "SQL", "Git", "Docker", "Figma",
  "Communication", "Leadership", "Problem Solving", "Agile",
];

export default function SkillsStep() {
  const { resume, addSkillGroup, updateSkillGroup, removeSkillGroup, addSkill, removeSkill } = useResumeStore();
  const section = resume.sections.skills as SkillsSection;
  const professionId = resume.meta.profession;
  const [addedSkills, setAddedSkills] = useState<Set<string>>(new Set());

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {section.groups.map((group) => (
        <div key={group.id} className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="flex-between">
            <GlassInput
              placeholder="Category (e.g. Programming Languages)"
              value={group.category}
              onChange={(e) => updateSkillGroup(group.id, { category: e.target.value })}
              style={{ flex: 1 }}
            />
            <button className="btn btn-danger btn-sm btn-icon" style={{ marginLeft: 10, flexShrink: 0 }} onClick={() => removeSkillGroup(group.id)}>
              <Trash2 size={14} />
            </button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {group.skills.map((skill) => (
              <div key={skill.id} style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 20, padding: "4px 10px" }}>
                <input
                  style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 12, width: Math.max(60, skill.name.length * 8) }}
                  value={skill.name}
                  placeholder="Skill"
                  onChange={(e) => {
                    const { groups } = section;
                    const g = groups.find((g) => g.id === group.id);
                    if (!g) return;
                    updateSkillGroup(group.id, {
                      skills: g.skills.map((s) => s.id === skill.id ? { ...s, name: e.target.value } : s),
                    });
                  }}
                />
                {/* Level dots */}
                <div className="skill-dots">
                  {[1,2,3,4,5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`skill-dot${skill.level >= n ? " filled" : ""}`}
                      onClick={() => {
                        const g = section.groups.find((g) => g.id === group.id);
                        if (!g) return;
                        updateSkillGroup(group.id, {
                          skills: g.skills.map((s) => s.id === skill.id ? { ...s, level: n } : s),
                        });
                      }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => removeSkill(group.id, skill.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", padding: 0 }}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <button className="badge" style={{ cursor: "pointer" }} onClick={() => addSkill(group.id)}>
              <Plus size={11} /> Add Skill
            </button>
          </div>
        </div>
      ))}

      <button className="btn btn-ghost" onClick={addSkillGroup} style={{ alignSelf: "flex-start" }}>
        <Plus size={16} />
        Add Skill Category
      </button>

      {/* Profession-aware quick-add OR fallback */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Zap size={14} style={{ color: "var(--accent)" }} />
          <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>
            {professionId ? "Profession-suggested skills" : "Quick-add common skills"}
          </span>
        </div>

        {professionId ? (
          <ProfessionSuggestions
            professionId={professionId}
            type="skills"
            added={addedSkills}
            onSelect={(sk) => {
              if (section.groups.length === 0) addSkillGroup();
              const g = useResumeStore.getState().resume.sections.skills as SkillsSection;
              const grp = g.groups[0];
              if (!grp) return;
              if (grp.skills.some((s) => s.name === sk)) return;
              addSkill(grp.id);
              setTimeout(() => {
                const updated = useResumeStore.getState().resume.sections.skills as SkillsSection;
                const updatedG = updated.groups.find((x) => x.id === grp.id);
                if (!updatedG) return;
                const last = updatedG.skills[updatedG.skills.length - 1];
                if (!last) return;
                useResumeStore.getState().updateSkillGroup(grp.id, {
                  skills: updatedG.skills.map((s) => s.id === last.id ? { ...s, name: sk } : s),
                });
                setAddedSkills((prev) => new Set(prev).add(sk));
              }, 0);
            }}
          />
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {FALLBACK_SKILLS.map((sk) => (
              <button
                key={sk}
                className="badge"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (section.groups.length === 0) addSkillGroup();
                  const g = section.groups[0];
                  if (!g) return;
                  if (g.skills.some((s) => s.name === sk)) return;
                  addSkill(g.id);
                  setTimeout(() => {
                    const updated = useResumeStore.getState().resume.sections.skills as SkillsSection;
                    const updatedG = updated.groups.find((x) => x.id === g.id);
                    if (!updatedG) return;
                    const lastSkill = updatedG.skills[updatedG.skills.length - 1];
                    if (!lastSkill) return;
                    useResumeStore.getState().updateSkillGroup(g.id, {
                      skills: updatedG.skills.map((s) => s.id === lastSkill.id ? { ...s, name: sk } : s),
                    });
                  }, 0);
                }}
              >
                + {sk}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
