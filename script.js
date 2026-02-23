// 6) Lógica da Contagem Regressiva Robusta
const congressDate = new Date(2026, 5, 12, 19, 0, 0).getTime(); // 12 de Junho de 2026 às 19:00

function updateCountdown() {
    const now = new Date().getTime();
    const distance = congressDate - now;
    const container = document.getElementById("countdown-container");

    if (distance < 0) {
        // Estado após a data chegar
        container.innerHTML = `
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: var(--card-bg); border-radius: 8px; border: 1px solid var(--accent-color);">
                <h3 style="font-size: 2.5rem; color: var(--accent-color); margin-bottom: 10px;">COMEÇOU!</h3>
                <p style="font-size: 1.1rem; margin-bottom: 25px;">Seja bem-vindo ao maior congresso da nossa geração.</p>
                <a href="#congresso" class="btn btn-primary" style="display: inline-block;">Ver a Programação</a>
            </div>
        `;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// 5) Lógica da Galeria com Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

// Abre a imagem selecionada
function openLightbox(imgSrc, caption) {
    lightbox.style.display = "flex";
    lightboxImg.src = imgSrc;
    lightboxCaption.innerText = caption;
}

// Fecha o lightbox
function closeLightbox() {
    lightbox.style.display = "none";
}

// Fecha ao clicar no fundo escuro fora da imagem
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// 9) Acessibilidade: Fecha o lightbox com a tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
        closeLightbox();
    }
});


// 11) Microanimações (Fade-in ao rolar a página)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Dispara quando 15% do elemento está na tela
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Impede que repita a animação subindo a tela
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
});