
const menuBtn = document.getElementById("js-menu-btn");
const navbar = document.getElementById("js-header-nav");
const imgHiddenOne = document.getElementById("js-img-hidden-one");
const imgHiddenTwo = document.getElementById("js-img-hidden-two");
const imgHiddenThree = document.getElementById("js-img-hidden-three");

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
//Se agregan comporbaciones de existencia de elementos, para no provocar errores en consola
//cuando se esta en otra página
if (menuBtn && navbar) {
  menuBtn.addEventListener("click", toggleMenu);
}


//Maneja la redimención de pantalla pantalla, para asegurarse de que los elementos se muestren o no
function handleResize() {
  if (navbar && menuBtn) {
    if (window.innerWidth >= 1024) {
      navbar.classList.add("block");
      navbar.classList.remove("hidden");
      
      menuBtn.style.display = "none";
      // Se asegura que el icono de menú se resetee para la vista de pantalla completa
      if (menuBtn.classList.contains("fa-xmark")) {
        menuBtn.classList.remove("fa-xmark");
        menuBtn.classList.add("fa-bars");
      }
    } else {
      navbar.classList.add("hidden");
      navbar.classList.remove("block");
      
      menuBtn.style.display="block"
      
    }
  }


  // Mostrar/ocultar las imágenes según el ancho de la ventana
  if (imgHiddenOne && imgHiddenTwo && imgHiddenThree) {
    if (window.innerWidth >= 1995 && window.innerWidth <= 2399) {
      imgHiddenOne.classList.add("hidden");
      imgHiddenOne.classList.remove("block");

    } else {
      imgHiddenOne.classList.add("block");
      imgHiddenOne.classList.remove("hidden");
    }

    if ((window.innerWidth >= 1590 && window.innerWidth <= 1994)
      || (window.innerWidth >= 1995 && window.innerWidth <= 2399)) {
      imgHiddenTwo.classList.add("hidden");
      imgHiddenTwo.classList.remove("block");
      imgHiddenThree.classList.add("hidden");
      imgHiddenThree.classList.remove("block");
    } else {
      imgHiddenTwo.classList.add("block");
      imgHiddenTwo.classList.remove("hidden");
      imgHiddenThree.classList.add("block");
      imgHiddenThree.classList.remove("hidden");
    }
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

const cats = [
  {
    nombre: "chapi",
    raza: "PAC (Puro Amor de Gato)",
    edad: "5 años",
    peso: "8.5kg",
    descripcion: "Chapi es un adorable gato tuxedo, muy cariñoso y disfruta de la compañía humana. Le encanta acurrucarse y recibir mimos. Siempre está explorando y mostrando interés por su entorno. Su naturaleza curiosa lo mantiene entretenido y ocupado. Dado a su curiosidad es muy importante mantener tus alimentos bien vigilados, si no quieres que este pequeño travieso se coma tu merienda.",
    imagen: "../assets/images/cat-1.webp"
  },
  {
    nombre: "mimi",
    raza: "Siamés",
    edad: "3 años",
    peso: "4.2kg",
    descripcion: "Mimi es una gata siamesa elegante y juguetona. Le encanta perseguir juguetes y explorar su entorno. Es muy curiosa y siempre está buscando nuevas aventuras. Además, es muy cariñosa y disfruta de pasar tiempo con los clientes.",
    imagen: "../assets/images/cat-2.webp"
  },
  {
    nombre: "tom",
    raza: "Persa",
    edad: "2 años",
    peso: "6.0kg",
    descripcion: "Tom es un gato persa tranquilo y relajado. Le gusta descansar en lugares cómodos y disfrutar de la tranquilidad del los rincones del café. Es muy sociable y se lleva bien con otros animales. Cuando se lo propone, va a hacer cualquier cosa por tal de que le des unos mimos y comida. Extorcionador 100%",
    imagen: "../assets/images/cat-3.webp"
  }
];

function fillCatDetail() {
  const cat = cats[catIndex];
  document.getElementById("js-cat-img").style.backgroundImage = `url(${cat.imagen})`;
  document.getElementById("js-cat-title").textContent = cat.nombre;

  document.getElementById("js-cat-breed").innerHTML = `<span>Raza:</span> ${cat.raza}`;
  document.getElementById("js-cat-age").innerHTML = `<span>Edad:</span> ${cat.edad}`;
  document.getElementById("js-cat-weight").innerHTML = `<span>Peso:</span> ${cat.peso}`;
  document.getElementById("js-cat-description").innerHTML = `<span>Descripción:</span> ${cat.descripcion}`;

  // Cambiar el contenido del pseudo-elemento ::after del título
  const title = document.getElementById("js-cat-title");
  title.style.setProperty("--cat-name", `"${cat.nombre}"`);
}
// Obtener el parámetro 'cat' de la URL
const urlParams = new URLSearchParams(window.location.search);
const catIndex = parseInt(urlParams.get('cat'));

// Llenar los detalles del gato si se proporciona un índice válido
if (!isNaN(catIndex) && catIndex >= 0 && catIndex < cats.length) {
  fillCatDetail(catIndex);
}

