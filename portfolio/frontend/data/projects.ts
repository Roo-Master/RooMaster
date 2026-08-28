export type Project = {
  title: string;
  description: string;
  tech: string[];
  repoUrl?: string; // link to the GitHub repo
  demoUrl?: string; // link to a live demo, if any
};

export const projects: Project[] = [
  {
    title: "University Management System",
    description:
      "Java + MySQL system for managing students, courses, and results.",
    tech: ["Java", "MySQL"],
    repoUrl: "https://github.com/Roo-Master",
  },
  {
    title: "3D Football Game",
    description: "Three.js based 3D football game with multiplayer support.",
    tech: ["Three.js", "JavaScript"],
    repoUrl: "https://github.com/Roo-Master",
  },
  {
    title: "Government Job Approval Portal",
    description: "Java desktop application with applicant and admin dashboards.",
    tech: ["Java"],
    repoUrl: "https://github.com/Roo-Master",
  },
  {
    // TODO: confirm description/tech — get final details from README
    title: "Hospital Clock-In System",
    description: "System for managing staff clock-in and clock-out at a hospital.",
    tech: [],
    repoUrl: "https://github.com/Nich-softwareEng/hospital-clockin-system-V1",
  },
  {
    // TODO: confirm description/tech — get final details from README
    title: "SecureCybering",
    description: "Cybersecurity-focused project.",
    tech: [],
    repoUrl: "https://github.com/Roo-Master/SecureCybering",
  },
  {
    // TODO: confirm description/tech — get final details from README
    title: "Wardrobe OS",
    description: "Application for organizing and managing a digital wardrobe.",
    tech: [],
    repoUrl: "https://github.com/Roo-Master/Wardrobe-OS-",
  },
  {
    // TODO: confirm description/tech — get final details from README
    title: "Campus Connect",
    description: "Flutter + Firebase mobile application for student communication.",
    tech: ["Flutter", "Firebase"],
    repoUrl: "https://github.com/Roo-Master/Campus-connect-",
  },
  {
    // TODO: confirm tech stack and add more detail — get final details from README
    title: "Aurum",
    description: "Hotel reservation platform for browsing and booking rooms.",
    tech: [],
    repoUrl: "https://github.com/Roo-Master/aurum",
  },
  {
    title: "Momentum",
    description:
      "Android app for focus and skill-building — run timed sessions against chosen skills, log reflections, and track streaks and weekly focus time.",
    tech: ["Kotlin", "Jetpack Compose", "Room", "WorkManager"],
    repoUrl: "https://github.com/Roo-Master/momentum",
  },
];