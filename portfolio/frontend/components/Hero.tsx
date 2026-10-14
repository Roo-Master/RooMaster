import Reveal from "./Reveal";
import TrackedLink from "./TrackedLink";
import { site } from "@/data/site";

export default function Hero() {
  const waDigits = site.whatsapp.replace(/\D/g, "");

  return (
    <Reveal as="section" id="hero" className="hero">
      {site.openToWork && (
        <p className="open-badge">
          <span className="pulse" aria-hidden="true" /> Open to work
          {site.availability && <> · {site.availability}</>}
        </p>
      )}

      <h2 className="hero-headline">{site.headline}</h2>
      <p className="hero-summary">{site.summary}</p>

      <div className="hero-cta">
        {site.cvUrl && (
          <TrackedLink event="cv_download" href={site.cvUrl} download className="btn btn-primary">
            <i className="fa-solid fa-download" /> Download CV
          </TrackedLink>
        )}
        <TrackedLink
          event="email_click"
          href={`mailto:${site.email}?subject=${encodeURIComponent("Opportunity for " + site.name)}`}
          className={`btn ${site.cvUrl ? "btn-secondary" : "btn-primary"}`}
        >
          <i className="fa-solid fa-envelope" /> Email me
        </TrackedLink>
        {waDigits && (
          <TrackedLink event="whatsapp_click" href={`https://wa.me/${waDigits}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <i className="fa-brands fa-whatsapp" /> WhatsApp
          </TrackedLink>
        )}
        <TrackedLink event="github_click" href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          <i className="fa-brands fa-github" /> GitHub
        </TrackedLink>
        {site.linkedin && (
          <TrackedLink event="linkedin_click" href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <i className="fa-brands fa-linkedin" /> LinkedIn
          </TrackedLink>
        )}
      </div>

      <ul className="hero-facts">
        <li><i className="fa-solid fa-location-dot" /> {site.location}</li>
        {site.workPreference && <li><i className="fa-solid fa-briefcase" /> {site.workPreference}</li>}
        {site.lookingFor.length > 0 && (
          <li><i className="fa-solid fa-bullseye" /> Seeking: {site.lookingFor.join(" · ")}</li>
        )}
      </ul>

      {site.coreStack.length > 0 && (
        <ul className="hero-stack" aria-label="Core stack">
          {site.coreStack.map((t) => <li key={t}>{t}</li>)}
        </ul>
      )}
    </Reveal>
  );
}
