import type { ResumeTheme, ThemeId, FontPair, TemplateId } from "@/types/resume";

// ─── Theme Presets ────────────────────────────────────────────
export const THEMES: Record<ThemeId, ResumeTheme> = {
  midnight: {
    id: "midnight",
    primary: "#6366f1",
    secondary: "#4f46e5",
    accent: "#a5b4fc",
    text: "#1e1b4b",
    muted: "#6b7280",
    bg: "#f8faff",
  },
  ocean: {
    id: "ocean",
    primary: "#0ea5e9",
    secondary: "#0284c7",
    accent: "#7dd3fc",
    text: "#0c4a6e",
    muted: "#64748b",
    bg: "#f0f9ff",
  },
  forest: {
    id: "forest",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#6ee7b7",
    text: "#064e3b",
    muted: "#6b7280",
    bg: "#f0fdf4",
  },
  rose: {
    id: "rose",
    primary: "#f43f5e",
    secondary: "#e11d48",
    accent: "#fda4af",
    text: "#881337",
    muted: "#9ca3af",
    bg: "#fff1f2",
  },
  amber: {
    id: "amber",
    primary: "#f59e0b",
    secondary: "#d97706",
    accent: "#fcd34d",
    text: "#78350f",
    muted: "#9ca3af",
    bg: "#fffbeb",
  },
  slate: {
    id: "slate",
    primary: "#64748b",
    secondary: "#475569",
    accent: "#94a3b8",
    text: "#0f172a",
    muted: "#94a3b8",
    bg: "#f8fafc",
  },
  purple: {
    id: "purple",
    primary: "#a855f7",
    secondary: "#9333ea",
    accent: "#d8b4fe",
    text: "#3b0764",
    muted: "#9ca3af",
    bg: "#faf5ff",
  },
  mono: {
    id: "mono",
    primary: "#111827",
    secondary: "#374151",
    accent: "#6b7280",
    text: "#111827",
    muted: "#9ca3af",
    bg: "#ffffff",
  },
};

export const THEME_LABELS: Record<ThemeId, string> = {
  midnight: "Midnight Indigo",
  ocean: "Ocean Blue",
  forest: "Forest Green",
  rose: "Rose Red",
  amber: "Amber Gold",
  slate: "Slate Gray",
  purple: "Deep Purple",
  mono: "Monochrome",
};

// ─── Font Pairs ───────────────────────────────────────────────
export const FONT_PAIRS: Record<FontPair, { heading: string; body: string; label: string }> = {
  inter: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif", label: "Inter" },
  poppins: { heading: "'Poppins', sans-serif", body: "'Poppins', sans-serif", label: "Poppins" },
  roboto: { heading: "'Roboto Slab', serif", body: "'Roboto', sans-serif", label: "Roboto" },
  raleway: { heading: "'Raleway', sans-serif", body: "'Raleway', sans-serif", label: "Raleway" },
  lato: { heading: "'Playfair Display', serif", body: "'Lato', sans-serif", label: "Playfair + Lato" },
};

// ─── Template Configs ─────────────────────────────────────────
export interface TemplateConfig {
  id: TemplateId;
  label: string;
  description: string;
  defaultColumns: 1 | 2;
  accentHeader: boolean;
  sidebarSections: string[]; // sections rendered in sidebar (2-col)
}

export const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  minimal:      { id: "minimal",      label: "Minimal",      description: "Clean, white-space heavy, single-column",   defaultColumns: 1, accentHeader: false, sidebarSections: [] },
  modern:       { id: "modern",       label: "Modern",       description: "Two-column with colored header block",        defaultColumns: 2, accentHeader: true,  sidebarSections: ["skills", "certifications"] },
  creative:     { id: "creative",     label: "Creative",     description: "Bold accent sidebar with icon rows",          defaultColumns: 2, accentHeader: true,  sidebarSections: ["skills", "certifications", "education"] },
  executive:    { id: "executive",    label: "Executive",    description: "Double-line headings, navy accent",           defaultColumns: 1, accentHeader: false, sidebarSections: [] },
  elegant:      { id: "elegant",      label: "Elegant",      description: "Centered serif header, caps sections",        defaultColumns: 1, accentHeader: false, sidebarSections: [] },
  bold:         { id: "bold",         label: "Bold",         description: "Gradient hero header, border-left labels",    defaultColumns: 1, accentHeader: true,  sidebarSections: [] },
  tech:         { id: "tech",         label: "Tech",         description: "Dark GitHub-style header, badge labels",      defaultColumns: 1, accentHeader: true,  sidebarSections: [] },
  compact:      { id: "compact",      label: "Compact",      description: "Dense 2-column, maximum content density",     defaultColumns: 2, accentHeader: true,  sidebarSections: ["skills", "certifications", "education"] },
  academic:     { id: "academic",     label: "Academic",     description: "Traditional CV, centered header, serif",      defaultColumns: 1, accentHeader: false, sidebarSections: [] },
  infographic:  { id: "infographic",  label: "Infographic",  description: "Skill bars + avatar sidebar",                 defaultColumns: 2, accentHeader: true,  sidebarSections: ["skills", "certifications"] },
  professional: { id: "professional", label: "Professional", description: "ATS-safe pure black & white",                 defaultColumns: 1, accentHeader: false, sidebarSections: [] },
  startup:      { id: "startup",      label: "Startup",      description: "Gradient hero, white card sections",          defaultColumns: 1, accentHeader: true,  sidebarSections: [] },
  graduate:     { id: "graduate",     label: "Graduate",     description: "Education-first, clean minimal",              defaultColumns: 1, accentHeader: false, sidebarSections: [] },
  designer:     { id: "designer",     label: "Designer",     description: "Portfolio-style, large stacked name",         defaultColumns: 2, accentHeader: false, sidebarSections: ["skills", "education", "certifications"] },
  timeline:     { id: "timeline",     label: "Timeline",     description: "Visual timeline for experience & education",  defaultColumns: 1, accentHeader: false, sidebarSections: [] },
};
