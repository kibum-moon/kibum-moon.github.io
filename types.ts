
export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  link: string;
  abstract: string;
  tags: string[];
}

export interface BlogPost {
  title: string;
  date: string;
  summary: string;
  link: string;
}

export interface CVSection {
  title: string;
  items: Array<{
    period?: string;
    title: string;
    institution?: string;
    description?: string;
  }>;
}

// Types for the full CV page
export interface CVEntry {
    period?: string;
    title: string;
    institution?: string;
    location?: string;
    details?: string | string[];
}

export interface Manuscript {
    authors: string[];
    title:string;
    status: string;
    link: string;
}

export interface Patent {
    inventors: string[];
    year: number;
    title: string;
    id: string; 
}

export interface Conference {
    authors: string[];
    date: string;
    title: string;
    conference: string;
    location: string;
}

export interface ConferenceCategory {
    category: string;
    items: Conference[];
}

export interface Award {
    period: string;
    title: string;
    details?: string;
}

export interface AwardCategory {
    category: string;
    items: Award[];
}

export interface Skill {
    category: string;
    list: string;
}

// FIX: Add TeachingCourse interface to support the Teaching component.
export interface TeachingCourse {
    code: string;
    title: string;
    semester: string;
    description: string;
    syllabusUrl?: string;
}
