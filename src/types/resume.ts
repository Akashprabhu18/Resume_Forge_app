// ─────────────────────────────────────────────────────────────
//  Resume Data Schema — single source of truth
// ─────────────────────────────────────────────────────────────

export type ResumeMode = "simple" | "advanced";
export type TemplateId =
  | "minimal" | "modern" | "creative"
  | "executive" | "elegant" | "bold" | "tech"
  | "compact" | "academic" | "infographic"
  | "professional" | "startup" | "graduate"
  | "designer" | "timeline";
export type ThemeId =
  | "midnight"
  | "ocean"
  | "forest"
  | "rose"
  | "amber"
  | "slate"
  | "purple"
  | "mono";

export type FontPair = "inter" | "poppins" | "roboto" | "raleway" | "lato";

export interface ResumeTheme {
  id: ThemeId;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  muted: string;
  bg: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  avatar: string; // base64 or URL
}

export interface SummarySection {
  id: "summary";
  type: "summary";
  title: string;
  icon?: string;
  visible: boolean;
  content: string; // rich text HTML
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string; // rich text HTML
}

export interface ExperienceSection {
  id: "experience";
  type: "experience";
  title: string;
  icon?: string;
  visible: boolean;
  items: ExperienceItem[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface EducationSection {
  id: "education";
  type: "education";
  title: string;
  icon?: string;
  visible: boolean;
  items: EducationItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 0–5
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: SkillItem[];
}

export interface SkillsSection {
  id: "skills";
  type: "skills";
  title: string;
  icon?: string;
  visible: boolean;
  groups: SkillGroup[];
}

export interface ProjectItem {
  id: string;
  name: string;
  url: string;
  description: string; // rich text HTML
  tags: string[];
}

export interface ProjectsSection {
  id: "projects";
  type: "projects";
  title: string;
  icon?: string;
  visible: boolean;
  items: ProjectItem[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface CertificationsSection {
  id: "certifications";
  type: "certifications";
  title: string;
  icon?: string;
  visible: boolean;
  items: CertificationItem[];
}

export interface CustomContentBlock {
  id: string;
  type: "text" | "bullets";
  content: string; // rich text HTML
}

export interface CustomSection {
  id: string;
  type: "custom";
  title: string;
  icon?: string;
  visible: boolean;
  blocks: CustomContentBlock[];
}

export type ResumeSection =
  | SummarySection
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | ProjectsSection
  | CertificationsSection
  | CustomSection;

export interface ResumeMeta {
  id: string;
  createdAt: string;
  updatedAt: string;
  mode: ResumeMode;
  template: TemplateId;
  themeId: ThemeId;
  fontPair: FontPair;
  layoutColumns: 1 | 2;
  profession?: string; // profession id from professions.ts
}

export interface ResumeData {
  meta: ResumeMeta;
  personal: PersonalInfo;
  sectionOrder: string[]; // array of section ids in display order
  sections: Record<string, ResumeSection>;
}

// ─── Helpers ────────────────────────────────────────────────
export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const DEFAULT_SECTION_ORDER = [
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
];

export function createDefaultResume(): ResumeData {
  return {
    meta: {
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mode: "simple",
      template: "modern",
      themeId: "midnight",
      fontPair: "inter",
      layoutColumns: 1,
    },
    personal: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      avatar: "",
    },
    sectionOrder: DEFAULT_SECTION_ORDER,
    sections: {
      summary: {
        id: "summary",
        type: "summary",
        title: "Professional Summary",
        visible: true,
        content: "",
      },
      experience: {
        id: "experience",
        type: "experience",
        title: "Work Experience",
        visible: true,
        items: [],
      },
      education: {
        id: "education",
        type: "education",
        title: "Education",
        visible: true,
        items: [],
      },
      skills: {
        id: "skills",
        type: "skills",
        title: "Skills",
        visible: true,
        groups: [],
      },
      projects: {
        id: "projects",
        type: "projects",
        title: "Projects",
        visible: true,
        items: [],
      },
      certifications: {
        id: "certifications",
        type: "certifications",
        title: "Certifications",
        visible: true,
        items: [],
      },
    },
  };
}
