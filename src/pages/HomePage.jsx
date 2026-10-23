import { useMemo, useState } from 'react';
import { projects } from '../data/projects.js';
import { SiteShell } from '../components/SiteShell.jsx';

const filters = [{ id: 'all', label: 'Todos' }, { id: 'done', label: 'Disponíveis' }, { id: 'progress', label: 'Em andamento' }, { id: 'paused', label: 'Pausados' }];

function ProjectCard({ project }) {
  const details = `/assets/Projetos/${project.id}.html`;
  return <article className="project-card">
    <a className="cover-link" href={details} aria-label={`Ver detalhes de ${project.title}`}><img src={project.cover} alt={`Capa de ${project.title}`} loading="lazy" /><span className={`status-pill ${project.status}`}><i />{project.statusLabel}</span></a>
    <div className="project-info"><p className="platform-label">{project.shortPlatform}{project.year && <> <span>·</span> {project.year}</>}</p><h3>{project.title}</h3>{project.progress === null ? <div className="progress-label"><span>Tradução em produção</span><b>Em breve</b></div> : <><div className="progress-label"><span>{project.progress === 100 ? 'Tradução concluída' : 'Progresso geral'}</span><b>{project.progress}%</b></div><div className="progress-track"><span style={{ '--progress': `${project.progress}%` }} /></div></>}<a className="project-link" href={details}>Ver projeto <i className="fa-solid fa-arrow-right" /></a></div>
  </article>;
}

export default function HomePage() {
  const [filter, setFilter] = useState('all');
  const [platform, setPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const visibleProjects = useMemo(() => {
    const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
    const query = normalize(searchQuery.trim());
    return projects.filter((project) => {
      const matchesStatus = filter === 'all' || project.status === filter;
      const matchesPlatform = platform === 'all'
        || (platform === 'gba' && project.platform.toLowerCase().includes('advance'))
        || (platform === 'gbc' && project.platform.toLowerCase().includes('game boy'))
        || (platform === 'ps1' && project.platform.toLowerCase().includes('playstation'));
      const matchesSearch = !query || normalize(`${project.title} ${project.platform} ${project.shortPlatform}`).includes(query);
      return matchesStatus && matchesPlatform && matchesSearch;
    });
  }, [filter, platform, searchQuery]);
  const clearFilters = () => { setFilter('all'); setPlatform('all'); setSearchQuery(''); };
  const featured = projects[0];
  return <SiteShell active="home"><main>
    <section className="hero"><div className="hero-grid" /><div className="hero-inner">
      <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> PRESERVANDO CLÁSSICOS, UM PIXEL DE CADA VEZ</p><h1>Grandes jogos.<br /><span>Com a nossa cara!</span></h1><p className="hero-lede">A gente acredita que uma boa história merece ser entendida. Traduzimos clássicos dos videogames com cuidado, respeito e paixão.</p><div className="hero-actions"><a className="button button-primary" href="#projetos">Explorar projetos <i className="fa-solid fa-arrow-down" /></a><a className="button button-quiet" href="/sobre.html">Conheça a equipe <i className="fa-solid fa-arrow-right" /></a></div><div className="hero-meta"><span><i className="fa-solid fa-gamepad" /> GBA · GBC · PS1</span><span><i className="fa-solid fa-heart" /> Feito por fãs</span></div></div>
      <div className="hero-art" aria-label={`Capa do projeto ${featured.title}`}><div className="art-frame"><img src={featured.cover} alt={`Capa da tradução de ${featured.title}`} /><span className="art-tag"><i className="fa-solid fa-star" /> DESTAQUE</span></div><div className="art-caption"><span>PROJETO EM DESTAQUE</span><strong>{featured.title}</strong><small>{featured.platform.toUpperCase()} <i className="fa-solid fa-circle-check" /> 100% TRADUZIDO</small></div><span className="pixel-cross cross-one">✳</span><span className="pixel-cross cross-two">✳</span></div>
    </div><div className="hero-bottom"><span>INSERINDO MEMÓRIAS NO CARTUCHO...</span><span>▼</span><span>SCROLL PARA CONTINUAR</span></div></section>
    <section className="projects-section" id="projetos"><div className="section-heading"><div><p className="eyebrow">NOSSO ACERVO <span className="heading-line" /></p><h2>Projetos <span>em cartaz</span></h2><p className="section-intro">Traduções feitas com carinho para você revisitar seus jogos favoritos.</p></div><div className="project-count"><strong>{String(projects.length).padStart(2, '0')}</strong><span>JOGOS<br />NO ACERVO</span></div></div>
      <div className="catalog-tools">
        <label className="catalog-search"><i className="fa-solid fa-magnifying-glass" aria-hidden="true" /><span className="sr-only">Buscar jogo ou plataforma</span><input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Buscar por jogo ou plataforma..." /></label>
        <label className="catalog-platform"><span className="sr-only">Filtrar por plataforma</span><select value={platform} onChange={(event) => setPlatform(event.target.value)}><option value="all">Todas as plataformas</option><option value="gba">Game Boy Advance</option><option value="gbc">Game Boy / Color</option><option value="ps1">PlayStation</option></select><i className="fa-solid fa-chevron-down" aria-hidden="true" /></label>
      </div>
      <div className="filters" role="group" aria-label="Filtrar projetos">{filters.map((item) => <button key={item.id} className={`filter-button ${filter === item.id ? 'selected' : ''}`} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}{item.id === 'all' && <span>{String(projects.length).padStart(2, '0')}</span>}</button>)}</div>
      {visibleProjects.length > 0 ? <div className="project-grid">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <div className="empty-results"><i className="fa-solid fa-ghost" aria-hidden="true" /><h3>Nenhum jogo encontrado</h3><p>Tente outro nome ou ajuste os filtros para explorar o acervo.</p><button className="button button-primary" type="button" onClick={clearFilters}>Limpar filtros</button></div>}</section>
    <section className="community-band"><div className="community-mark"><i className="fa-solid fa-gamepad" /></div><div><p className="eyebrow">A COMUNIDADE FAZ PARTE</p><h2>Curte retrô? <span>Chega junto.</span></h2><p>Troque ideia, acompanhe os projetos e ajude a manter esses clássicos vivos.</p></div><a className="button button-primary" href="https://discord.com/invite/j9WG5ceJ" target="_blank" rel="noreferrer">Entrar no Discord <i className="fa-brands fa-discord" /></a></section>
  </main></SiteShell>;
}
