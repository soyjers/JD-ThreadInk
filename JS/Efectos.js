document.addEventListener('DOMContentLoaded', () => {

    // 1. ANIMACIÓN DE ENTRADA (OPTIMIZADA)
    // Usamos IntersectionObserver para que el navegador no calcule nada hasta que el elemento sea visible.
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Se activa apenas se ve un 10% del elemento
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Deja de vigilar una vez animado (Ahorra MUCHA memoria)
            }
        });
    }, observerOptions);

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    // 2. LIGHTBOX (Galería Funcional)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                }
            });
        });

        closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }
});