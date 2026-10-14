import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import TrackedLink from "./TrackedLink";
import { site } from "@/data/site";

export default function Contact() {
  const waDigits = site.whatsapp.replace(/\D/g, "");
  return (
    <Reveal as="section" id="contact" className="contact">
      <h2>Let&apos;s work together</h2>
      <p className="contact-lead">
        {site.openToWork
          ? "I'm open to new opportunities. Send me a message or reach me directly:"
          : "Get in touch:"}
      </p>
      <p>
        <i className="fa-solid fa-envelope" />{" "}
        <TrackedLink event="email_click" href={`mailto:${site.email}`}>{site.email}</TrackedLink>
      </p>
      <p>
        <i className="fa-solid fa-phone" />{" "}
        <TrackedLink event="phone_click" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</TrackedLink>
      </p>
      {waDigits && (
        <p>
          <i className="fa-brands fa-whatsapp" />{" "}
          <TrackedLink event="whatsapp_click" href={`https://wa.me/${waDigits}`} target="_blank" rel="noopener noreferrer">Message on WhatsApp</TrackedLink>
        </p>
      )}
      <p>
        <i className="fa-brands fa-github" />{" "}
        <TrackedLink event="github_click" href={site.github} target="_blank" rel="noopener noreferrer">{site.github.replace("https://", "")}</TrackedLink>
      </p>
      {site.linkedin && (
        <p>
          <i className="fa-brands fa-linkedin" />{" "}
          <TrackedLink event="linkedin_click" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</TrackedLink>
        </p>
      )}
      <p>
        <i className="fa-solid fa-location-dot" /> {site.location}
      </p>
      <h3 className="contact-subtitle">Send me a message</h3>
      <ContactForm />
    </Reveal>
  );
}
