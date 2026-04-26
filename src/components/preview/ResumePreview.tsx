"use client";

import { ResumeData } from "@/types/resume";
import { THEMES } from "@/config/themes";
import MinimalTemplate from "./templates/MinimalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";
import BoldTemplate from "./templates/BoldTemplate";
import TechTemplate from "./templates/TechTemplate";
import CompactTemplate from "./templates/CompactTemplate";
import AcademicTemplate from "./templates/AcademicTemplate";
import InfographicTemplate from "./templates/InfographicTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import StartupTemplate from "./templates/StartupTemplate";
import GraduateTemplate from "./templates/GraduateTemplate";
import DesignerTemplate from "./templates/DesignerTemplate";
import TimelineTemplate from "./templates/TimelineTemplate";

interface Props {
  data: ResumeData;
  scale?: number;
}

const A4_WIDTH = 794; // px at 96dpi

export default function ResumePreview({ data, scale = 1 }: Props) {
  const theme = THEMES[data.meta.themeId] ?? THEMES["midnight"];

  // Apply font-pair CSS vars
  const fontVars: Record<string, string> = {
    inter:    "'Inter', sans-serif",
    poppins:  "'Poppins', sans-serif",
    roboto:   "'Roboto', sans-serif",
    raleway:  "'Raleway', sans-serif",
    lato:     "'Lato', sans-serif",
  };
  const bodyFont  = fontVars[data.meta.fontPair] ?? fontVars.inter;
  const headingFont = data.meta.fontPair === "inter"
    ? "'Inter', sans-serif"
    : data.meta.fontPair === "poppins"
    ? "'Poppins', sans-serif"
    : data.meta.fontPair === "roboto"
    ? "'Roboto Slab', serif"
    : data.meta.fontPair === "raleway"
    ? "'Raleway', sans-serif"
    : "'Lato', sans-serif";

  const cssVars = {
    "--resume-body-font":    bodyFont,
    "--resume-heading-font": headingFont,
  } as React.CSSProperties;

  const TemplateMap: Record<string, React.ComponentType<{ data: ResumeData; theme: typeof theme }>> = {
    minimal:      MinimalTemplate,
    modern:       ModernTemplate,
    creative:     CreativeTemplate,
    executive:    ExecutiveTemplate,
    elegant:      ElegantTemplate,
    bold:         BoldTemplate,
    tech:         TechTemplate,
    compact:      CompactTemplate,
    academic:     AcademicTemplate,
    infographic:  InfographicTemplate,
    professional: ProfessionalTemplate,
    startup:      StartupTemplate,
    graduate:     GraduateTemplate,
    designer:     DesignerTemplate,
    timeline:     TimelineTemplate,
  };

  const Template = TemplateMap[data.meta.template] ?? MinimalTemplate;

  return (
    <div
      id="resume-preview-root"
      className="resume-preview-wrapper"
      style={{
        ...cssVars,
        width: A4_WIDTH,
        minHeight: 1123,   // A4 height in px
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: scale !== 1 ? "top left" : undefined,
      }}
    >
      <Template data={data} theme={theme} />
    </div>
  );
}
