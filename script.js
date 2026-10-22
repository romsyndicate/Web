document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.site-menu');

    if (menuButton && menu) {
        menuButton.addEventListener('click', () => {
            const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!isOpen));
            menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
            menu.classList.toggle('open', !isOpen);
            menuButton.innerHTML = `<i class="fa-solid fa-${isOpen ? 'bars' : 'xmark'}"></i>`;
        });

        menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            menu.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Abrir menu');
            menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }));
    }

    const filterButtons = document.querySelectorAll('.filter-button');
    const projects = document.querySelectorAll('.project-card');
    filterButtons.forEach(button => button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach(item => {
            const selected = item === button;
            item.classList.toggle('selected', selected);
            item.setAttribute('aria-pressed', String(selected));
        });
        projects.forEach(project => {
            project.hidden = filter !== 'all' && project.dataset.status !== filter;
        });
    }));
});
