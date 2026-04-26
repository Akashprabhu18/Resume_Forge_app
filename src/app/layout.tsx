import type { Metadata } from "next";
import "./globals.css";
import { ColorModeProvider } from "@/components/ui/ColorModeProvider";

export const metadata: Metadata = {
  title: "ResumeForge — Dynamic Resume Builder",
  description:
    "Build professional, ATS-friendly resumes with real-time preview, drag-and-drop editor, and beautiful templates. 100% free.",
  keywords: ["resume builder", "CV maker", "free resume", "ATS resume", "professional resume"],
  openGraph: {
    title: "ResumeForge — Dynamic Resume Builder",
    description: "Build stunning resumes with real-time preview and beautiful templates.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ColorModeProvider />
        {children}
      </body>
    </html>
  );
}
