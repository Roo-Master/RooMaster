import Reveal from "./Reveal";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <Reveal as="section" id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project_cl">
        {projects.map((project) => (
          <Reveal as="div" className="project" key={project.title}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-links">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-github" /> Code
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "12px" }}
                >
                  <i className="fa-solid fa-arrow-up-right-from-square" /> Live demo
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}
