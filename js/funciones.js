// Luego de la carga del HTML busca los section para mostrar y ocultar
document.addEventListener('DOMContentLoaded', function() {
    const enlacesNav = document.querySelectorAll('nav a');
  
   enlacesNav.forEach(function(enlace) {
      enlace.addEventListener('click', function(evento) {
        evento.preventDefault();
  
       const seccionId = this.getAttribute('href').substring(1);
  
       const secciones = document.querySelectorAll('section');
  
        // Recorre las secciones y las muestra ocultando al resto
        secciones.forEach(function(seccion) {
          if (seccion.id === seccionId) {
            seccion.style.display = 'block'; 
          } else {
            seccion.style.display = 'none'; 
          }
        });
      });
    });
  
    // Muestra la sección 'Principal' al inicio y oculta el resto
    const secciones = document.querySelectorAll('section');
    secciones.forEach(function(seccion) {
      if (seccion.id === 'principal') {
        seccion.style.display = 'block'; 
      } else {
        seccion.style.display = 'none'; 
      }
    });
  });