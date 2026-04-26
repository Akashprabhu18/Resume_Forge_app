"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { exportJSON, importJSON } from "@/lib/storage";
import { toast } from "@/components/ui/Toast";
import {
  Undo2, Redo2, Save, Download, Upload, Eye, Palette,
  FileJson, Printer, ArrowLeft, Wand2, Moon, Sun,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface ToolbarProps {
  mode: "simple" | "editor";
}

export default function Toolbar({ mode }: ToolbarProps) {
  const {
    resume, undo, redo, history, setThemePanelOpen, ui, toggleColorMode,
  } = useResumeStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLight = ui.colorMode === "light";

  const handleExportJSON = () => {
    exportJSON(resume);
    toast.success("Resume exported as JSON");
  };

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importJSON(file);
      useResumeStore.getState().importResume(data);
      toast.success("Resume imported successfully");
    } catch {
      toast.error("Invalid resume file");
    }
    e.target.value = "";
  };

  const handlePrint = () => {
    window.open("/preview?print=1", "_blank");
  };

  return (
    <div
      className="glass"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid var(--border-subtle)",
        gap: 12,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left: back + branding */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => router.push("/")}
          title="Home"
        >
          <ArrowLeft size={14} />
        </button>
        {/* Animated Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          {/* Icon with pulse ring */}
          <div style={{ position: "relative", width: 28, height: 28, flexShrink: 0 }}>
            {/* Outer pulse ring */}
            <span style={{
              position: "absolute", inset: -4,
              borderRadius: "50%",
              border: "1.5px solid rgba(99,102,241,0.5)",
              animation: "logo-ring 2.4s ease-in-out infinite",
            }} />
            {/* Icon box */}
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "logo-bob 3s ease-in-out infinite",
              boxShadow: "0 0 12px rgba(99,102,241,0.5)",
            }}>
              <Wand2 size={14} color="white" />
            </div>
          </div>
          {/* Shimmer text */}
          <span style={{
            fontWeight: 800, fontSize: 15, letterSpacing: "-0.01em",
            background: "linear-gradient(90deg,#6366f1 0%,#a855f7 40%,#06b6d4 70%,#6366f1 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "logo-shimmer 3s linear infinite",
          }}>
            ResumeForge
          </span>
        </div>
        {mode === "editor" && (
          <span style={{
            fontSize: 11,
            padding: "2px 8px",
            borderRadius: 20,
            background: "rgba(99,102,241,0.15)",
            color: "var(--accent)",
            border: "1px solid rgba(99,102,241,0.3)",
            fontWeight: 500,
          }}>
            Advanced Editor
          </span>
        )}
      </div>

      {/* Center: undo / redo */}
      <div style={{ display: "flex", gap: 6 }}>
        <button
          className="btn btn-ghost btn-icon btn-sm"
          onClick={undo}
          disabled={!history.past.length}
          title="Undo (Ctrl+Z)"
          style={{ opacity: history.past.length ? 1 : 0.4 }}
        >
          <Undo2 size={14} />
        </button>
        <button
          className="btn btn-ghost btn-icon btn-sm"
          onClick={redo}
          disabled={!history.future.length}
          title="Redo (Ctrl+Y)"
          style={{ opacity: history.future.length ? 1 : 0.4 }}
        >
          <Redo2 size={14} />
        </button>
      </div>

      {/* Right: actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setThemePanelOpen(!ui.themePanelOpen)}
          title="Customize Theme"
        >
          <Palette size={14} />
          <span style={{ display: "none" }} className="md-show">Theme</span>
        </button>

        {/* Dark / Light mode toggle */}
        <button
          className="btn btn-ghost btn-sm"
          onClick={toggleColorMode}
          title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
          style={{
            position: "relative",
            overflow: "hidden",
            width: 36,
            height: 32,
            padding: 0,
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "opacity 200ms, transform 200ms",
              opacity: isLight ? 0 : 1,
              transform: isLight ? "rotate(90deg) scale(0.5)" : "rotate(0deg) scale(1)",
            }}
          >
            <Moon size={15} />
          </span>
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "opacity 200ms, transform 200ms",
              opacity: isLight ? 1 : 0,
              transform: isLight ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)",
            }}
          >
            <Sun size={15} style={{ color: "#f59e0b" }} />
          </span>
        </button>

        <button
          className="btn btn-ghost btn-sm"
          onClick={handleExportJSON}
          title="Export JSON"
        >
          <FileJson size={14} />
        </button>

        <button
          className="btn btn-ghost btn-sm"
          onClick={() => fileInputRef.current?.click()}
          title="Import JSON"
        >
          <Upload size={14} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: "none" }}
          onChange={handleImportJSON}
        />

        <button
          className="btn btn-ghost btn-sm"
          onClick={handlePrint}
          title="Print Resume"
        >
          <Printer size={14} />
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => router.push("/preview")}
        >
          <Eye size={14} />
          Preview
        </button>
      </div>
    </div>
  );
}
