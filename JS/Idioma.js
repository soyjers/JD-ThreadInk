document.addEventListener('DOMContentLoaded', () => {
  // 1. Detectar idioma guardado o usar español por defecto
  const savedLang = localStorage.getItem('selectedLang') || 'es';
  setLanguage(savedLang);
});

async function setLanguage(lang) {
  try {
      // 2. Cargar el archivo JSON correspondiente
      // Asegúrate de que la ruta sea correcta desde donde se carga el HTML
      const response = await fetch(`JSON/${lang.toUpperCase()}.JSON`);
      
      if (!response.ok) {
          throw new Error(`No se pudo cargar el archivo de idioma: ${lang}`);
      }

      const translations = await response.json();

      // 3. Aplicar traducciones a todos los elementos con data-i18n
      document.querySelectorAll('[data-i18n]').forEach(element => {
          const key = element.getAttribute('data-i18n');
          if (translations[key]) {
              // Si es un input o textarea, cambiamos el placeholder
              if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                  element.placeholder = translations[key];
              } else {
                  // Si es texto normal
                  element.innerHTML = translations[key]; // innerHTML permite poner negritas <b> desde el JSON
              }
          }
      });

      // 4. Actualizar estado visual de los botones (La parte "chévere")
      updateActiveButton(lang);

      // 5. Guardar preferencia del usuario
      localStorage.setItem('selectedLang', lang);

      // Opcional: Cambiar el atributo lang del HTML para SEO
      document.documentElement.lang = lang;

  } catch (error) {
      console.error('Error cargando el idioma:', error);
  }
}

function updateActiveButton(lang) {
  // Quitamos la clase activa de TODOS los botones
  document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active-lang');
  });

  // Buscamos el botón que se clickeó (o el guardado)
  // Nota: Esto asume que el botón tiene onclick="setLanguage('es')"
  const activeBtn = document.querySelector(`.lang-btn[onclick*="'${lang}'"]`);
  if (activeBtn) {
      activeBtn.classList.add('active-lang');
  }
}

