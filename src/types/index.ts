export type CommandType = {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  execute: (args: string[], language: 'en' | 'nl') => CommandOutput;
};

export type CommandOutput = {
  text: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'html';
};

export type CommandHistoryType = {
  command: string;
  output: CommandOutput;
};

export type ResumeData = {
  name: string;
  title: string;
  summary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  projects: Project[];
  contact: ContactInfo;
};

export type EducationItem = {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
};

export type ExperienceItem = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies?: string[];
};

export type SkillCategory = {
  category: string;
  skills: string[];
};

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
};

export type ContactInfo = {
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
};