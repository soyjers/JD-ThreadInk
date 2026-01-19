document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ANIMACIÓN AL SCROLL (Reveal)
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Para activar los que ya se ven al cargar

    // 2. LIGHTBOX (Galería Funcional)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');

    if(lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if(img) {
                    lightboxImg.src = img.src; // Copia la ruta de la imagen
                    lightbox.classList.add('active');
                }
            });
        });

        // Cerrar al dar clic en la X o fuera de la imagen
        closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) lightbox.classList.remove('active');
        });
    }
});