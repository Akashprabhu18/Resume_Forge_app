"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ResumeData,
  ResumeMeta,
  PersonalInfo,
  ResumeSection,
  TemplateId,
  ThemeId,
  FontPair,
  ResumeMode,
  generateId,
  createDefaultResume,
  CustomSection,
  ExperienceItem,
  EducationItem,
  SkillGroup,
  ProjectItem,
  CertificationItem,
} from "@/types/resume";
import type { ProfessionConfig } from "@/config/professions";

const MAX_HISTORY = 50;

interface HistoryState {
  past: ResumeData[];
  future: ResumeData[];
}

export interface UIState {
  activeStep: number; // simple mode step 0–4
  mode: ResumeMode;
  previewOpen: boolean;
  themePanelOpen: boolean;
  colorMode: "dark" | "light";
}

interface ResumeStore {
  // ─── Data ────────────────────────────────────────────────────
  resume: ResumeData;
  history: HistoryState;
  ui: UIState;

  // ─── History helpers ─────────────────────────────────────────
  _snapshot: () => void;
  undo: () => void;
  redo: () => void;

  // ─── Meta ────────────────────────────────────────────────────
  setTemplate: (t: TemplateId) => void;
  setTheme: (t: ThemeId) => void;
  setFont: (f: FontPair) => void;
  setMode: (m: ResumeMode) => void;
  setLayoutColumns: (c: 1 | 2) => void;

  // ─── Personal ────────────────────────────────────────────────
  updatePersonal: (data: Partial<PersonalInfo>) => void;

  // ─── Section management ───────────────────────────────────────
  updateSection: (sectionId: string, data: Partial<ResumeSection>) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  reorderSections: (newOrder: string[]) => void;
  addCustomSection: () => void;
  removeSection: (sectionId: string) => void;
  duplicateSection: (sectionId: string) => void;
  updateSectionTitle: (sectionId: string, title: string) => void;
  applyProfession: (profession: ProfessionConfig) => void;

  // ─── Experience ───────────────────────────────────────────────
  addExperience: () => void;
  updateExperience: (itemId: string, data: Partial<ExperienceItem>) => void;
  removeExperience: (itemId: string) => void;

  // ─── Education ───────────────────────────────────────────────
  addEducation: () => void;
  updateEducation: (itemId: string, data: Partial<EducationItem>) => void;
  removeEducation: (itemId: string) => void;

  // ─── Skills ───────────────────────────────────────────────────
  addSkillGroup: () => void;
  updateSkillGroup: (groupId: string, data: Partial<SkillGroup>) => void;
  removeSkillGroup: (groupId: string) => void;
  addSkill: (groupId: string) => void;
  removeSkill: (groupId: string, skillId: string) => void;

  // ─── Projects ────────────────────────────────────────────────
  addProject: () => void;
  updateProject: (itemId: string, data: Partial<ProjectItem>) => void;
  removeProject: (itemId: string) => void;

  // ─── Certifications ──────────────────────────────────────────
  addCertification: () => void;
  updateCertification: (itemId: string, data: Partial<CertificationItem>) => void;
  removeCertification: (itemId: string) => void;

  // ─── Summary ─────────────────────────────────────────────────
  updateSummary: (content: string) => void;

  // ─── Persistence ─────────────────────────────────────────────
  resetResume: () => void;
  importResume: (data: ResumeData) => void;

  // ─── UI ──────────────────────────────────────────────────────
  setActiveStep: (step: number) => void;
  setPreviewOpen: (open: boolean) => void;
  setThemePanelOpen: (open: boolean) => void;
  setColorMode: (mode: "dark" | "light") => void;
  toggleColorMode: () => void;
}

function updateMeta(meta: ResumeMeta): ResumeMeta {
  return { ...meta, updatedAt: new Date().toISOString() };
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: createDefaultResume(),
      history: { past: [], future: [] },
      ui: {
        activeStep: 0,
        mode: "simple",
        previewOpen: false,
        themePanelOpen: false,
        colorMode: "dark",
      },

      // ─── Snapshot for undo ──────────────────────────────────
      _snapshot() {
        const { resume, history } = get();
        const past = [...history.past, resume].slice(-MAX_HISTORY);
        set({ history: { past, future: [] } });
      },

      undo() {
        const { history, resume } = get();
        if (!history.past.length) return;
        const past = [...history.past];
        const previous = past.pop()!;
        set({
          resume: previous,
          history: { past, future: [resume, ...history.future] },
        });
      },

      redo() {
        const { history, resume } = get();
        if (!history.future.length) return;
        const future = [...history.future];
        const next = future.shift()!;
        set({
          resume: next,
          history: { past: [...history.past, resume], future },
        });
      },

      // ─── Meta ───────────────────────────────────────────────
      setTemplate(t) {
        get()._snapshot();
        set((s) => ({ resume: { ...s.resume, meta: updateMeta({ ...s.resume.meta, template: t }) } }));
      },
      setTheme(t) {
        set((s) => ({ resume: { ...s.resume, meta: updateMeta({ ...s.resume.meta, themeId: t }) } }));
      },
      setFont(f) {
        set((s) => ({ resume: { ...s.resume, meta: updateMeta({ ...s.resume.meta, fontPair: f }) } }));
      },
      setMode(m) {
        set((s) => ({
          resume: { ...s.resume, meta: updateMeta({ ...s.resume.meta, mode: m }) },
          ui: { ...s.ui, mode: m },
        }));
      },
      setLayoutColumns(c) {
        set((s) => ({ resume: { ...s.resume, meta: updateMeta({ ...s.resume.meta, layoutColumns: c }) } }));
      },

      // ─── Personal ───────────────────────────────────────────
      updatePersonal(data) {
        set((s) => ({
          resume: {
            ...s.resume,
            meta: updateMeta(s.resume.meta),
            personal: { ...s.resume.personal, ...data },
          },
        }));
      },

      // ─── Sections ───────────────────────────────────────────
      updateSection(sectionId, data) {
        set((s) => ({
          resume: {
            ...s.resume,
            meta: updateMeta(s.resume.meta),
            sections: {
              ...s.resume.sections,
              [sectionId]: { ...s.resume.sections[sectionId], ...data } as ResumeSection,
            },
          },
        }));
      },
      toggleSectionVisibility(sectionId) {
        const sec = get().resume.sections[sectionId];
        if (!sec) return;
        get()._snapshot();
        get().updateSection(sectionId, { visible: !sec.visible });
      },
      reorderSections(newOrder) {
        get()._snapshot();
        set((s) => ({
          resume: { ...s.resume, meta: updateMeta(s.resume.meta), sectionOrder: newOrder },
        }));
      },
      addCustomSection() {
        get()._snapshot();
        const id = generateId();
        const newSection: CustomSection = {
          id,
          type: "custom",
          title: "Custom Section",
          visible: true,
          blocks: [],
        };
        set((s) => ({
          resume: {
            ...s.resume,
            meta: updateMeta(s.resume.meta),
            sectionOrder: [...s.resume.sectionOrder, id],
            sections: { ...s.resume.sections, [id]: newSection },
          },
        }));
      },
      removeSection(sectionId) {
        get()._snapshot();
        set((s) => {
          const { [sectionId]: _, ...rest } = s.resume.sections;
          return {
            resume: {
              ...s.resume,
              meta: updateMeta(s.resume.meta),
              sectionOrder: s.resume.sectionOrder.filter((id) => id !== sectionId),
              sections: rest,
            },
          };
        });
      },
      duplicateSection(sectionId) {
        get()._snapshot();
        const sec = get().resume.sections[sectionId];
        if (!sec) return;
        const newId = generateId();
        // Deep clone via JSON — handles all section types
        const cloned = JSON.parse(JSON.stringify(sec)) as ResumeSection;
        // Assign new id and title suffix
        (cloned as { id: string; title: string }).id = newId;
        (cloned as { title: string }).title = sec.title + " (Copy)";
        // If the section has items/groups/blocks with ids, re-id them to avoid conflicts
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const restamp = (arr: any[]) => arr?.map((item: any) => ({ ...item, id: generateId() }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = cloned as any;
        if (c.items)  c.items  = restamp(c.items);
        if (c.groups) c.groups = restamp(c.groups);
        if (c.blocks) c.blocks = restamp(c.blocks);
        set((s) => {
          const idx = s.resume.sectionOrder.indexOf(sectionId);
          const newOrder = [...s.resume.sectionOrder];
          newOrder.splice(idx + 1, 0, newId);
          return {
            resume: {
              ...s.resume,
              meta: updateMeta(s.resume.meta),
              sectionOrder: newOrder,
              sections: { ...s.resume.sections, [newId]: cloned },
            },
          };
        });
      },
      updateSectionTitle(sectionId, title) {
        get().updateSection(sectionId, { title } as Partial<ResumeSection>);
      },

      applyProfession(profession) {
        get()._snapshot();
        set((s) => {
          // Build new section visibility and order based on profession config
          const newSections = { ...s.resume.sections };
          // Apply visibility
          profession.sectionOrder.forEach(({ sectionId, visible, title }) => {
            if (newSections[sectionId]) {
              newSections[sectionId] = {
                ...newSections[sectionId],
                visible,
                ...(title ? { title } : {}),
              } as ResumeSection;
            }
          });
          // Apply new section order (keep only existing sections)
          const profOrder = profession.sectionOrder
            .sort((a, b) => a.order - b.order)
            .map((p) => p.sectionId)
            .filter((id) => s.resume.sectionOrder.includes(id));
          const rest = s.resume.sectionOrder.filter((id) => !profOrder.includes(id));
          const newOrder = [...profOrder, ...rest];

          return {
            resume: {
              ...s.resume,
              meta: updateMeta({
                ...s.resume.meta,
                template: profession.suggestedTemplate,
                themeId: profession.suggestedTheme,
                profession: profession.id,
              }),
              sectionOrder: newOrder,
              sections: newSections,
            },
          };
        });
      },

      // ─── Experience ──────────────────────────────────────────
      addExperience() {
        get()._snapshot();
        const item: ExperienceItem = {
          id: generateId(),
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          current: false,
          location: "",
          description: "",
        };
        set((s) => {
          const sec = s.resume.sections.experience as import("@/types/resume").ExperienceSection;
          return {
            resume: {
              ...s.resume,
              sections: { ...s.resume.sections, experience: { ...sec, items: [...sec.items, item] } },
            },
          };
        });
      },
      updateExperience(itemId, data) {
        set((s) => {
          const sec = s.resume.sections.experience as import("@/types/resume").ExperienceSection;
          return {
            resume: {
              ...s.resume,
              meta: updateMeta(s.resume.meta),
              sections: {
                ...s.resume.sections,
                experience: {
                  ...sec,
                  items: sec.items.map((i) => (i.id === itemId ? { ...i, ...data } : i)),
                },
              },
            },
          };
        });
      },
      removeExperience(itemId) {
        get()._snapshot();
        set((s) => {
          const sec = s.resume.sections.experience as import("@/types/resume").ExperienceSection;
          return {
            resume: {
              ...s.resume,
              sections: { ...s.resume.sections, experience: { ...sec, items: sec.items.filter((i) => i.id !== itemId) } },
            },
          };
        });
      },

      // ─── Education ───────────────────────────────────────────
      addEducation() {
        get()._snapshot();
        const item: EducationItem = { id: generateId(), institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "", description: "" };
        set((s) => {
          const sec = s.resume.sections.education as import("@/types/resume").EducationSection;
          return { resume: { ...s.resume, sections: { ...s.resume.sections, education: { ...sec, items: [...sec.items, item] } } } };
        });
      },
      updateEducation(itemId, data) {
        set((s) => {
          const sec = s.resume.sections.education as import("@/types/resume").EducationSection;
          return { resume: { ...s.resume, meta: updateMeta(s.resume.meta), sections: { ...s.resume.sections, education: { ...sec, items: sec.items.map((i) => (i.id === itemId ? { ...i, ...data } : i)) } } } };
        });
      },
      removeEducation(itemId) {
        get()._snapshot();
        set((s) => {
          const sec = s.resume.sections.education as import("@/types/resume").EducationSection;
          return { resume: { ...s.resume, sections: { ...s.resume.sections, education: { ...sec, items: sec.items.filter((i) => i.id !== itemId) } } } };
        });
      },

      // ─── Skills ──────────────────────────────────────────────
      addSkillGroup() {
        get()._snapshot();
        const group: SkillGroup = { id: generateId(), category: "New Category", skills: [] };
        set((s) => {
          const sec = s.resume.sections.skills as import("@/types/resume").SkillsSection;
          return { resume: { ...s.resume, sections: { ...s.resume.sections, skills: { ...sec, groups: [...sec.groups, group] } } } };
        });
      },
      updateSkillGroup(groupId, data) {
        set((s) => {
          const sec = s.resume.sections.skills as import("@/types/resume").SkillsSection;
          return { resume: { ...s.resume, meta: updateMeta(s.resume.meta), sections: { ...s.resume.sections, skills: { ...sec, groups: sec.groups.map((g) => (g.id === groupId ? { ...g, ...data } : g)) } } } };
        });
      },
      removeSkillGroup(groupId) {
        get()._snapshot();
        set((s) => {
          const sec = s.resume.sections.skills as import("@/types/resume").SkillsSection;
          return { resume: { ...s.resume, sections: { ...s.resume.sections, skills: { ...sec, groups: sec.groups.filter((g) => g.id !== groupId) } } } };
        });
      },
      addSkill(groupId) {
        const skillItem = { id: generateId(), name: "", level: 3 };
        set((s) => {
          const sec = s.resume.sections.skills as import("@/types/resume").SkillsSection;
          return { resume: { ...s.resume, sections: { ...s.resume.sections, skills: { ...sec, groups: sec.groups.map((g) => g.id === groupId ? { ...g, skills: [...g.skills, skillItem] } : g) } } } };
        });
      },
      removeSkill(groupId, skillId) {
        set((s) => {
          const sec = s.resume.sections.skills as import("@/types/resume").SkillsSection;
          return { resume: { ...s.resume, sections: { ...s.resume.sections, skills: { ...sec, groups: sec.groups.map((g) => g.id === groupId ? { ...g, skills: g.skills.filter((sk) => sk.id !== skillId) } : g) } } } };
        });
      },

      // ─── Projects ────────────────────────────────────────────
      addProject() {
        get()._snapshot();
        const item: ProjectItem = { id: generateId(), name: "", url: "", description: "", tags: [] };
        set((s) => {
          const sec = s.resume.sections.projects as import("@/types/resume").ProjectsSection;
          return { resume: { ...s.resume, sections: { ...s.resume.sections, projects: { ...sec, items: [...sec.items, item] } } } };
        });
      },
      updateProject(itemId, data) {
        set((s) => {
          const sec = s.resume.sections.projects as import("@/types/resume").ProjectsSection;
          return { resume: { ...s.resume, meta: updateMeta(s.resume.meta), sections: { ...s.resume.sections, projects: { ...sec, items: sec.items.map((i) => (i.id === itemId ? { ...i, ...data } : i)) } } } };
        });
      },
      removeProject(itemId) {
        get()._snapshot();
        set((s) => {
          const sec = s.resume.sections.projects as import("@/types/resume").ProjectsSection;
          return { resume: { ...s.resume, sections: { ...s.resume.sections, projects: { ...sec, items: sec.items.filter((i) => i.id !== itemId) } } } };
        });
      },

      // ─── Certifications ──────────────────────────────────────
      addCertification() {
        get()._snapshot();
        const item: CertificationItem = { id: generateId(), name: "", issuer: "", date: "", url: "" };
        set((s) => {
          const sec = s.resume.sections.certifications as import("@/types/resume").CertificationsSection;
          return { resume: { ...s.resume, sections: { ...s.resume.sections, certifications: { ...sec, items: [...sec.items, item] } } } };
        });
      },
      updateCertification(itemId, data) {
        set((s) => {
          const sec = s.resume.sections.certifications as import("@/types/resume").CertificationsSection;
          return { resume: { ...s.resume, meta: updateMeta(s.resume.meta), sections: { ...s.resume.sections, certifications: { ...sec, items: sec.items.map((i) => (i.id === itemId ? { ...i, ...data } : i)) } } } };
        });
      },
      removeCertification(itemId) {
        get()._snapshot();
        set((s) => {
          const sec = s.resume.sections.certifications as import("@/types/resume").CertificationsSection;
          return { resume: { ...s.resume, sections: { ...s.resume.sections, certifications: { ...sec, items: sec.items.filter((i) => i.id !== itemId) } } } };
        });
      },

      // ─── Summary ─────────────────────────────────────────────
      updateSummary(content) {
        set((s) => {
          const sec = s.resume.sections.summary as import("@/types/resume").SummarySection;
          return { resume: { ...s.resume, sections: { ...s.resume.sections, summary: { ...sec, content } } } };
        });
      },

      // ─── Persistence ─────────────────────────────────────────
      resetResume() {
        get()._snapshot();
        set({ resume: createDefaultResume() });
      },
      importResume(data) {
        get()._snapshot();
        set({ resume: data });
      },

      // ─── UI ──────────────────────────────────────────────────
      setActiveStep: (step) => set((s) => ({ ui: { ...s.ui, activeStep: step } })),
      setPreviewOpen: (open) => set((s) => ({ ui: { ...s.ui, previewOpen: open } })),
      setThemePanelOpen: (open) => set((s) => ({ ui: { ...s.ui, themePanelOpen: open } })),
      setColorMode: (mode) => set((s) => ({ ui: { ...s.ui, colorMode: mode } })),
      toggleColorMode: () =>
        set((s) => ({
          ui: { ...s.ui, colorMode: s.ui.colorMode === "dark" ? "light" : "dark" },
        })),
    }),
    {
      name: "resume-builder-v1",
      partialize: (s) => ({ resume: s.resume, ui: { colorMode: s.ui.colorMode } }),
    }
  )
);
