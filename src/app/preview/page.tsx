"use client";

import { useRef, useState, Suspense } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { ToastProvider, toast } from "@/components/ui/Toast";
import ResumePreview from "@/components/preview/ResumePreview";
import { Download, Printer, ArrowLeft, ZoomIn, ZoomOut } from "lucide-react";
import { useRouter } from "next/navigation";

function PreviewContent() {
  const { resume } = useResumeStore();
  const router = useRouter();
  const [scale, setScale] = useState(0.75);
  const [exporting, setExporting] = useState(false);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("resume-preview-root");
      if (!element) throw new Error("Preview not found");

      await html2pdf()
        .set({
          margin: 0,
          filename: `${resume.personal.name || "resume"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save();

      toast.success("PDF exported successfully!");
    } catch (e) {
      toast.error("Failed to export PDF");
      console.error(e);
    } finally {
      setExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <ToastProvider />
      <div className="bg-animated no-print">
        <div className="bg-grid" />
        <div className="bg-orb-3" />
      </div>

      {/* Sticky toolbar */}
      <div
        className="glass no-print"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => router.back()}>
            <ArrowLeft size={14} /> Back
          </button>
          <span style={{ fontWeight: 700, fontSize: 15 }} className="gradient-text">Resume Preview</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Zoom */}
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setScale((s) => Math.max(0.3, s - 0.1))} title="Zoom Out"><ZoomOut size={14} /></button>
          <span style={{ fontSize: 12, color: "var(--text-secondary)", minWidth: 40, textAlign: "center" }}>{Math.round(scale * 100)}%</span>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setScale((s) => Math.min(1.2, s + 0.1))} title="Zoom In"><ZoomIn size={14} /></button>

          <div style={{ width: 1, height: 20, background: "var(--border-default)", margin: "0 4px" }} />

          <button className="btn btn-ghost btn-sm" onClick={handlePrint}>
            <Printer size={14} /> Print
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleExportPDF} disabled={exporting}>
            <Download size={14} />
            {exporting ? "Exporting..." : "Export PDF"}
          </button>
        </div>
      </div>

      {/* Page content */}
      <div
        style={{
          minHeight: "100vh",
          paddingTop: 70,
          paddingBottom: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ marginTop: 24, width: 794 * scale + 48, display: "flex", justifyContent: "center" }}>
          <ResumePreview data={resume} scale={scale} />
        </div>
      </div>
    </>
  );
}

export default function PreviewPage() {
  return (
    <Suspense>
      <PreviewContent />
    </Suspense>
  );
}
