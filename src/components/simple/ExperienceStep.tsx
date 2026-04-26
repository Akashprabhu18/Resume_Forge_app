"use client";
import { useResumeStore } from "@/store/useResumeStore";
import { GlassInput } from "@/components/ui/GlassInput";
import RichEditor from "@/components/ui/RichEditor";
import { ExperienceSection } from "@/types/resume";
import { Plus, Trash2, Briefcase } from "lucide-react";

export default function ExperienceStep() {
  const { resume, addExperience, updateExperience, removeExperience } = useResumeStore();
  const section = resume.sections.experience as ExperienceSection;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {section.items.length === 0 && (
        <div style={{ textAlign: "center", padding: "32px", color: "var(--text-muted)", fontSize: 14 }}>
          <Briefcase size={32} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
          <p>No work experience added yet.</p>
        </div>
      )}

      {section.items.map((item, idx) => (
        <div
          key={item.id}
          className="glass-card"
          style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div className="flex-between">
            <span style={{ fontWeight: 600, fontSize: 13, color: "var(--text-secondary)" }}>
              Experience #{idx + 1}
            </span>
            <button className="btn btn-danger btn-sm btn-icon" onClick={() => removeExperience(item.id)} title="Remove">
              <Trash2 size={14} />
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <GlassInput label="Job Title" placeholder="Software Engineer" value={item.role} onChange={(e) => updateExperience(item.id, { role: e.target.value })} />
            <GlassInput label="Company" placeholder="Acme Corp" value={item.company} onChange={(e) => updateExperience(item.id, { company: e.target.value })} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, alignItems: "flex-end" }}>
            <GlassInput label="Start Date" placeholder="Jan 2020" value={item.startDate} onChange={(e) => updateExperience(item.id, { startDate: e.target.value })} />
            <GlassInput label="End Date" placeholder="Dec 2022" value={item.endDate} disabled={item.current} onChange={(e) => updateExperience(item.id, { endDate: e.target.value })} />
            <GlassInput label="Location" placeholder="New York, NY" value={item.location} onChange={(e) => updateExperience(item.id, { location: e.target.value })} />
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-secondary)", cursor: "pointer", whiteSpace: "nowrap", paddingBottom: 10 }}>
              <input type="checkbox" checked={item.current} onChange={(e) => updateExperience(item.id, { current: e.target.checked, endDate: "" })} />
              Current
            </label>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
              Description
            </label>
            <RichEditor
              content={item.description}
              onChange={(html) => updateExperience(item.id, { description: html })}
              placeholder="Describe your responsibilities, achievements, and impact..."
              minHeight={100}
            />
          </div>
        </div>
      ))}

      <button className="btn btn-ghost" onClick={addExperience} style={{ alignSelf: "flex-start" }}>
        <Plus size={16} />
        Add Experience
      </button>
    </div>
  );
}
