import Reveal from "./Reveal";
import RichText from "./RichText";
import { getExperience } from "@/lib/content";

export default async function Experience() {
  const items = await getExperience();
  return (
    <Reveal as="section" id="experience" className="experience">
      <h2>Experience</h2>
      {items.map((item) => (
        <Reveal as="div" className="exp" key={item.title}>
          <h3>{item.title}</h3>
          <p>
            <RichText text={item.body} />
          </p>
        </Reveal>
      ))}
    </Reveal>
  );
}
