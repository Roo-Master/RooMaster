"use client";

import { useEffect, useState } from "react";

// Terminal-style line that types and erases short phrases about the work.
// Decorative: the phrases are also exposed once to screen readers as text.
const PHRASES = [
  "building scalable REST APIs",
  "shipping Flutter and Kotlin apps",
  "designing reliable data models",
  "automating tests and CI",
];

export default function TypedPrompt() {
  const [text, setText] = useState(PHRASES[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let p = 0, i = 0, erasing = false;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const phrase = PHRASES[p];
      i += erasing ? -1 : 1;
      setText(phrase.slice(0, Math.max(i, 0)));
      let delay = erasing ? 25 : 55;
      if (!erasing && i === phrase.length) { erasing = true; delay = 1400; }
      else if (erasing && i === 0) { erasing = false; p = (p + 1) % PHRASES.length; delay = 350; }
      timer = setTimeout(step, delay);
    };
    i = PHRASES[0].length; erasing = true;
    timer = setTimeout(step, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="hero-prompt">
      <span className="sr-only">Currently: {PHRASES.join(", ")}</span>
      <span aria-hidden="true">
        <span className="hero-prompt-sign">&gt;</span> {text}
        <span className="hero-prompt-caret" />
      </span>
    </p>
  );
}
