"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  as: Tag = "div",
  className = "",
  id,
  children,
}: {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  id?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    // @ts-expect-error dynamic tag with ref
    <Tag ref={ref} id={id} className={`${className}${visible ? " visible" : ""}`}>
      {children}
    </Tag>
  );
}