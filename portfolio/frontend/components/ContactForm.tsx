"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" required maxLength={100} autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required maxLength={200} autoComplete="email" />
      </label>
      <label>
        Message
        <textarea name="message" required minLength={5} maxLength={3000} rows={5} />
      </label>
      {/* honeypot, hidden from people */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p role="status" aria-live="polite" className={status === "error" ? "form-error" : "form-ok"}>
        {status === "sent" && "Thanks! Your message has been sent."}
        {status === "error" && error}
      </p>
    </form>
  );
}
