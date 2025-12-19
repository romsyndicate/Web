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
// Exemplo de como adicionar ao final do conteúdo atual
const conteudoRedes = `
    <div class="redes-sociais" style="margin-top: 20px; display: flex; justify-content: center; gap: 20px;">
        <a href="https://github.com/bruninho182" target="_blank" style="color: white; text-decoration: none;">
            <i class="fa-brands fa-github" style="font-size: 24px;"></i>
        </a>
        <a href="https://discord.gg/ndfKxHRE" target="_blank" style="color: white; text-decoration: none;">
            <i class="fa-brands fa-discord" style="font-size: 24px;"></i>
        </a>
    </div>
`;

// Onde você define o final da página, você apenas concatena (soma):
app.innerHTML += conteudoRedes;