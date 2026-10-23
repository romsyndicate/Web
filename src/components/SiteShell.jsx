import { useState } from 'react';

export function Header({ active = 'home' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Navegação principal">
        <a className="brand" href="/index.html" aria-label="ROM SYNDICATE — início"><img src="/assets/img/logo/logo-full-transparent.png" alt="ROM SYNDICATE — Traduções de fã para fã" /></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}><i className={`fa-solid fa-${menuOpen ? 'xmark' : 'bars'}`} /></button>
        <ul id="site-menu" className={`site-menu ${menuOpen ? 'open' : ''}`}>
          <li><a className={active === 'home' ? 'active' : ''} href="/index.html">Início</a></li><li><a href="/index.html#projetos">Projetos</a></li><li><a className={active === 'about' ? 'active' : ''} href="/sobre.html">A equipe</a></li>
          <li><a href="https://github.com/ROM-SYNDICATE" target="_blank" rel="noreferrer">GitHub <i className="fa-solid fa-arrow-up-right-from-square external-icon" /></a></li>
        </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  return <footer className="site-footer"><a className="footer-brand" href="/index.html">ROM <b>SYNDICATE</b></a><p>Feito por fãs, para fãs. A nostalgia também fala português.</p><div className="footer-social"><a href="https://github.com/ROM-SYNDICATE" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fa-brands fa-github" /></a><a href="https://discord.com/invite/j9WG5ceJ" target="_blank" rel="noreferrer" aria-label="Discord"><i className="fa-brands fa-discord" /></a></div><small>© 2025 ROM SYNDICATE <span>·</span> TODOS OS DIREITOS DOS JOGOS PERTENCEM AOS SEUS CRIADORES</small></footer>;
}

export function SiteShell({ children, active }) { return <><Header active={active} />{children}<Footer /></>; }

