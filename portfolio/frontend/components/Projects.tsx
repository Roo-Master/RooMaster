import Reveal from "./Reveal";
import { getProjects } from "@/lib/content";

export default async function Projects() {
  const projects = await getProjects();
  return (
    <Reveal as="section" id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project_cl">
        {projects.map((project) => (
          <Reveal as="div" className={`project${project.featured ? " featured" : ""}`} key={project.title}>
            {project.featured && <span className="featured-badge">Featured</span>}
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.impact && (
              <p className="project-impact">
                <i className="fa-solid fa-circle-check" /> {project.impact}
              </p>
            )}
            {project.tech.length > 0 && (
              <p className="project-tech">{project.tech.join(" · ")}</p>
            )}
            <div className="project-links">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-github" /> View code
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
