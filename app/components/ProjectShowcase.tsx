"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { Project } from "../data/home";

type ThemeStyle = CSSProperties & {
  "--project-frame": string;
  "--project-canvas": string;
  "--project-ink": string;
  "--project-accent": string;
};

function themeStyle(project: Project): ThemeStyle {
  return {
    "--project-frame": project.theme.frame,
    "--project-canvas": project.theme.canvas,
    "--project-ink": project.theme.ink,
    "--project-accent": project.theme.accent,
  };
}

function projectAlt(project: Project, viewport: "desktop" | "mobile") {
  return `Página inicial na versão ${viewport} do site de ${project.name}, desenvolvido pela JP Creative`;
}

function ProjectMedia({ project, eager = false }: { project: Project; eager?: boolean }) {
  return (
    <div className="project-media">
      <div className="project-desktop-shot">
        <Image src={project.desktopScreenshot} alt={projectAlt(project, "desktop")} sizes="(min-width: 1280px) 590px, (min-width: 1025px) 45vw, 1px" loading={eager ? "eager" : "lazy"} />
      </div>
      <div className="project-mobile-shot">
        <Image src={project.mobileScreenshot} alt={projectAlt(project, "mobile")} sizes="(min-width: 1025px) 130px, 1px" loading={eager ? "eager" : "lazy"} />
      </div>
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="project-meta">
      <p>{project.category}</p>
      <h3>{project.name}</h3>
      <span>{project.description}</span>
      {project.quote && <blockquote>“{project.quote}”</blockquote>}
      <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver projeto ${project.name} em uma nova aba`}>
        Ver projeto <i className="bi bi-arrow-up-right" aria-hidden="true" />
      </a>
    </div>
  );
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(1);

  return (
    <>
      <div className="project-showcase" aria-label="Seleção de projetos">
        {projects.map((project, index) => {
          const isActive = index === active;
          const panelId = `project-panel-${project.slug}`;
          return (
            <article className={isActive ? "project-panel is-active" : "project-panel"} style={themeStyle(project)} key={project.slug} onClick={() => setActive(index)}>
              <Image className="project-panel-backdrop" src={project.desktopScreenshot} alt="" fill sizes="96px" aria-hidden="true" />
              <button className="project-tab" type="button" aria-expanded={isActive} aria-controls={panelId} aria-label={`Selecionar projeto ${project.name}`} onClick={() => setActive(index)}>
                <span>0{index + 1}</span><strong>{project.name}</strong><i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
              <div className="project-panel-content" id={panelId} aria-hidden={!isActive}>
                <div className="project-visual"><ProjectMedia project={project} eager={index === 1} /></div>
                <ProjectMeta project={project} />
              </div>
            </article>
          );
        })}
      </div>

      <div className="project-mobile-list">
        {projects.map((project, index) => (
          <article className="project-mobile-card" style={themeStyle(project)} key={project.slug}>
            <div className="project-mobile-index">Projeto 0{index + 1}</div>
            <div className="project-mobile-media">
              <Image src={project.mobileScreenshot} alt={projectAlt(project, "mobile")} sizes="(max-width: 767px) 82vw, (max-width: 1024px) 42vw, 1px" />
            </div>
            <ProjectMeta project={project} />
          </article>
        ))}
      </div>
    </>
  );
}
