export interface Metric {
  value: string;
  label: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  achievements: string[];
  metrics?: Metric[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: "Full-Stack & AI" | "Generative AI" | "Enterprise Systems";
  badge?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  description: string;
  skillsLearned: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    tagline: string;
    subTagline: string;
    location: string;
    avatarUrl?: string;
    phone: string;
    email: string;
    linkedin: string;
    linkedinUrl: string;
    github: string;
    githubUrl: string;
    resumeUrl?: string;
    resumePdfUrl?: string;
    summary: string;
    story: {
      intro: string;
      journey: string;
      vision: string;
    };
  };
  stats: Metric[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  education: EducationItem[];
  navItems: NavItem[];
}
