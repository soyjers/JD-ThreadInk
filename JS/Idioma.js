function setLanguage(lang) {
  fetch(`../JSON/${lang.toUpperCase()}.JSON`)
    .then(response => response.json())
    .then(data => {
      // Cambiar los textos según el archivo JSON
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
          el.innerHTML = data[key]; // Permite íconos <i>
        }
      });

      // Marcar el botón activo
      document.querySelectorAll('.ChangeLanguage button').forEach(btn => {
        btn.classList.remove('active-lang');
      });
      // Aquí se busca el botón correspondiente al idioma
      document.querySelector(`.ChangeLanguage button[onclick="setLanguage('${lang}')"]`)
        .classList.add('active-lang');

      // Guardar idioma en localStorage
      localStorage.setItem('language', lang);

      // Cambiar el atributo lang del <html>
      document.documentElement.lang = lang;
    });
}

// Cargar idioma guardado o inglés por defecto
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('language') || 'en'; // Inglés por defecto
  setLanguage(savedLang);
});
