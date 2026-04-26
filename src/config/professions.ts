// ─── Profession Configuration ─────────────────────────────────────────────
// Each profession carries: display info, section suggestions,
// key skills, recommended template/theme, and actionable resume tips.

import type { TemplateId, ThemeId } from "@/types/resume";

export interface ProfessionSection {
  sectionId: string;       // built-in section id or "custom"
  title?: string;          // override title
  order: number;           // suggested display order
  visible: boolean;
  tips: string[];          // writing tips for this section in this profession
}

export interface ProfessionConfig {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  suggestedTemplate: TemplateId;
  suggestedTheme: ThemeId;
  keySkills: string[];
  sectionOrder: ProfessionSection[];
  tips: string[];
  summarySuggestions: string[];   // one-click summary starters
  experienceBullets: string[];    // one-click bullet points for job description
}

export const PROFESSIONS: ProfessionConfig[] = [
  {
    id: "software-engineer",
    label: "Software Engineer",
    icon: "Code2",
    color: "#6366f1",
    description: "Backend, frontend, or full-stack developer",
    suggestedTemplate: "tech",
    suggestedTheme: "midnight",
    keySkills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "Docker", "AWS", "Git", "REST APIs", "GraphQL", "CI/CD"],
    sectionOrder: [
      { sectionId: "summary",          order: 0, visible: true,  tips: ["Mention years of experience", "Highlight key languages/frameworks", "Include scale (users, requests/sec)"] },
      { sectionId: "experience",        order: 1, visible: true,  tips: ["Use action verbs: built, designed, optimised", "Quantify impact: reduced latency by 40%", "Mention team size and scope"] },
      { sectionId: "skills",            order: 2, visible: true,  tips: ["Group by: Languages, Frameworks, Tools, Cloud", "Only list skills you can speak to in an interview"] },
      { sectionId: "projects",          order: 3, visible: true,  tips: ["Link GitHub repos", "Describe tech stack and your specific role", "Include metrics: users, stars, downloads"] },
      { sectionId: "education",         order: 4, visible: true,  tips: ["Include relevant coursework if recent grad", "List GPA only if ≥ 3.5"] },
      { sectionId: "certifications",    order: 5, visible: true,  tips: ["AWS, GCP, Azure certs are highly valued", "Include year obtained"] },
    ],
    tips: ["Keep to 1 page if <10 years exp", "ATS-safe: avoid tables and images", "Include a GitHub/portfolio link"],
    summarySuggestions: [
      "Results-driven Software Engineer with 5+ years of experience building scalable web applications using React, Node.js, and AWS. Passionate about clean code and high-impact engineering.",
      "Full-stack developer specializing in TypeScript and cloud-native architectures. Proven track record of shipping products used by 100k+ users.",
      "Backend engineer with expertise in distributed systems, REST APIs, and SQL/NoSQL databases. Focused on reliability, performance, and developer experience.",
    ],
    experienceBullets: [
      "Built and maintained REST APIs serving 500k+ daily requests with <50ms p99 latency",
      "Reduced CI/CD pipeline runtime by 40% by parallelising test suites and caching dependencies",
      "Led migration from monolith to microservices architecture, improving deployment frequency 3x",
      "Mentored 4 junior engineers through code reviews, pair programming, and architecture discussions",
      "Implemented real-time features using WebSockets, reducing data staleness from minutes to seconds",
      "Designed and shipped a new checkout flow that improved conversion rate by 18%",
      "Collaborated cross-functionally with product, design, and QA teams in 2-week sprint cycles",
    ],
  {
    id: "ui-ux-designer",
    label: "UI/UX Designer",
    icon: "Palette",
    color: "#ec4899",
    description: "Product, visual, interaction, or UX researcher",
    suggestedTemplate: "designer",
    suggestedTheme: "rose",
    keySkills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Wireframing", "Design Systems", "Usability Testing", "CSS", "HTML", "Accessibility", "After Effects"],
    sectionOrder: [
      { sectionId: "summary",        order: 0, visible: true,  tips: ["Mention your design philosophy", "Highlight types of products you've designed (mobile, web, SaaS)"] },
      { sectionId: "experience",     order: 1, visible: true,  tips: ["Show design process, not just deliverables", "Mention collaboration with engineers and PMs", "Quote NPS or conversion improvements"] },
      { sectionId: "projects",       order: 2, visible: true,  tips: ["Link your Figma/Behance/Dribbble portfolio", "Include before/after if available", "Explain your design decisions"] },
      { sectionId: "skills",         order: 3, visible: true,  tips: ["Group: Tools, Research Methods, Soft Skills"] },
      { sectionId: "education",      order: 4, visible: true,  tips: ["Include design bootcamps and certifications"] },
      { sectionId: "certifications", order: 5, visible: false, tips: [] },
    ],
    tips: ["Always include a portfolio URL", "Show your design thinking, not just finished screens", "Quantify impact: increased conversion by 20%"],
    summarySuggestions: [
      "Creative UI/UX Designer with 4+ years crafting user-centred digital experiences for web and mobile. Expert in Figma, design systems, and user research.",
      "Product designer passionate about solving complex problems through elegant interfaces. Led end-to-end design for products used by 200k+ users.",
      "UX Researcher and interaction designer with a background in psychology. Skilled at translating user insights into intuitive product experiences.",
    ],
    experienceBullets: [
      "Redesigned the onboarding flow, reducing drop-off rate by 32% and improving activation by 20%",
      "Built and maintained a component library in Figma used by 8 product teams across the organisation",
      "Conducted 40+ user interviews and usability tests to validate design decisions pre-development",
      "Collaborated daily with engineering and PM teams in Agile sprints to deliver features on schedule",
      "Created high-fidelity prototypes and interactive flows for stakeholder presentations and developer handoff",
      "Improved app accessibility score from 61 to 94 by implementing WCAG 2.1 AA standards",
    ],
  {
    id: "data-scientist",
    label: "Data Scientist / Analyst",
    icon: "BarChart2",
    color: "#06b6d4",
    description: "ML engineer, data analyst, or AI researcher",
    suggestedTemplate: "executive",
    suggestedTheme: "ocean",
    keySkills: ["Python", "R", "SQL", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Spark", "Tableau", "Power BI", "Machine Learning", "Statistics", "NLP"],
    sectionOrder: [
      { sectionId: "summary",         order: 0, visible: true, tips: ["Highlight domain expertise (NLP, CV, time-series)", "Mention business impact of models"] },
      { sectionId: "experience",      order: 1, visible: true, tips: ["Quantify model accuracy, revenue impact, or cost savings", "Describe data pipelines and scale"] },
      { sectionId: "skills",          order: 2, visible: true, tips: ["Group: Languages, ML Frameworks, Databases, Visualization"] },
      { sectionId: "projects",        order: 3, visible: true, tips: ["Link Kaggle notebooks or GitHub", "State dataset size, algorithms used, and results"] },
      { sectionId: "education",       order: 4, visible: true, tips: ["List relevant courses: stats, ML, linear algebra"] },
      { sectionId: "certifications",  order: 5, visible: true, tips: ["TensorFlow Cert, Google Data Analytics, AWS ML Specialty"] },
    ],
    tips: ["Include GitHub/Kaggle profile link", "State business outcomes, not just technical metrics", "List publications or Kaggle rankings if applicable"],
    summarySuggestions: [
      "Data Scientist with 3+ years building machine learning models that drive business decisions. Skilled in Python, SQL, TensorFlow, and statistical analysis.",
      "Analytical Data Analyst passionate about turning raw data into actionable insights. Experience with Tableau, Power BI, and A/B testing at scale.",
      "ML Engineer with expertise in NLP and computer vision. Delivered production models that reduced costs by $2M annually and improved process efficiency by 35%.",
    ],
    experienceBullets: [
      "Built a churn prediction model achieving 89% AUC, reducing customer churn by 15% quarter-over-quarter",
      "Developed and deployed ETL pipelines processing 50GB+ of daily transaction data using Spark and Airflow",
      "Conducted A/B tests on pricing strategy, directly contributing $1.2M in incremental annual revenue",
      "Created interactive dashboards in Tableau adopted by the C-suite for weekly business reviews",
      "Trained NLP classification model on 2M+ documents, improving support ticket routing accuracy to 94%",
      "Collaborated with product and engineering teams to integrate ML models into production APIs",
    ],
  {
    id: "product-manager",
    label: "Product Manager",
    icon: "Layers",
    color: "#f59e0b",
    description: "Technical PM, APM, or Growth PM",
    suggestedTemplate: "startup",
    suggestedTheme: "amber",
    keySkills: ["Roadmapping", "Agile/Scrum", "Jira", "SQL", "A/B Testing", "Product Strategy", "User Research", "Figma", "Analytics", "Go-to-Market", "OKRs", "Stakeholder Management"],
    sectionOrder: [
      { sectionId: "summary",        order: 0, visible: true, tips: ["Highlight the types of products you've shipped", "Mention team and org size you've led"] },
      { sectionId: "experience",     order: 1, visible: true, tips: ["Lead with outcomes: grew DAU by 30%", "Describe the full product lifecycle", "Show cross-functional leadership"] },
      { sectionId: "skills",         order: 2, visible: true, tips: ["Include: Methodologies, Tools, Domain Knowledge"] },
      { sectionId: "education",      order: 3, visible: true, tips: ["MBA is a plus but not required"] },
      { sectionId: "certifications", order: 4, visible: true, tips: ["CSPO, PMP, Google PM Certificate"] },
      { sectionId: "projects",       order: 5, visible: false, tips: [] },
    ],
    tips: ["Quantify everything — users, revenue, retention, NPS", "Show leadership and cross-team influence", "Include a brief product vision statement in your summary"],
    summarySuggestions: [
      "Strategic Product Manager with 5+ years owning the full product lifecycle from discovery to launch. Proven ability to grow DAU 2x through data-driven roadmap decisions.",
      "Customer-obsessed PM with a background in engineering. Shipped 20+ features in SaaS products serving 500k+ business users across enterprise and SMB segments.",
      "Growth-focused Product Manager experienced in running A/B tests, OKR planning, and go-to-market launches. Thrives in cross-functional Agile environments.",
    ],
    experienceBullets: [
      "Defined and shipped a self-serve onboarding flow that reduced time-to-value from 14 days to 3 days",
      "Grew monthly active users by 45% over 2 quarters by prioritising mobile-first features based on user research",
      "Led cross-functional team of 12 (eng, design, data, marketing) to deliver roadmap 2 weeks ahead of schedule",
      "Ran 30+ A/B experiments per quarter, improving key conversion metrics by an average of 12%",
      "Defined OKRs and product vision for a new B2B product line, securing $3M internal funding",
      "Collaborated with sales and customer success to reduce churn by 22% through proactive feature adoption initiatives",
    ],
  {
    id: "marketing",
    label: "Marketing Professional",
    icon: "TrendingUp",
    color: "#10b981",
    description: "Digital marketer, content strategist, or brand manager",
    suggestedTemplate: "bold",
    suggestedTheme: "forest",
    keySkills: ["SEO/SEM", "Google Analytics", "HubSpot", "Salesforce", "Social Media", "Content Strategy", "Email Marketing", "PPC", "A/B Testing", "Copywriting", "Brand Strategy", "Adobe Creative Suite"],
    sectionOrder: [
      { sectionId: "summary",        order: 0, visible: true, tips: ["Mention your marketing specialty (performance, brand, content)", "Include a career highlight with a metric"] },
      { sectionId: "experience",     order: 1, visible: true, tips: ["Lead with ROI metrics: 5x ROAS, 200% YoY growth", "Describe campaign scale and budget managed"] },
      { sectionId: "skills",         order: 2, visible: true, tips: ["Group: Tools, Channels, Methodologies"] },
      { sectionId: "certifications", order: 3, visible: true, tips: ["Google Ads, HubSpot, Facebook Blueprint certifications"] },
      { sectionId: "education",      order: 4, visible: true, tips: [] },
      { sectionId: "projects",       order: 5, visible: false, tips: [] },
    ],
    tips: ["Always lead with metrics", "Show breadth across channels", "Include portfolio URL if you have case studies"],
    summarySuggestions: [
      "Data-driven Marketing Professional with 6+ years driving growth through SEO, paid media, and content strategy. Managed $2M+ annual ad budgets with consistent 4x+ ROAS.",
      "Brand strategist and digital marketer specialising in B2B SaaS. Built content engines that generated 150% YoY organic traffic growth and 3,000+ MQLs per quarter.",
      "Performance marketing expert skilled in Google Ads, Meta, and email automation. Consistently delivers campaigns that exceed KPIs and lower CPL by 30%+.",
    ],
    experienceBullets: [
      "Managed $1.5M annual paid search budget achieving average 4.2x ROAS across Google and Meta platforms",
      "Grew organic blog traffic 200% YoY through SEO content strategy, resulting in 2,400+ monthly inbound leads",
      "Launched email nurture sequences with 42% open rate and 8% click-through rate — 2x industry average",
      "Developed and executed go-to-market strategy for product launch, acquiring 5,000 users in 30 days",
      "Reduced customer acquisition cost by 28% over 6 months through continuous creative and audience testing",
      "Managed a team of 4 content creators, overseeing editorial calendar and brand voice consistency",
    ],
  {
    id: "finance",
    label: "Finance & Accounting",
    icon: "DollarSign",
    color: "#64748b",
    description: "Analyst, accountant, CFO, or investment banker",
    suggestedTemplate: "professional",
    suggestedTheme: "slate",
    keySkills: ["Financial Modeling", "Excel", "SQL", "Bloomberg", "Valuation", "GAAP", "FP&A", "Budgeting", "Risk Analysis", "PowerBI", "Python", "QuickBooks"],
    sectionOrder: [
      { sectionId: "summary",        order: 0, visible: true, tips: ["Mention deal size or portfolio AUM you've managed", "Include relevant credentials (CFA, CPA)"] },
      { sectionId: "experience",     order: 1, visible: true, tips: ["Quantify deal sizes, savings identified, or models built", "Highlight industry sector expertise"] },
      { sectionId: "education",      order: 2, visible: true, tips: ["Finance degrees and MBA are important here", "Include relevant coursework: Corporate Finance, Valuation"] },
      { sectionId: "certifications", order: 3, visible: true, tips: ["CFA, CPA, FRM, Series 7/63 are key credentials"] },
      { sectionId: "skills",         order: 4, visible: true, tips: ["List: Software/Tools, Financial Skills, Industry Knowledge"] },
      { sectionId: "projects",       order: 5, visible: false, tips: [] },
    ],
    tips: ["Lead with quantifiable financial impact", "List all relevant licenses/certifications prominently", "Keep format clean and conservative — finance is traditional"],
    summarySuggestions: [
      "CFA-certified Financial Analyst with 7+ years in FP&A and investment analysis. Expertise in financial modelling, valuation, and executive reporting for Fortune 500 companies.",
      "Detail-oriented Accountant with CPA designation and 5 years managing full-cycle accounting, audits, and regulatory compliance for mid-market organisations.",
      "Senior Finance Manager skilled in budgeting, forecasting, and M&A due diligence. Delivered $4M in cost savings through process improvements and vendor renegotiations.",
    ],
    experienceBullets: [
      "Built 3-statement financial models supporting $120M acquisition, reducing diligence timeline by 2 weeks",
      "Managed full-cycle month-end close process, cutting close time from 12 days to 6 days through automation",
      "Led annual budgeting process for $200M P&L, coordinating inputs across 8 business units",
      "Identified $3.2M in cost reduction opportunities through spend analysis and vendor contract renegotiation",
      "Prepared board-level financial presentations highlighting KPIs, variance analysis, and strategic initiatives",
      "Ensured SOX compliance across all financial reporting processes with zero audit findings for 3 consecutive years",
    ],
  {
    id: "healthcare",
    label: "Healthcare / Medical",
    icon: "Heart",
    color: "#ef4444",
    description: "Doctor, nurse, therapist, or healthcare admin",
    suggestedTemplate: "elegant",
    suggestedTheme: "rose",
    keySkills: ["Patient Care", "Electronic Health Records", "Clinical Documentation", "HIPAA Compliance", "EMR/EHR Systems", "Medical Coding", "CPR/BLS", "Patient Assessment", "IV Therapy", "Wound Care"],
    sectionOrder: [
      { sectionId: "summary",        order: 0, visible: true, tips: ["State your specialty and years of experience", "Mention care setting (ICU, ER, primary care)"] },
      { sectionId: "experience",     order: 1, visible: true, tips: ["Include patient load, procedures performed, outcomes", "Highlight cross-disciplinary collaboration"] },
      { sectionId: "education",      order: 2, visible: true, tips: ["List degree, institution, and graduation year prominently"] },
      { sectionId: "certifications", order: 3, visible: true, tips: ["List all active licenses with expiration dates"] },
      { sectionId: "skills",         order: 4, visible: true, tips: ["Include clinical skills and software systems"] },
      { sectionId: "projects",       order: 5, visible: false, tips: [] },
    ],
    tips: ["Keep it to 2 pages for senior roles", "Include state license numbers where required", "Order: Education and certifications are critical in healthcare"],
    summarySuggestions: [
      "Compassionate Registered Nurse with 6+ years in ICU and emergency care. Adept at rapid patient assessment, critical care protocols, and interdisciplinary collaboration.",
      "Board-certified Physician specialising in Internal Medicine with 10+ years of clinical experience. Committed to evidence-based practice and patient-centred care.",
      "Healthcare Administrator with expertise in hospital operations, staff management, and HIPAA compliance. Reduced patient wait times by 30% through workflow optimisation.",
    ],
    experienceBullets: [
      "Managed care for 8–12 patients per shift in a 24-bed ICU, ensuring adherence to evidence-based protocols",
      "Reduced medication errors by 25% by implementing a double-check verification process for high-risk drugs",
      "Coordinated care with interdisciplinary teams including physicians, pharmacists, and social workers",
      "Trained and onboarded 10 new nursing staff on EHR systems and unit-specific procedures",
      "Maintained current CPR, ACLS, and PALS certifications; responded to 15+ code blue events during tenure",
      "Achieved 98% patient satisfaction scores on HCAHPS survey through attentive bedside communication",
    ],
  {
    id: "teacher",
    label: "Teacher / Educator",
    icon: "GraduationCap",
    color: "#8b5cf6",
    description: "K-12 teacher, professor, or corporate trainer",
    suggestedTemplate: "academic",
    suggestedTheme: "purple",
    keySkills: ["Curriculum Development", "Classroom Management", "Differentiated Instruction", "Assessment Design", "Google Classroom", "Canvas LMS", "IEP Writing", "Project-Based Learning", "SEL", "Data-Driven Instruction"],
    sectionOrder: [
      { sectionId: "summary",        order: 0, visible: true, tips: ["State your grade level, subject, and teaching philosophy"] },
      { sectionId: "experience",     order: 1, visible: true, tips: ["Include class size, grade improvements, parent engagement", "Mention curriculum you designed or adopted"] },
      { sectionId: "education",      order: 2, visible: true, tips: ["Teaching degree and certification are essential"] },
      { sectionId: "certifications", order: 3, visible: true, tips: ["State teaching license with grades and subject areas"] },
      { sectionId: "skills",         order: 4, visible: true, tips: ["Group: Teaching Methods, Technology Tools, Soft Skills"] },
      { sectionId: "projects",       order: 5, visible: false, tips: [] },
    ],
    tips: ["Mention specific student outcomes", "Highlight any curriculum or program you've built", "Include any extracurricular leadership"],
    summarySuggestions: [
      "Dedicated K-12 educator with 8 years teaching English Language Arts to grades 6–8. Expert in differentiated instruction and project-based learning with proven student growth results.",
      "University professor with a PhD in Computer Science, teaching undergraduate and graduate courses in algorithms and machine learning. Published researcher with 15+ peer-reviewed papers.",
      "Corporate Trainer and instructional designer specialising in leadership development and onboarding programs. Delivered training to 500+ employees with 95% satisfaction rates.",
    ],
    experienceBullets: [
      "Designed and implemented a differentiated curriculum for 28 students across 3 learning levels, raising proficiency rates by 22%",
      "Integrated Google Classroom and project-based learning strategies, increasing student engagement scores by 35%",
      "Coached the school debate team to regional finals for 3 consecutive years",
      "Collaborated with IEP team to develop accommodations for 6 students with special needs, ensuring equitable access to curriculum",
      "Led professional development workshops for 25+ staff on trauma-informed teaching practices",
      "Maintained 97% parent communication response rate using Class Dojo and bi-weekly newsletters",
    ],
  {
    id: "sales",
    label: "Sales Professional",
    icon: "Target",
    color: "#f97316",
    description: "AE, SDR, VP of Sales, or Business Development",
    suggestedTemplate: "bold",
    suggestedTheme: "amber",
    keySkills: ["Salesforce", "HubSpot CRM", "Prospecting", "Cold Calling", "Pipeline Management", "Negotiation", "SaaS Sales", "Account Management", "Quota Achievement", "Solution Selling", "Forecasting", "MEDDIC"],
    sectionOrder: [
      { sectionId: "summary",        order: 0, visible: true, tips: ["Lead with your best quota achievement %", "State your AVG deal size and sales cycle length"] },
      { sectionId: "experience",     order: 1, visible: true, tips: ["Always lead with % quota attainment", "Include revenue generated, deals closed, territory size"] },
      { sectionId: "skills",         order: 2, visible: true, tips: ["Include: CRM tools, Sales methodology, Industry verticals"] },
      { sectionId: "certifications", order: 3, visible: false, tips: [] },
      { sectionId: "education",      order: 4, visible: true, tips: [] },
      { sectionId: "projects",       order: 5, visible: false, tips: [] },
    ],
    tips: ["Lead every bullet with a number", "123% of quota, $2M ARR generated, 50+ accounts", "Keep it short — 1 page max for most sales roles"],
    summarySuggestions: [
      "Top-performing Account Executive with 5 years closing enterprise SaaS deals. Consistently achieved 120%+ of annual quota and generated $3.5M in new ARR in FY2023.",
      "SDR turned AE with expertise in outbound prospecting, pipeline building, and multi-stakeholder deal management. Ranked #1 in team for 3 consecutive quarters.",
      "VP of Sales with a track record of building and scaling high-performing teams. Grew regional revenue from $5M to $18M in 3 years through strategic hiring and territory planning.",
    ],
    experienceBullets: [
      "Exceeded annual quota by 127%, generating $4.2M in new ARR from 38 closed-won enterprise accounts",
      "Built a pipeline of 200+ qualified opportunities through cold outreach, events, and referral programmes",
      "Reduced average sales cycle from 90 days to 55 days by implementing a structured MEDDIC qualification framework",
      "Managed a portfolio of 45 accounts with $6M total ACV, achieving 112% net revenue retention",
      "Collaborated with marketing to launch an outbound sequence that generated 80+ meetings per quarter",
      "Promoted from SDR to AE in 9 months based on consistent quota attainment above 150%",
    ],
  {
    id: "engineer-mech-civil",
    label: "Mechanical / Civil Engineer",
    icon: "Wrench",
    color: "#78716c",
    description: "Mechanical, civil, structural or manufacturing engineer",
    suggestedTemplate: "compact",
    suggestedTheme: "slate",
    keySkills: ["AutoCAD", "SolidWorks", "ANSYS", "MATLAB", "FEA/FEM", "Project Management", "ISO Standards", "Six Sigma", "HVAC", "Structural Analysis", "PLC Programming", "BIM/Revit"],
    sectionOrder: [
      { sectionId: "summary",         order: 0, visible: true, tips: ["State your engineering discipline and signature projects"] },
      { sectionId: "experience",       order: 1, visible: true, tips: ["Include project scale ($M), team size, technical scope", "Mention codes/standards followed: ASME, ASTM, Eurocodes"] },
      { sectionId: "skills",           order: 2, visible: true, tips: ["Group: Software, Technical Skills, Standards/Methods"] },
      { sectionId: "projects",         order: 3, visible: true, tips: ["Include type, scale, your role, and outcome"] },
      { sectionId: "education",        order: 4, visible: true, tips: ["Include relevant coursework if recent grad"] },
      { sectionId: "certifications",   order: 5, visible: true, tips: ["PE License, Six Sigma, PMP are highly valued"] },
    ],
    tips: ["Highlight project scale and budget", "List software tools prominently", "PE license should be in the header or summary"],
    summarySuggestions: [
      "Licensed Professional Engineer with 9 years of experience in structural design and project management. Led $50M+ infrastructure projects from concept through construction oversight.",
      "Mechanical engineer specialising in product development and manufacturing process optimisation. Proficient in SolidWorks, ANSYS, and Six Sigma methodologies.",
      "Civil engineer with expertise in transportation and water resources. Managed multi-disciplinary teams on projects valued at $10M–$80M across municipal and private sectors.",
    ],
    experienceBullets: [
      "Led structural design for a 12-storey mixed-use building, managing a $28M budget and coordinating 5 sub-consultant teams",
      "Reduced machine downtime by 32% through predictive maintenance programme and SPC monitoring on 3 production lines",
      "Performed FEA analysis on 20+ components, identifying failures that prevented $1.4M in potential warranty claims",
      "Oversaw construction administration for a $15M highway interchange project, completing on time and 4% under budget",
      "Implemented ISO 9001 quality management system across manufacturing facility, achieving certification in 8 months",
      "Created detailed AutoCAD and Revit models for municipal water treatment plant expansion serving 80,000 residents",
    ],
  {
    id: "freelancer",
    label: "Freelancer / Creative",
    icon: "Zap",
    color: "#a855f7",
    description: "Copywriter, video editor, photographer, or consultant",
    suggestedTemplate: "infographic",
    suggestedTheme: "purple",
    keySkills: ["Project Management", "Client Relations", "Contract Negotiation", "Adobe Creative Suite", "Social Media", "Content Creation", "Video Editing", "SEO", "WordPress", "Analytics", "Budget Management"],
    sectionOrder: [
      { sectionId: "summary",        order: 0, visible: true, tips: ["Lead with your specialty and years of freelance experience", "Mention notable clients or brands"] },
      { sectionId: "projects",       order: 1, visible: true, tips: ["Freelancers: projects ARE your experience", "Link to portfolio/work samples", "Include client name if allowed, industry if not"] },
      { sectionId: "skills",         order: 2, visible: true, tips: ["Your skills ARE your product — make them specific"] },
      { sectionId: "experience",     order: 3, visible: true, tips: ["List any in-house/agency roles you've held"] },
      { sectionId: "education",      order: 4, visible: false, tips: [] },
      { sectionId: "certifications", order: 5, visible: false, tips: [] },
    ],
    tips: ["Portfolio URL in header is critical", "Focus on outcomes for clients, not tasks", "Include testimonial quotes if space allows"],
    summarySuggestions: [
      "Versatile freelance content creator and copywriter with 5+ years working with brands from startups to Fortune 500. Delivered 300+ projects on time with a 98% client satisfaction rate.",
      "Freelance video editor and motion graphics designer specialising in social media content. Created viral campaigns reaching 10M+ views for clients in lifestyle, tech, and food industries.",
      "Independent marketing consultant helping B2B SaaS startups build go-to-market strategies. Generated $2M in client pipeline within first 90 days of engagement on average.",
    ],
    experienceBullets: [
      "Delivered 40+ long-form articles and landing pages per month for SaaS clients, maintaining 100% on-time delivery",
      "Grew a client's Instagram following from 12k to 85k in 6 months through strategic content planning and Reels production",
      "Edited a YouTube documentary series that garnered 2.3M views and won a regional digital media award",
      "Managed project timelines, client communication, and invoicing for portfolio of 12 concurrent retainer clients",
      "Created email marketing sequences generating average 35% open rate and 9% CTR for e-commerce clients",
      "Developed brand identity system (logo, colour palette, typography) for 3 early-stage startups",
    ],
  {
    id: "legal",
    label: "Legal Professional",
    icon: "Scale",
    color: "#1e293b",
    description: "Attorney, paralegal, or legal counsel",
    suggestedTemplate: "elegant",
    suggestedTheme: "mono",
    keySkills: ["Legal Research", "Contract Drafting", "Litigation", "Westlaw/LexisNexis", "Due Diligence", "Negotiation", "Compliance", "Regulatory Analysis", "Discovery", "Client Counseling", "Brief Writing", "Trial Preparation"],
    sectionOrder: [
      { sectionId: "summary",        order: 0, visible: true, tips: ["State your practice area and bar admissions clearly", "Mention notable cases or transaction values"] },
      { sectionId: "experience",     order: 1, visible: true, tips: ["Describe matter type, size, and your specific role", "Mention transaction values for transactional work"] },
      { sectionId: "education",      order: 2, visible: true, tips: ["Law school prominently — include honors/law review", "Include undergraduate institution and major"] },
      { sectionId: "certifications", order: 3, visible: true, tips: ["Bar admissions with state and year — this is critical"] },
      { sectionId: "skills",         order: 4, visible: true, tips: ["Include: Practice Areas, Legal Tools, Languages"] },
      { sectionId: "projects",       order: 5, visible: false, tips: [] },
    ],
    tips: ["Lawyers CV can be 2+ pages — completeness matters", "Include bar admissions very prominently", "List publications, speaking engagements if senior"],
    summarySuggestions: [
      "Corporate attorney with 8+ years advising on M&A, private equity, and venture capital transactions. Closed $500M+ in deals across technology, healthcare, and real estate sectors.",
      "Experienced litigator with a track record in commercial disputes and employment law. Successfully tried 12 cases to verdict in state and federal courts.",
      "Transactional lawyer and compliance specialist with expertise in data privacy (GDPR, CCPA) and regulatory matters for fintech and SaaS companies.",
    ],
    experienceBullets: [
      "Advised on $85M acquisition of a SaaS company, leading due diligence, SPA negotiation, and post-close integration",
      "Drafted and negotiated 200+ commercial contracts annually including MSAs, SaaS agreements, and IP licences",
      "Represented employer in EEOC mediation, achieving favourable settlement and avoiding costly litigation",
      "Developed data privacy compliance programme achieving GDPR and CCPA compliance across 3 business units",
      "Managed a caseload of 30+ active matters simultaneously, meeting all court deadlines with zero sanctions",
      "Presented CLEs on emerging technology law topics to audiences of 50–200 legal professionals",
    ],
];

export function getProfessionById(id: string): ProfessionConfig | undefined {
  return PROFESSIONS.find((p) => p.id === id);
}
