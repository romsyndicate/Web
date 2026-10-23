import { useEffect, useState } from 'react';
import { projectById } from '../data/projects.js';
import { SiteShell } from '../components/SiteShell.jsx';

export default function ProjectPage({ id }) {
  const project = projectById[id];
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (expandedIndex === null) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') setExpandedIndex(null);
      if (event.key === 'ArrowLeft') setExpandedIndex((index) => (index - 1 + project.screenshots.length) % project.screenshots.length);
      if (event.key === 'ArrowRight') setExpandedIndex((index) => (index + 1) % project.screenshots.length);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [expandedIndex, project]);

  if (!project) return <SiteShell><main className="container-projeto"><h1>Projeto não encontrado</h1><a className="project-link" href="/index.html#projetos">Voltar para projetos</a></main></SiteShell>;

  const activeImage = expandedIndex === null ? null : project.screenshots[expandedIndex];
  const moveImage = (direction) => setExpandedIndex((index) => (index + direction + project.screenshots.length) % project.screenshots.length);
  const uniqueCreditNames = [...new Set(project.credits.map(([, name]) => name))];

  return <SiteShell><main className="container-projeto detail-page">
    <section className="projeto-header"><a className="back-link" href="/index.html#projetos"><i className="fa-solid fa-arrow-left" /> Voltar aos projetos</a><h1>{project.title}</h1><p>Plataforma: {project.platform} <span>·</span> {project.release === 'Em andamento' || project.release === 'Pausado' || project.release === 'Em planejamento' ? project.release : `Lançamento da tradução: ${project.release}`}</p></section>
    <div className="detail-layout"><section className="detail-main"><h2>Screenshots</h2><div className="detail-gallery">{project.screenshots.map((image, index) => <button type="button" key={image} onClick={() => setExpandedIndex(index)} aria-label={`Ampliar captura de tela ${index + 1}`}><img src={image} alt={`${project.title} — captura de tela ${index + 1}`} loading="lazy" /></button>)}</div>
      {project.video && <div className="video-frame"><iframe src={project.video} title={`Vídeo de ${project.title}`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>}
      <h2>Sobre a tradução</h2><p className="detail-description">{project.description}</p>
    </section><aside><div className="detail-status"><h2>Status do projeto</h2>{project.progressDetails.length ? project.progressDetails.map(([label, value]) => <div className="detail-metric" key={label}><div className="progresso-info"><span>{label}</span><span>{value}%</span></div><div className="progresso-container"><div className="progresso-bar" style={{ width: `${value}%` }} /></div></div>) : <p className="detail-credits">O projeto está em produção. O progresso detalhado será atualizado em breve.</p>}<hr /><p className="detail-credits"><strong>Créditos:</strong><br />{uniqueCreditNames.join(', ')}</p>{project.download ? <a className="btn" href={project.download} download>Baixar tradução <i className="fa-solid fa-download" /></a> : <span className="btn unavailable">Tradução em andamento</span>}</div></aside></div>
    {project.download && <section className="instrucoes"><h2><i className="fa-solid fa-gears" /> Como aplicar o patch</h2><ol><li>Tenha uma cópia original do jogo e confira se a região corresponde à indicada no projeto.</li><li>Baixe o arquivo de tradução disponibilizado acima.</li><li>Use uma ferramenta de patching, como o <a href="https://www.romhacking.net/patch/" target="_blank" rel="noreferrer">Romhacking.net Patcher</a> ou o Floating IPS (Flips).</li><li>Selecione a cópia do jogo e o patch na ferramenta, e aplique a tradução.</li><li>Carregue o arquivo gerado no seu emulador favorito.</li></ol><p className="patch-warning"><i className="fa-solid fa-triangle-exclamation" /> <strong>Atenção:</strong> Não distribua cópias de jogos. Compartilhe apenas o patch.</p></section>}
    <section className="credits-section"><h2>Créditos &amp; ferramentas</h2><div className="credits-grid"><div><h3><i className="fa-solid fa-users" /> Equipe</h3><ul>{project.credits.map(([role, name]) => <li key={role}><strong>{role}:</strong> {name}</li>)}</ul></div><div><h3><i className="fa-solid fa-screwdriver-wrench" /> Ferramentas</h3><ul>{project.tools.length ? project.tools.map(([label, tool]) => <li key={label}><strong>{label}:</strong> {tool}</li>) : <li>Informações em atualização</li>}</ul></div></div><p className="thanks-note">Obrigado a todos que ajudam a manter os jogos clássicos vivos.</p></section>
  </main>{activeImage && <div className="modal" role="dialog" aria-modal="true" aria-label={`Captura de tela ${expandedIndex + 1} de ${project.screenshots.length}`} onClick={() => setExpandedIndex(null)}><button className="close" type="button" aria-label="Fechar imagem" onClick={() => setExpandedIndex(null)}>&times;</button><button className="lightbox-nav previous" type="button" aria-label="Imagem anterior" onClick={(event) => { event.stopPropagation(); moveImage(-1); }}><i className="fa-solid fa-chevron-left" /></button><img className="modal-content" src={activeImage} alt={`Captura de tela ${expandedIndex + 1} de ${project.title}`} onClick={(event) => event.stopPropagation()} /><button className="lightbox-nav next" type="button" aria-label="Próxima imagem" onClick={(event) => { event.stopPropagation(); moveImage(1); }}><i className="fa-solid fa-chevron-right" /></button><span className="lightbox-count">{expandedIndex + 1} / {project.screenshots.length}</span></div>}</SiteShell>;
}

