import Reveal from "./Reveal";

const SKILL_GROUPS = [
  {
    category: "Languages",
    skills: ["Java", "Kotlin", "Python", "JavaScript", "TypeScript"],
  },
  {
    category: "Frontend & Mobile",
    skills: ["React", "Next.js", "Flutter", "Jetpack Compose","Kotlin", "HTML & CSS"],
  },
  {
    category: "Backend",
    skills: ["Nest.js", "REST APIs" ,"Python" , "PHP" ,"Node.js" ,"Java"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis", "Firebase"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "GitHub Actions", "CI/CD"],
  },
];

export default function Skills() {
  return (
    <Reveal as="section" id="skills" className="skills">
      <h2>Technical Skills</h2>
      <div className="skills-groups">
        {SKILL_GROUPS.map((group) => (
          <div className="skill-group" key={group.category}>
            <h3>{group.category}</h3>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Reveal>
  );
}