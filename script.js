document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll('.progresso-bar');

    // Define um pequeno delay para a animação começar após o carregamento
    setTimeout(() => {
        progressBars.forEach(bar => {
            // Obtém a percentagem que definiste no HTML (estilo inline)
            const targetWidth = bar.style.width;
            
            // Começa a barra do zero e depois anima até o alvo
            bar.style.width = '0%';
            
            // Força um reflow para o browser perceber a mudança
            bar.getBoundingClientRect();
            
            // Define a largura final com uma transição suave
            bar.style.transition = 'width 1.5s cubic-bezier(0.1, 0.5, 0.5, 1)';
            bar.style.width = targetWidth;
        });
    }, 300);
});

// Espera o documento carregar
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgExpanded");
    const closeBtn = document.querySelector(".close");

    // Seleciona todas as imagens da galeria
    const images = document.querySelectorAll(".galeria img");

    images.forEach(img => {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    });

    // Fechar ao clicar no X
    closeBtn.onclick = () => modal.style.display = "none";

    // Fechar ao clicar fora da imagem
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});