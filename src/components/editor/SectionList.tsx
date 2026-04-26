"use client";

import { useResumeStore } from "@/store/useResumeStore";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical, Eye, EyeOff, Trash2, Copy, Plus,
  ChevronDown, ChevronUp, Smile, Check, Pencil,
} from "lucide-react";
import { useState, useRef, useCallback } from "react";
import SectionBuilder from "./SectionBuilder";
import { IconPicker, DynamicIcon } from "@/components/ui/IconPicker";
import type { ResumeSection } from "@/types/resume";

// ─── Inline editable title ───────────────────────────────────
function EditableTitle({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const commit = () => {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed && trimmed !== value) onChange(trimmed);
    else setDraft(value);
  };

  if (editing) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }} onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") { setEditing(false); setDraft(value); }
          }}
          style={{
            background: "rgba(99,102,241,0.12)",
            border: "1px solid var(--accent)",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-primary)",
            fontSize: 13,
            fontWeight: 600,
            padding: "3px 8px",
            outline: "none",
            width: "100%",
            maxWidth: 200,
          }}
        />
        <button
          className="btn btn-ghost btn-icon"
          style={{ width: 24, height: 24, padding: 0, color: "var(--success)" }}
          onMouseDown={(e) => { e.preventDefault(); commit(); }}
        >
          <Check size={12} />
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, cursor: "text" }}
      onClick={(e) => { e.stopPropagation(); setEditing(true); setDraft(value); }}
      title="Click to edit title"
    >
      <span style={{ fontWeight: 600, fontSize: 13 }}>{value}</span>
      <Pencil
        size={11}
        style={{ color: "var(--text-muted)", opacity: 0.6, flexShrink: 0 }}
      />
    </div>
  );
}

// ─── Sortable section row ────────────────────────────────────
function SortableSectionRow({ sectionId }: { sectionId: string }) {
  const { resume, toggleSectionVisibility, removeSection, duplicateSection, updateSection } = useResumeStore();
  const section = resume.sections[sectionId];
  const [expanded, setExpanded] = useState(true);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging,
  } = useSortable({ id: sectionId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : "auto" as const,
  };

  const handleTitleChange = useCallback(
    (newTitle: string) => {
      updateSection(sectionId, { title: newTitle } as Partial<ResumeSection>);
    },
    [sectionId, updateSection]
  );

  const handleIconSelect = useCallback(
    (iconName: string | undefined) => {
      updateSection(sectionId, { icon: iconName } as Partial<ResumeSection>);
    },
    [sectionId, updateSection]
  );

  if (!section) return null;

  const isBuiltIn = ["summary", "experience", "education", "skills", "projects", "certifications"].includes(sectionId);

  return (
    <div ref={setNodeRef} style={style}>
      <div className="glass-card" style={{ padding: 0, overflow: "visible" }}>
        {/* Row header */}
        <div
          className="flex-between"
          style={{
            padding: "12px 14px",
            borderBottom: expanded ? "1px solid var(--border-subtle)" : "none",
            cursor: "pointer",
            borderRadius: expanded ? "var(--radius-xl) var(--radius-xl) 0 0" : "var(--radius-xl)",
            gap: 8,
          }}
          onClick={() => setExpanded(!expanded)}
        >
          {/* Left: drag handle + icon + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
            {/* Drag handle */}
            <div
              className="dnd-handle"
              {...attributes}
              {...listeners}
              onClick={(e) => e.stopPropagation()}
              style={{ flexShrink: 0 }}
            >
              <GripVertical size={15} />
            </div>

            {/* Icon button */}
            <div style={{ position: "relative", flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
              <button
                title={section.icon ? `Icon: ${section.icon} — Click to change` : "Add icon"}
                onClick={(e) => {
                  e.stopPropagation();
                  setIconPickerOpen((prev) => !prev);
                }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "var(--radius-sm)",
                  border: `1px solid ${section.icon ? "rgba(99,102,241,0.4)" : "var(--border-default)"}`,
                  background: section.icon ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.04)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: section.icon ? "var(--accent)" : "var(--text-muted)",
                  transition: "all var(--transition-fast)",
                  flexShrink: 0,
                }}
              >
                {section.icon
                  ? <DynamicIcon name={section.icon} size={13} />
                  : <Smile size={13} />
                }
              </button>

              {/* Icon picker popover */}
              {iconPickerOpen && (
                <IconPicker
                  selected={section.icon}
                  onSelect={handleIconSelect}
                  onClose={() => setIconPickerOpen(false)}
                />
              )}
            </div>

            {/* Editable title */}
            <EditableTitle value={section.title} onChange={handleTitleChange} />

            {!section.visible && (
              <span style={{
                fontSize: 10,
                color: "var(--text-muted)",
                background: "rgba(255,255,255,0.05)",
                padding: "2px 6px",
                borderRadius: 4,
                border: "1px solid var(--border-subtle)",
                flexShrink: 0,
              }}>
                hidden
              </span>
            )}
          </div>

          {/* Right: action buttons */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn btn-ghost btn-icon btn-sm"
              onClick={() => toggleSectionVisibility(sectionId)}
              title={section.visible ? "Hide section" : "Show section"}
            >
              {section.visible ? <Eye size={13} /> : <EyeOff size={13} />}
            </button>
            {/* Duplicate available for all sections */}
            <button
              className="btn btn-ghost btn-icon btn-sm"
              onClick={() => duplicateSection(sectionId)}
              title="Duplicate section"
            >
              <Copy size={13} />
            </button>
            {/* Delete available for ALL sections */}
            <button
              className="btn btn-danger btn-icon btn-sm"
              onClick={() => removeSection(sectionId)}
              title="Remove section"
            >
              <Trash2 size={13} />
            </button>
            <div style={{ color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
          </div>
        </div>

        {/* Section content editor */}
        {expanded && (
          <div style={{ padding: "18px 16px" }}>
            <SectionBuilder sectionId={sectionId} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main section list ───────────────────────────────────────
export default function SectionList() {
  const { resume, reorderSections, addCustomSection } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resume.sectionOrder.indexOf(active.id as string);
      const newIndex = resume.sectionOrder.indexOf(over.id as string);
      reorderSections(arrayMove(resume.sectionOrder, oldIndex, newIndex));
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resume.sectionOrder} strategy={verticalListSortingStrategy}>
          {resume.sectionOrder.map((id) => (
            <SortableSectionRow key={id} sectionId={id} />
          ))}
        </SortableContext>
      </DndContext>

      <button
        className="btn btn-ghost"
        onClick={addCustomSection}
        style={{ alignSelf: "flex-start" }}
      >
        <Plus size={15} />
        Add Custom Section
      </button>
    </div>
  );
}
