import Reveal from "./Reveal";

export default function Contact() {
  return (
    <Reveal as="section" id="contact" className="contact">
      <h2>Contact</h2>
      <p>
        <i className="fa-solid fa-envelope" />{" "}
        <a href="mailto:okothregan2@gmail.com">okothregan2@gmail.com</a>
      </p>
      <p>
        <i className="fa-solid fa-phone" />{" "}
        <a href="tel:+254759090440">+254 759 090 440</a>
      </p>
      <p>
        <i className="fa-brands fa-github" />{" "}
        <a
          href="https://github.com/Roo-Master"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/Roo-Master
        </a>
      </p>
      <p>
        <i className="fa-solid fa-location-dot" /> Kisumu, Kenya
      </p>
    </Reveal>
  );
}
