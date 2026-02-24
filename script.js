// 1. Lógica da Contagem Regressiva (Agora com Segundos)
const congressDate = new Date(2026, 5, 12, 19, 0, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = congressDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "<div class='time-box' style='animation:popIn 0.5s forwards'><span>COMEÇOU!</span></div>";
        return;
    }

    document.getElementById("days").innerText = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
    document.getElementById("hours").innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    document.getElementById("minutes").innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    document.getElementById("seconds").innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();


// 2. Efeito Digitando no Título (Typewriter Effect)
const titleEl = document.getElementById('typing-title');
const textPart1 = "UNAADEB ";
const textPart2 = "2K26";
let i = 0;
let j = 0;

function typeWriter() {
    if (i < textPart1.length) {
        titleEl.innerHTML += textPart1.charAt(i);
        i++;
        setTimeout(typeWriter, 120); // Velocidade de digitação da primeira parte
    } else if (i === textPart1.length) {
        // Cria o span para o 2K26 com a cor de destaque
        titleEl.innerHTML += "<span id='highlight-text' class='highlight-text'></span>";
        i++;
        setTimeout(typeWriter, 120);
    } else if (j < textPart2.length) {
        document.getElementById('highlight-text').innerHTML += textPart2.charAt(j);
        j++;
        setTimeout(typeWriter, 150); // Velocidade um pouco mais lenta para dar peso ao "2K26"
    }
}

// Inicia a digitação 500ms após a tela carregar
setTimeout(typeWriter, 500);


// 3. Animação de Scroll (Fade In)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
// 4. Lógica de Abrir/Fechar a Lista de Igrejas
const btnIgrejas = document.getElementById('btn-igrejas');
const listaIgrejas = document.getElementById('lista-igrejas');

if (btnIgrejas && listaIgrejas) {
    btnIgrejas.addEventListener('click', () => {
        if (listaIgrejas.classList.contains('igrejas-hidden')) {
            listaIgrejas.classList.remove('igrejas-hidden');
            listaIgrejas.classList.add('igrejas-visible');
        } else {
            listaIgrejas.classList.remove('igrejas-visible');
            listaIgrejas.classList.add('igrejas-hidden');
        }
    });
}