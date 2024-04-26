//TO DO:
// -> Revisar que el header no cambie el display de algunos elementos cuando se recarga.
// -> Función para verificar el tamaño de pantalla.

// Evento que toma el elemnto de menú en modo movil, y cambia de ícono
const menuBtn = document.getElementById("js-menu-btn");
const navbar = document.getElementById("js-header__nav");

menuBtn.addEventListener("click", () => {
  if (menuBtn.classList.contains("fa-bars")) {
    menuBtn.classList.remove("fa-bars");
    menuBtn.classList.add("fa-xmark");

    navbar.style.display = "block";
  } else {
    menuBtn.classList.remove("fa-xmark");
    menuBtn.classList.add("fa-bars");

    navbar.style.display = "none";
  }
});

//Evento y función para verificar el tamaño de pantalla, ya que algunos elementos no respetan el display al recargar.
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    navbar.style.display = "inline-flex";
    menuBtn.style.display = "none";
  } else{
    navbar.style.display = "none";
    menuBtn.style.display = "block";
  }
});