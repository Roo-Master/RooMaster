"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
];

const TITLES = ["Full-Stack Developer", "Software Engineering Student", "Problem Solver"];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [tagline, setTagline] = useState(TITLES[0]);
  const reducedMotion = useRef(false);

  // Active-section highlighting while scrolling
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));

    const onScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (window.pageYOffset >= el.offsetTop - 100) {
          current = el.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Typing effect for the tagline, unless the user prefers reduced motion
  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion.current) return;

    let index = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (index >= TITLES.length) index = 0;
      const fullText = TITLES[index];

      if (!deleting) {
        charIndex++;
        setTagline(fullText.substring(0, charIndex));
        if (charIndex === fullText.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1500);
          return;
        }
      } else {
        charIndex--;
        setTagline(fullText.substring(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          index++;
        }
      }
      timeoutId = setTimeout(tick, deleting ? 100 : 150);
    };

    timeoutId = setTimeout(tick, 150);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  return (
    <header>
      <div className="profile">
        <h1>Okoth Reagan</h1>
        <p className="tagline" aria-live="polite">
          {tagline}
        </p>
        <div className="profile-contact">
          <a href="mailto:okothregan2@gmail.com">
            <i className="fa-solid fa-envelope" /> okothregan2@gmail.com
          </a>
          <a href="tel:+254759090440">
            <i className="fa-solid fa-phone" /> +254 759 090 440
          </a>
        </div>
      </div>

      <nav aria-label="Primary">
        <button
          className="nav-toggle"
          aria-expanded={navOpen}
          aria-controls="primary-nav"
          aria-label="Toggle navigation menu"
          onClick={() => setNavOpen((open) => !open)}
        >
          <i className="fa-solid fa-bars" />
        </button>
        <ul className={`navbar${navOpen ? " open" : ""}`} id="primary-nav">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeSection === link.href.slice(1) ? "active" : ""}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta" onClick={(e) => handleNavClick(e, "#contact")}>
              Hire me
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
