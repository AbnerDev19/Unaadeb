const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(element) {
    const imgSrc = element.querySelector('img').src;
    lightbox.style.display = "flex";
    lightboxImg.src = imgSrc;
}

function closeLightbox() {
    lightbox.style.display = "none";
}

// Fechar ao clicar fora da imagem
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
});

// Fechar com a tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") closeLightbox();
});