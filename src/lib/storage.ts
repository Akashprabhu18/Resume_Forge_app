import type { ResumeData } from "@/types/resume";

const STORAGE_KEY = "resume-builder-v1";

export function saveResume(data: ResumeData): void {
  try {
    const existing = loadAllResumes();
    existing[data.meta.id] = { ...data, meta: { ...data.meta, updatedAt: new Date().toISOString() } };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error("Failed to save resume", e);
  }
}

export function loadAllResumes(): Record<string, ResumeData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function loadResume(id: string): ResumeData | null {
  const all = loadAllResumes();
  return all[id] ?? null;
}

export function deleteResume(id: string): void {
  const all = loadAllResumes();
  delete all[id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function exportJSON(data: ResumeData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `resume-${data.personal.name || "export"}-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(file: File): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as ResumeData;
        // Basic validation
        if (!data.meta || !data.personal || !data.sections) {
          throw new Error("Invalid resume file format");
        }
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
