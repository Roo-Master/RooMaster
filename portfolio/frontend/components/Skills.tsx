import Reveal from "./Reveal";
import { getSkills } from "@/lib/content";

export default async function Skills() {
  const skills = await getSkills();
  return (
    <Reveal as="section" id="skills" className="skills">
      <h2>Technical Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </Reveal>
  );
}
