// Espera a que todo el contenido del HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

  // --- Lógica del Modal de Bienvenida ---

  const modal = document.getElementById('welcome-modal');
  const modalLinks = document.querySelectorAll('.modal-link');
  const closeModalBtn = document.getElementById('modal-close-btn');

  // Si no existe el modal, no hacemos nada
  if (!modal) return;

  // 1. Mostrar el modal al cargar la página
  // Usamos un pequeño retraso para que la animación se vea bien
  setTimeout(() => {
    modal.classList.add('visible');
  }, 500); // Medio segundo

  // Función para cerrar el modal
  function closeModal() {
    modal.classList.remove('visible');
  }

  // 2. Asignar evento a los botones de opción (Pendrives, Destrabar, etc.)
  modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Previene el salto brusco del link
      
      const targetId = link.getAttribute('href'); // Obtiene el ID (ej: "#pendrives")
      const targetElement = document.querySelector(targetId);

      // Cierra el modal
      closeModal();

      // Hace scroll suave a la sección
      if (targetElement) {
        // Usamos un pequeño retraso para que el modal se cierre primero
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300); // 300ms, coincide con la transición de CSS
      }
    });
  });

  // 3. Asignar evento al botón de cerrar (la 'X')
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  // 4. (Opcional) Cerrar el modal si se hace clic fuera de él
  modal.addEventListener('click', (e) => {
    // Si el clic fue en el fondo (overlay) y no en el contenido
    if (e.target === modal) {
      closeModal();
    }
  });

});