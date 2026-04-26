"use client";
import { useResumeStore } from "@/store/useResumeStore";
import { GlassInput } from "@/components/ui/GlassInput";
import { EducationSection } from "@/types/resume";
import { Plus, Trash2, GraduationCap } from "lucide-react";

export default function EducationStep() {
  const { resume, addEducation, updateEducation, removeEducation } = useResumeStore();
  const section = resume.sections.education as EducationSection;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {section.items.length === 0 && (
        <div style={{ textAlign: "center", padding: "32px", color: "var(--text-muted)", fontSize: 14 }}>
          <GraduationCap size={32} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
          <p>No education added yet.</p>
        </div>
      )}

      {section.items.map((item, idx) => (
        <div key={item.id} className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="flex-between">
            <span style={{ fontWeight: 600, fontSize: 13, color: "var(--text-secondary)" }}>Education #{idx + 1}</span>
            <button className="btn btn-danger btn-sm btn-icon" onClick={() => removeEducation(item.id)}>
              <Trash2 size={14} />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <GlassInput label="Institution" placeholder="MIT" value={item.institution} onChange={(e) => updateEducation(item.id, { institution: e.target.value })} />
            <GlassInput label="Degree" placeholder="Bachelor of Science" value={item.degree} onChange={(e) => updateEducation(item.id, { degree: e.target.value })} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            <GlassInput label="Field of Study" placeholder="Computer Science" value={item.field} onChange={(e) => updateEducation(item.id, { field: e.target.value })} />
            <GlassInput label="Start Year" placeholder="2018" value={item.startDate} onChange={(e) => updateEducation(item.id, { startDate: e.target.value })} />
            <GlassInput label="End Year" placeholder="2022" value={item.endDate} onChange={(e) => updateEducation(item.id, { endDate: e.target.value })} />
            <GlassInput label="GPA (optional)" placeholder="3.8" value={item.gpa} onChange={(e) => updateEducation(item.id, { gpa: e.target.value })} />
          </div>
        </div>
      ))}

      <button className="btn btn-ghost" onClick={addEducation} style={{ alignSelf: "flex-start" }}>
        <Plus size={16} />
        Add Education
      </button>
    </div>
  );
}
