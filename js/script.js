
const menuBtn = document.getElementById("js-menu-btn");
const navbar = document.getElementById("js-header__nav");
const imgHidden = document.getElementById("js-img-hidden");

// Función para alternar el menú de navegación en modo móvil
function toggleMenu() {
  if (menuBtn.classList.contains("fa-bars")) {
    menuBtn.classList.remove("fa-bars");
    menuBtn.classList.add("fa-xmark");
    navbar.classList.remove("hidden");
    navbar.classList.add("block");

  } else {
    menuBtn.classList.remove("fa-xmark");
    menuBtn.classList.add("fa-bars");
    navbar.classList.remove("block");
    navbar.classList.add("hidden");

  }
}
// Agrega un event listener al botón del menú para alternar el menú al hacer clic
menuBtn.addEventListener("click", toggleMenu);

//Maneja la redimención de pantalla pantalla, para asegurarse de que los elementos se muestren o no
function handleResize() {
  if (window.innerWidth >= 1024) {
    navbar.classList.add("block");
    navbar.classList.remove("hidden");
    menuBtn.classList.add("hidden");
    menuBtn.classList.remove("block");
    // Se asegura que el icono de menú se resetee para la vista de pantalla completa
    if (menuBtn.classList.contains("fa-xmark")) {
      menuBtn.classList.remove("fa-xmark");
      menuBtn.classList.add("fa-bars");
    }
  } else {
    navbar.classList.add("hidden");
    navbar.classList.remove("block");
    menuBtn.classList.add("block");
    menuBtn.classList.remove("hidden");
  }

  // Mostrar/ocultar la imagen según el ancho de la ventana
  if ((window.innerWidth >= 1560 && window.innerWidth <= 1954)
    || (window.innerWidth >= 768 && window.innerWidth <= 1164)) {
    imgHidden.classList.add("block");
    imgHidden.classList.remove("hidden");
  } else {
    imgHidden.classList.add("hidden");
    imgHidden.classList.remove("block");
  }
}

// Función de debounce para mejorar el rendimiento al manejar eventos de redimensionamiento
function debounce(func, wait = 50) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Agrega un event listener al evento de redimensionamiento de la ventana con debounce
window.addEventListener('resize', debounce(handleResize));

handleResize();