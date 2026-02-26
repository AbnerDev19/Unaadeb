const congressDate = new Date(2026, 5, 4, 19, 0, 0).getTime();

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
        setTimeout(typeWriter, 120);
    } else if (i === textPart1.length) {
        titleEl.innerHTML += "<span id='highlight-text' class='highlight-text'></span>";
        i++;
        setTimeout(typeWriter, 120);
    } else if (j < textPart2.length) {
        document.getElementById('highlight-text').innerHTML += textPart2.charAt(j);
        j++;
        setTimeout(typeWriter, 150);
    }
}

setTimeout(typeWriter, 500);


// 3. Animação de Scroll (Fade In)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// 4. Lógica de Abrir/Fechar a Lista de Igrejas (Animação Suave)
const btnIgrejas = document.getElementById('btn-igrejas');
const wrapperIgrejas = document.getElementById('wrapper-igrejas');

if (btnIgrejas && wrapperIgrejas) {
    btnIgrejas.addEventListener('click', () => {
        wrapperIgrejas.classList.toggle('open');
        
        // Acompanha a descida da lista na tela
        if(wrapperIgrejas.classList.contains('open')){
            setTimeout(() => {
                wrapperIgrejas.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    });
}


// 5. Lógica do Modal de Pedido de Camisa para o WhatsApp
const btnComprarCamisa = document.getElementById('btn-comprar-camisa');
const modalCamisa = document.getElementById('modal-camisa');
const closeModal = document.getElementById('close-modal');
const formCamisa = document.getElementById('form-camisa');

// ATENÇÃO: COLOQUE O NÚMERO AQUI (DDI + DDD + Numero. Ex: 5561999999999)
const numeroLider = "5561900000000"; 

if (btnComprarCamisa && modalCamisa) {
    // Abrir Modal
    btnComprarCamisa.addEventListener('click', (e) => {
        e.preventDefault();
        modalCamisa.classList.add('active');
    });

    // Fechar Modal no "X"
    closeModal.addEventListener('click', () => {
        modalCamisa.classList.remove('active');
    });

    // Fechar ao clicar na área escura fora do modal
    modalCamisa.addEventListener('click', (e) => {
        if (e.target === modalCamisa) {
            modalCamisa.classList.remove('active');
        }
    });

    // Enviar dados para o WhatsApp
    formCamisa.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('pedido-nome').value;
        const tamanho = document.getElementById('pedido-tamanho').value;
        const igreja = document.getElementById('pedido-igreja').value;
        
        // Monta o texto que vai chegar no Zap do líder
        const mensagem = `Olá, a paz do Senhor! 🙏\n\nGostaria de encomendar a camisa *UNAADEB 2K26*.\n\n*👤 Nome:* ${nome}\n*📏 Tamanho:* ${tamanho}\n*⛪ Congregação:* ${igreja}\n\nAguardo as instruções de pagamento!`;
        
        // Codifica o texto para formato de link do WhatsApp
        const urlWhatsApp = `https://wa.me/${numeroLider}?text=${encodeURIComponent(mensagem)}`;
        
        // Abre o WhatsApp e fecha o modal no site
        window.open(urlWhatsApp, '_blank');
        modalCamisa.classList.remove('active');
        formCamisa.reset();
    });
}
// =========================================
// 7. Lógica do Carrossel Arrastável (Camisas)
// =========================================
const track = document.getElementById('shirt-track');
const indicators = document.querySelectorAll('.carousel-indicator');

if (track && indicators.length > 0) {
    // Atualiza a bolinha ativa conforme o usuário arrasta (scroll)
    track.addEventListener('scroll', () => {
        const scrollLeft = track.scrollLeft;
        const itemWidth = track.clientWidth;
        const index = Math.round(scrollLeft / itemWidth);

        indicators.forEach((ind, i) => {
            if (i === index) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    });

    // Permite clicar na bolinha para ir até a foto correspondente
    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const itemWidth = track.clientWidth;
            track.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth'
            });
        });
    });
}