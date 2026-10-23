import React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import { projectById } from './data/projects.js';
import '../style.css';

const path = window.location.pathname;
const projectMatch = path.match(/\/assets\/Projetos\/([^/]+)\.html$/i);
const projectId = projectMatch?.[1];

if (projectId) {
  const projectTitle = projectById[projectId]?.title ?? projectId;
  document.title = `${projectTitle} | ROM SYNDICATE`;
} else if (path.endsWith('/sobre.html')) {
  document.title = 'A equipe — ROM SYNDICATE';
} else {
  document.title = 'ROM SYNDICATE — Traduções de fã para fã';
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {projectId ? <ProjectPage id={projectId} /> : path.endsWith('/sobre.html') ? <AboutPage /> : <HomePage />}
  </React.StrictMode>,
);
