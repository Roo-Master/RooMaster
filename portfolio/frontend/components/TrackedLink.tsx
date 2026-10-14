"use client";

import type { AnchorHTMLAttributes } from "react";

// A normal link that also tells the analytics backend it was clicked
// (e.g. "cv_download"), so you can see which recruiter actions happen.
export default function TrackedLink({
  event,
  onClick,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { event: string }) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        try {
          const blob = new Blob([JSON.stringify({ type: event })], { type: "application/json" });
          navigator.sendBeacon("/api/event", blob);
        } catch {
          /* analytics must never break the link */
        }
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
