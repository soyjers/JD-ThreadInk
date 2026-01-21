document.addEventListener('DOMContentLoaded', () => {

    // ... (Tu código de IntersectionObserver para animaciones) ...
    // Usamos IntersectionObserver para que el navegador no calcule nada hasta que el elemento sea visible.
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));


    // --- LÓGICA DEL LIGHTBOX ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    // Asegúrate de que esta clase coincida con tu HTML (.gallery-item)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Buscamos la imagen dentro del item clickeado
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active'); // Esto activa el CSS display: flex
                }
            });
        });

        // Cerrar al dar click en la X
        if(closeBtn) {
            closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
        }

        // Cerrar al dar click fuera de la imagen (en el fondo negro)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }
});