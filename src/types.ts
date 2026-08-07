export interface ArchSection {
  id: string;
  title: string;
  number: number;
  category: 'Overview' | 'Structure' | 'Backend' | 'Database' | 'Frontend' | 'Security & Ops';
  summary: string;
}

export interface FolderNode {
  name: string;
  type: 'folder' | 'file';
  description?: string;
  children?: FolderNode[];
  highlight?: string;
}

export interface DbTable {
  name: string;
  description: string;
  columns: {
    name: string;
    type: string;
    key?: 'PK' | 'FK' | 'UK';
    nullable: boolean;
    defaultVal?: string;
    description: string;
  }[];
  indexes: string[];
}

export interface SecurityMeasure {
  threat: string;
  mitigation: string;
  codeSnippet: string;
  status: 'Critical' | 'High' | 'Medium';
}

export interface FolderExplanation {
  path: string;
  name: string;
  purpose: string;
  whyRequired: string;
  permissions: string;
  securityNote?: string;
  keyFiles: string[];
}
