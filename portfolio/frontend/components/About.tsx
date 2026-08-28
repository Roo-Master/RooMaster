import Reveal from "./Reveal";

export default function About() {
  return (
    <Reveal as="section" id="about" className="about">
      <h2>About Me</h2>
      <p className="about-intro">
        I&apos;m a full-stack developer who enjoys turning complex problems into
        clean, reliable software. With experience across mobile, web, and
        backend development, I focus on building applications that are not
        just functional, but genuinely well-engineered — performant,
        maintainable, and built to scale.
      </p>
      <p>
        My toolkit spans <strong>Java</strong>, <strong>Kotlin</strong>, and{" "}
        <strong>Python</strong> on the backend, <strong>Flutter</strong> for
        mobile, and <strong>React</strong> (Next.js, Nest.js) on the frontend,
        paired with cloud-based deployment and infrastructure. I care as much
        about the developer experience — readable code, sound architecture,
        thoughtful testing — as I do about the end product.
      </p>
      <ul className="about-highlights">
        <li>Full-stack development across web, mobile & backend</li>
        <li>Cloud-native deployment & scalable architecture</li>
        <li>Clean code, strong testing, and maintainable systems</li>
        <li>Continuous learner, always exploring new tools & practices</li>
      </ul>
    </Reveal>
  );
}