export type Project = {
  title: string;
  description: string;
  tech: string[];
  impact?: string; // what it proves or its real outcome (only real facts)
  featured?: boolean; // pinned to the top with a badge
  repoUrl?: string; // link to the GitHub repo
  demoUrl?: string; // link to a live demo, if any
};

// Starter content shown until the database has projects. Repo links are left
// out on purpose: a "Code" button that lands on your profile page looks
// unfinished to a recruiter. Add real repo URLs in the admin panel (/admin/projects).
export const projects: Project[] = [
  {
    title: "University Management System",
    description: "Java + MySQL system for managing students, courses, and results.",
    tech: ["Java", "MySQL"],
  },
  {
    title: "Campus Connect App",
    description: "Flutter + Firebase mobile application for student communication.",
    tech: ["Flutter", "Firebase"],
  },
  {
    title: "3D Football Game",
    description: "Three.js based 3D football game with multiplayer support.",
    tech: ["Three.js", "JavaScript"],
  },
  {
    title: "Government Job Approval Portal",
    description: "Java desktop application with applicant and admin dashboards.",
    tech: ["Java"],
  },
];
