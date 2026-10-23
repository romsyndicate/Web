# ROM SYNDICATE — Traduções de fã para fã

Site da equipe ROM SYNDICATE para divulgar e preservar traduções de jogos clássicos.

## Tecnologias

- React para construir a interface em componentes reutilizáveis.
- Vite para desenvolvimento local e build de produção.
- CSS responsivo para desktop e celular.

## Executar localmente

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

O Vite mostrará o endereço local para abrir no navegador.

## Gerar versão de produção

```bash
npm run build
npm run preview
```

Os arquivos prontos para publicação são gerados em `dist/`.

## Organização

- `src/components/`: navegação e rodapé compartilhados.
- `src/pages/`: página inicial, equipe e detalhes de projetos.
- `src/data/projects.js`: catálogo central de traduções, progresso, imagens e arquivos disponíveis.
- `assets/`: capas, capturas de tela, arquivos de tradução e imagens da equipe.
- `assets/Projetos/*.html`: entradas React que preservam os endereços usados pelos detalhes dos projetos.
- `vite.config.js`: configuração multipágina e cópia dos assets existentes para o build.

Os detalhes dos jogos reutilizam um único componente React e recebem seus dados pelo identificador presente no endereço. Os endereços existentes, como `/assets/Projetos/thps3gba.html`, continuam disponíveis no site publicado.
