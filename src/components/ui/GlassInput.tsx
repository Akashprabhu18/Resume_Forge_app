"use client";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function GlassInput({ label, error, className = "", ...props }: GlassInputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
      {label && (
        <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </label>
      )}
      <input className={`glass-input ${className}`} {...props} />
      {error && <span style={{ fontSize: "12px", color: "var(--error)" }}>{error}</span>}
    </div>
  );
}

interface GlassTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function GlassTextarea({ label, error, className = "", ...props }: GlassTextareaProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
      {label && (
        <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </label>
      )}
      <textarea className={`glass-input glass-textarea ${className}`} {...props} />
      {error && <span style={{ fontSize: "12px", color: "var(--error)" }}>{error}</span>}
    </div>
  );
}

interface GlassSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function GlassSelect({ label, options, className = "", ...props }: GlassSelectProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
      {label && (
        <label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </label>
      )}
      <select
        className={`glass-input ${className}`}
        style={{ cursor: "pointer" }}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
