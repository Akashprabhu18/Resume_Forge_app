"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { GlassInput, GlassTextarea } from "@/components/ui/GlassInput";
import RichEditor from "@/components/ui/RichEditor";
import { Plus, Trash2, X } from "lucide-react";
import {
  SummarySection, ExperienceSection, EducationSection,
  SkillsSection, ProjectsSection, CertificationsSection, CustomSection,
  generateId,
} from "@/types/resume";

export default function SectionBuilder({ sectionId }: { sectionId: string }) {
  const store = useResumeStore();
  const section = store.resume.sections[sectionId];

  if (!section) return null;

  // ─── Summary ────────────────────────────────────────────────
  if (section.type === "summary") {
    const s = section as SummarySection;
    return (
      <RichEditor
        content={s.content}
        onChange={store.updateSummary}
        placeholder="Professional summary or career objective..."
      />
    );
  }

  // ─── Experience ─────────────────────────────────────────────
  if (section.type === "experience") {
    const s = section as ExperienceSection;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {s.items.map((item, idx) => (
          <div key={item.id} style={{ padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <div className="flex-between" style={{ marginBottom: 14 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>#{idx + 1}</span>
              <button className="btn btn-danger btn-icon btn-sm" onClick={() => store.removeExperience(item.id)}><Trash2 size={12} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <GlassInput label="Role" value={item.role} onChange={(e) => store.updateExperience(item.id, { role: e.target.value })} placeholder="Software Engineer" />
              <GlassInput label="Company" value={item.company} onChange={(e) => store.updateExperience(item.id, { company: e.target.value })} placeholder="Acme Corp" />
              <GlassInput label="Start" value={item.startDate} onChange={(e) => store.updateExperience(item.id, { startDate: e.target.value })} placeholder="Jan 2020" />
              <GlassInput label="End" value={item.endDate} onChange={(e) => store.updateExperience(item.id, { endDate: e.target.value })} placeholder="Dec 2022" disabled={item.current} />
              <GlassInput label="Location" value={item.location} onChange={(e) => store.updateExperience(item.id, { location: e.target.value })} placeholder="Remote" />
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)", cursor: "pointer", paddingBottom: 10 }}>
                <input type="checkbox" checked={item.current} onChange={(e) => store.updateExperience(item.id, { current: e.target.checked })} />
                Currently working here
              </label>
            </div>
            <RichEditor content={item.description} onChange={(html) => store.updateExperience(item.id, { description: html })} placeholder="Describe your role and impact..." minHeight={80} />
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" onClick={store.addExperience} style={{ alignSelf: "flex-start" }}><Plus size={14} /> Add Entry</button>
      </div>
    );
  }

  // ─── Education ──────────────────────────────────────────────
  if (section.type === "education") {
    const s = section as EducationSection;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {s.items.map((item) => (
          <div key={item.id} style={{ padding: "14px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <div className="flex-between" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>Education Entry</span>
              <button className="btn btn-danger btn-icon btn-sm" onClick={() => store.removeEducation(item.id)}><Trash2 size={12} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <GlassInput label="Institution" value={item.institution} onChange={(e) => store.updateEducation(item.id, { institution: e.target.value })} placeholder="MIT" />
              <GlassInput label="Degree" value={item.degree} onChange={(e) => store.updateEducation(item.id, { degree: e.target.value })} placeholder="B.S. Computer Science" />
              <GlassInput label="Field" value={item.field} onChange={(e) => store.updateEducation(item.id, { field: e.target.value })} placeholder="Computer Science" />
              <GlassInput label="GPA" value={item.gpa} onChange={(e) => store.updateEducation(item.id, { gpa: e.target.value })} placeholder="3.8" />
              <GlassInput label="Start Year" value={item.startDate} onChange={(e) => store.updateEducation(item.id, { startDate: e.target.value })} placeholder="2018" />
              <GlassInput label="End Year" value={item.endDate} onChange={(e) => store.updateEducation(item.id, { endDate: e.target.value })} placeholder="2022" />
            </div>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" onClick={store.addEducation} style={{ alignSelf: "flex-start" }}><Plus size={14} /> Add Entry</button>
      </div>
    );
  }

  // ─── Skills ─────────────────────────────────────────────────
  if (section.type === "skills") {
    const s = section as SkillsSection;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {s.groups.map((group) => (
          <div key={group.id} style={{ padding: "14px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-end" }}>
              <GlassInput label="Category" value={group.category} onChange={(e) => store.updateSkillGroup(group.id, { category: e.target.value })} placeholder="Programming Languages" />
              <button className="btn btn-danger btn-icon btn-sm" style={{ flexShrink: 0, marginBottom: 2 }} onClick={() => store.removeSkillGroup(group.id)}><Trash2 size={12} /></button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {group.skills.map((skill) => (
                <div key={skill.id} style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 20, padding: "3px 8px" }}>
                  <input
                    style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 12, width: Math.max(50, skill.name.length * 8) }}
                    value={skill.name}
                    placeholder="Skill"
                    onChange={(e) => {
                      store.updateSkillGroup(group.id, {
                        skills: group.skills.map((sk) => sk.id === skill.id ? { ...sk, name: e.target.value } : sk),
                      });
                    }}
                  />
                  <div className="skill-dots">
                    {[1,2,3,4,5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`skill-dot${skill.level >= n ? " filled" : ""}`}
                        onClick={() => store.updateSkillGroup(group.id, { skills: group.skills.map((sk) => sk.id === skill.id ? { ...sk, level: n } : sk) })}
                      />
                    ))}
                  </div>
                  <button type="button" onClick={() => store.removeSkill(group.id, skill.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}><X size={11} /></button>
                </div>
              ))}
              <button className="badge" style={{ cursor: "pointer" }} onClick={() => store.addSkill(group.id)}><Plus size={10} /> Add</button>
            </div>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" onClick={store.addSkillGroup} style={{ alignSelf: "flex-start" }}><Plus size={14} /> Add Category</button>
      </div>
    );
  }

  // ─── Projects ───────────────────────────────────────────────
  if (section.type === "projects") {
    const s = section as ProjectsSection;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {s.items.map((item) => (
          <div key={item.id} style={{ padding: "14px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <div className="flex-between" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>Project</span>
              <button className="btn btn-danger btn-icon btn-sm" onClick={() => store.removeProject(item.id)}><Trash2 size={12} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <GlassInput label="Project Name" value={item.name} onChange={(e) => store.updateProject(item.id, { name: e.target.value })} placeholder="My Awesome App" />
              <GlassInput label="URL" value={item.url} onChange={(e) => store.updateProject(item.id, { url: e.target.value })} placeholder="https://github.com/..." />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>Tags (comma-separated)</label>
              <input
                className="glass-input"
                value={item.tags.join(", ")}
                onChange={(e) => store.updateProject(item.id, { tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                placeholder="React, TypeScript, AWS"
              />
            </div>
            <RichEditor content={item.description} onChange={(html) => store.updateProject(item.id, { description: html })} placeholder="Describe the project and your contributions..." minHeight={80} />
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" onClick={store.addProject} style={{ alignSelf: "flex-start" }}><Plus size={14} /> Add Project</button>
      </div>
    );
  }

  // ─── Certifications ─────────────────────────────────────────
  if (section.type === "certifications") {
    const s = section as CertificationsSection;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {s.items.map((item) => (
          <div key={item.id} style={{ display: "flex", gap: 10, alignItems: "flex-end", padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <GlassInput label="Name" value={item.name} onChange={(e) => store.updateCertification(item.id, { name: e.target.value })} placeholder="AWS Certified Solutions Architect" />
            <GlassInput label="Issuer" value={item.issuer} onChange={(e) => store.updateCertification(item.id, { issuer: e.target.value })} placeholder="Amazon" />
            <GlassInput label="Date" value={item.date} onChange={(e) => store.updateCertification(item.id, { date: e.target.value })} placeholder="2023" />
            <GlassInput label="URL" value={item.url} onChange={(e) => store.updateCertification(item.id, { url: e.target.value })} placeholder="https://..." />
            <button className="btn btn-danger btn-icon btn-sm" style={{ flexShrink: 0, marginBottom: 2 }} onClick={() => store.removeCertification(item.id)}><Trash2 size={12} /></button>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" onClick={store.addCertification} style={{ alignSelf: "flex-start" }}><Plus size={14} /> Add Certification</button>
      </div>
    );
  }

  // ─── Custom ─────────────────────────────────────────────────
  if (section.type === "custom") {
    const s = section as CustomSection;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {s.blocks.map((block) => (
          <div key={block.id} style={{ position: "relative" }}>
            <RichEditor content={block.content} onChange={(html) => {
              store.updateSection(sectionId, {
                blocks: s.blocks.map((b) => b.id === block.id ? { ...b, content: html } : b),
              } as Partial<CustomSection>);
            }} placeholder="Add your custom content..." minHeight={80} />
            <button
              className="btn btn-danger btn-icon btn-sm"
              style={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => store.updateSection(sectionId, { blocks: s.blocks.filter((b) => b.id !== block.id) } as Partial<CustomSection>)}
            >
              <Trash2 size={11} />
            </button>
          </div>
        ))}
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => store.updateSection(sectionId, { blocks: [...s.blocks, { id: generateId(), type: "text", content: "" }] } as Partial<CustomSection>)}
          style={{ alignSelf: "flex-start" }}
        >
          <Plus size={14} /> Add Content Block
        </button>
      </div>
    );
  }

  return null;
}
