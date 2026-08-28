import Reveal from "./Reveal";

type ExperienceItem = {
  title: string;
  summary: string;
  tags: string[];
};

const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Full-Stack Development Projects",
    summary:
      "End-to-end applications including a University Management System for student, course, and exam data, and Campus Connect, a real-time student communication app.",
    tags: ["Java", "Flutter", "Python", "MySQL", "Firebase", "REST APIs", "MVC", "Git"],
  },
  {
    title: "Dark_coin E-Wallet Project",
    summary:
      "Cryptocurrency e-wallet for securely storing, sending, and receiving digital currency, with real-time currency exchange.",
    tags: ["Blockchain APIs", "Encryption", "Secure Auth", "Currency Exchange"],
  },
  {
    title: "Decentralized Fraud Detection System",
    summary:
      "Blockchain-based system for real-time transaction monitoring, with data validation and reporting dashboards.",
    tags: ["Smart Contracts", "Distributed Ledger", "Python Analytics"],
  },
  {
    title: "AgriTech Solution System",
    summary:
      "Mobile app for tracking crop health and market prices, with predictive analytics for actionable insights.",
    tags: ["Flutter", "Firebase", "REST APIs", "Predictive Analytics"],
  },
  {
    title: "Momentum — Focus & Skill-Building App",
    summary:
      "Android app for focused skill development: timed sessions, streak tracking, and session reflections.",
    tags: ["Kotlin", "Jetpack Compose", "Room", "MVVM", "WorkManager"],
  },
  {
    title: "Aurum — Hotel Reservation Platform",
    summary:
      "Hotel reservation platform for browsing availability and booking rooms, with reliable data handling across the reservation lifecycle.",
    tags: ["Booking Flow", "Data Handling" ," NextJs" , "NestJs", "Postgresql "],
  },
  {
    title: "SecureCybering",
    summary:
      "Cybersecurity-focused application built with secure coding practices and defensive design principles.",
    tags: ["Secure Coding", "Defensive Design"],
  },
  {
    title: "Wardrobe OS",
    summary:
      "Application for organizing and managing a digital wardrobe, with a practical UI and structured data model.",
    tags: ["UI Design", "Data Modeling"],
  },
  {
    title: "Hospital Clock-In System",
    summary:
      "Staff clock-in/clock-out system for hospital environments, supporting accurate time tracking and records.",
    tags: ["Time Tracking", "Record Management"],
  },
];

export default function Experience() {
  return (
    <Reveal as="section" id="experience" className="experience">
      <h2>Experience</h2>
      <div className="experience-grid">
        {EXPERIENCE.map((item) => (
          <Reveal as="div" className="exp" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <ul className="exp-tags">
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}