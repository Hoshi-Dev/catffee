
import API_KEY from './api_key.js'; // Importar la clave API desde el archivo generado


function loadImages(limit) {
    const url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1`;

    fetch(url, {
        headers: {
            'x-api-key': API_KEY
        }
    })
        .then((response) => response.json())
        .then((data) => {
            let imagesData = data;
            console.log(data);
            imagesData.forEach((imageData) => {
                let image = document.createElement('img');
                image.loading = 'lazy';
                image.src = `${imageData.url}`;

                let cardItem = document.createElement('div');
                cardItem.classList.add('main__api-gallery__cards__item');

                cardItem.appendChild(image);

                document.getElementById('js-main__api-gallery__cards').appendChild(cardItem);

            });
        })
        .catch((error) => {
            console.log(error);
        });
}

//Función que verifica el ancho del viewport y oculta imágenes si es necesario.
function checkViewportAndHideImages() {
    const viewportWidth = window.innerWidth;
    const gallery = document.getElementById('js-main__api-gallery__cards');
    const images = gallery.getElementsByClassName('main__api-gallery__cards__item');


    if (viewportWidth >= 1955) {
        images[images.length - 1].style.display = 'none';
        images[images.length - 2].style.display = 'none';
    } else {
        for (let i = 0; i < images.length; i++) {
            images[i].style.display = 'block';
        }
    }

    if (viewportWidth >= 2350) {
        images[images.length - 1].style.display = 'block';
        images[images.length - 2].style.display = 'block';
    }
}

// Cargar las primeras imágenes al cargar la página
loadImages(12); // Cargar inicialmente 10 imágenes

// Llama a la función cuando se redimensiona la ventana
window.addEventListener('resize', () => {
    checkViewportAndHideImages();
});