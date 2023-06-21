window.addEventListener('load', function() {
    const enlacesNav = document.querySelectorAll('nav a');
   
   enlacesNav.forEach(function(enlace) {
      enlace.addEventListener('click', function(evento) {
        evento.preventDefault();
  
       const seccionId = this.getAttribute('href').substring(1);
  
      mostrarSeccion(seccionId);
       
      });
    });
  
   mostrarSeccion('principal'); 
  });
  
  function mostrarSeccion(section){
    const secciones = document.querySelectorAll('section');
   for(const seccion of secciones) seccion.style.display = 'none';
   console.log(section);
  document.getElementById(section).style.display = 'block';
   
  }