"use client";
import { useResumeStore } from "@/store/useResumeStore";
import { GlassInput } from "@/components/ui/GlassInput";
import { User, Mail, Phone, MapPin, Globe, Link as LinkIcon, Code } from "lucide-react";

export default function PersonalStep() {
  const { resume, updatePersonal } = useResumeStore();
  const p = resume.personal;

  const field = (
    label: string,
    key: keyof typeof p,
    placeholder: string,
    icon: React.ReactNode,
    type = "text"
  ) => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
      <div style={{ color: "var(--text-muted)", flexShrink: 0, paddingBottom: 10 }}>{icon}</div>
      <GlassInput
        label={label}
        placeholder={placeholder}
        type={type}
        value={p[key] as string}
        onChange={(e) => updatePersonal({ [key]: e.target.value })}
      />
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {field("Full Name", "name", "John Doe", <User size={18} />)}
        {field("Professional Title", "title", "Software Engineer", <User size={18} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {field("Email", "email", "john@example.com", <Mail size={18} />, "email")}
        {field("Phone", "phone", "+1 555 000 0000", <Phone size={18} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {field("Location", "location", "New York, NY", <MapPin size={18} />)}
        {field("Website", "website", "https://yoursite.com", <Globe size={18} />, "url")}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {field("LinkedIn", "linkedin", "linkedin.com/in/johndoe", <LinkIcon size={18} />)}
        {field("GitHub", "github", "github.com/johndoe", <Code size={18} />)}
      </div>
    </div>
  );
}
