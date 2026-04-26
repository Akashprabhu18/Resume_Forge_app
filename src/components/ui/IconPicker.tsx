"use client";

import * as LucideIcons from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

// ─── Curated icon list relevant to resume sections ──────────
export const SECTION_ICONS: { name: string; label: string }[] = [
  // Work & Career
  { name: "Briefcase", label: "Briefcase" },
  { name: "Building2", label: "Company" },
  { name: "Building", label: "Building" },
  { name: "Laptop", label: "Laptop" },
  { name: "Monitor", label: "Monitor" },
  { name: "Rocket", label: "Rocket" },
  // Education
  { name: "GraduationCap", label: "Graduation" },
  { name: "BookOpen", label: "Book" },
  { name: "School", label: "School" },
  { name: "Library", label: "Library" },
  // Skills & Tech
  { name: "Code2", label: "Code" },
  { name: "Terminal", label: "Terminal" },
  { name: "Cpu", label: "CPU" },
  { name: "Database", label: "Database" },
  { name: "Globe", label: "Globe" },
  { name: "Layers", label: "Layers" },
  { name: "Zap", label: "Zap" },
  { name: "Settings2", label: "Settings" },
  { name: "Wrench", label: "Wrench" },
  { name: "Tool", label: "Tool" },
  // Projects
  { name: "FolderOpen", label: "Projects" },
  { name: "Github", label: "GitHub" },
  { name: "GitBranch", label: "Git Branch" },
  { name: "Package", label: "Package" },
  { name: "Boxes", label: "Boxes" },
  // Awards & Certs
  { name: "Award", label: "Award" },
  { name: "Trophy", label: "Trophy" },
  { name: "Star", label: "Star" },
  { name: "BadgeCheck", label: "Badge" },
  { name: "Medal", label: "Medal" },
  { name: "Certificate", label: "Certificate" },
  // Contact & Social
  { name: "Mail", label: "Email" },
  { name: "Phone", label: "Phone" },
  { name: "MapPin", label: "Location" },
  { name: "Linkedin", label: "LinkedIn" },
  { name: "Twitter", label: "Twitter" },
  { name: "Link", label: "Link" },
  // Personal
  { name: "User", label: "User" },
  { name: "Users", label: "Team" },
  { name: "Heart", label: "Heart" },
  { name: "Smile", label: "Smile" },
  { name: "MessageSquare", label: "Communication" },
  // Misc
  { name: "FileText", label: "Document" },
  { name: "List", label: "List" },
  { name: "BarChart2", label: "Analytics" },
  { name: "TrendingUp", label: "Growth" },
  { name: "Lightbulb", label: "Ideas" },
  { name: "Target", label: "Goals" },
  { name: "Languages", label: "Languages" },
  { name: "Accessibility", label: "Accessibility" },
  { name: "Handshake", label: "Volunteering" },
];

// Render any lucide icon by name
export function DynamicIcon({
  name,
  size = 16,
  style,
}: {
  name: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>>)[name];
  if (!Icon) return null;
  return <Icon size={size} style={style} />;
}

interface IconPickerProps {
  selected?: string;
  onSelect: (iconName: string | undefined) => void;
  onClose: () => void;
}

export function IconPicker({ selected, onSelect, onClose }: IconPickerProps) {
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const filtered = SECTION_ICONS.filter(
    (ic) =>
      !search ||
      ic.label.toLowerCase().includes(search.toLowerCase()) ||
      ic.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "calc(100% + 6px)",
        left: 0,
        zIndex: 200,
        width: 280,
        background: "var(--bg-card)",
        border: "1px solid var(--border-bright)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--glass-shadow-lg)",
        backdropFilter: "var(--glass-blur)",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search */}
      <div style={{ position: "relative" }}>
        <Search
          size={13}
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)",
          }}
        />
        <input
          autoFocus
          className="glass-input"
          style={{ paddingLeft: 30, fontSize: 12, padding: "7px 10px 7px 30px" }}
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Clear option */}
      {selected && (
        <button
          className="btn btn-ghost btn-sm"
          style={{ alignSelf: "flex-start", fontSize: 11 }}
          onClick={() => { onSelect(undefined); onClose(); }}
        >
          <X size={12} /> Remove Icon
        </button>
      )}

      {/* Icon grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 4,
          maxHeight: 200,
          overflowY: "auto",
        }}
      >
        {filtered.map((ic) => (
          <button
            key={ic.name}
            title={ic.label}
            onClick={() => { onSelect(ic.name); onClose(); }}
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-sm)",
              border: `1px solid ${selected === ic.name ? "var(--accent)" : "transparent"}`,
              background:
                selected === ic.name
                  ? "rgba(99,102,241,0.18)"
                  : "rgba(255,255,255,0.04)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color:
                selected === ic.name ? "var(--accent)" : "var(--text-secondary)",
              transition: "all var(--transition-fast)",
            }}
            onMouseEnter={(e) => {
              if (selected !== ic.name) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              }
            }}
            onMouseLeave={(e) => {
              if (selected !== ic.name) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }
            }}
          >
            <DynamicIcon name={ic.name} size={15} />
          </button>
        ))}
      </div>

      <div style={{ fontSize: 10, color: "var(--text-muted)", textAlign: "center" }}>
        {filtered.length} icons
      </div>
    </div>
  );
}
