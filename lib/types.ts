export type ProjectTask = { id: string; title: string; done: boolean };

export type Project = {
  id?: string;
  title: string;
  description: string;
  members: string[];
  tasks: ProjectTask[];
};

export type Contributor = {
  id: string;
  name: string;
  github: string;
  avatar?: string;
};

export type Profile = {
  id: string;
  name: string;
  role: string;
  skills?: string[];
  points?: number;
  projects?: number;
  [key: string]: unknown;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  type: string;
  description?: string;
};

export type Resource = {
  id: string;
  title: string;
  category: string;
  url?: string;
};

