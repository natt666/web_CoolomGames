// Configuración de juegos
const games = [
    {
        image: 'resources/img/dating_killmulator/landing_page/dating_lp_img.png',
        title: 'Dating Killmulator',
        alt: 'Dating Killmulator',
        link: 'https://coolom-games.itch.io/datingkillmulator'
    },
    {
        image: 'resources/img/midlander/landing_page/midlander_lp_img.png',
        title: 'Midlander',
        alt: 'Midlander',
        link: 'http://coolom-games.itch.io/midlander'
    },
    {
        image: 'resources/img/en_patufet_torna_a_casa/landing_page/patufet_lp_img.png',
        title: 'En patufet torna a casa',
        alt: 'En patufet torna a casa',
        link: 'https://coolom-games.itch.io/enpatufettornaacasa'
    }
];

// Crear el carrusel
function createCarousel() {
    const container = document.getElementById('games-carousel');
    
    // Crear estructura HTML
    const carouselHTML = `
        <div class="games-carousel">
            <button class="carousel-arrow left-arrow">&#10094;</button>
            
            <div class="carousel-container">
                <div class="carousel-track" id="carousel-track"></div>
            </div>
            
            <button class="carousel-arrow right-arrow">&#10095;</button>
        </div>
    `;
    
    container.innerHTML = carouselHTML;
    
    // Duplicar juegos para efecto infinito (3 copias)
    const extendedGames = [...games, ...games, ...games];
    const track = document.getElementById('carousel-track');
    
    // Crear slides
    extendedGames.forEach(game => {
        const slide = document.createElement('a');
        slide.href = game.link;
        slide.target = '_blank';
        slide.rel = 'noopener noreferrer';
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <img src="${game.image}" alt="${game.alt}">
            <div class="game-title">${game.title}</div>
        `;
        track.appendChild(slide);
    });
    
    // Inicializar funcionalidad del carrusel
    initCarousel();
}

// Funcionalidad del carrusel
function initCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    let currentIndex = games.length; // Empezar en la segunda copia
    const totalOriginal = games.length;
    
    const getSlideWidth = () => {
        return slides[0].offsetWidth + 50; // ancho + gap de 50px
    };
    
    function updateCarousel(smooth = true) {
        if (!smooth) {
            carouselTrack.style.transition = 'none';
        } else {
            carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        carouselTrack.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
    }
    
    rightArrow.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
        
        // Resetear al inicio de la segunda copia
        if (currentIndex >= totalOriginal * 2) {
            setTimeout(() => {
                currentIndex = totalOriginal;
                updateCarousel(false);
            }, 600);
        }
    });
    
    leftArrow.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
        
        // Resetear al final de la segunda copia
        if (currentIndex < totalOriginal) {
            setTimeout(() => {
                currentIndex = totalOriginal * 2 - 1;
                updateCarousel(false);
            }, 600);
        }
    });
    
    // Responsive
    window.addEventListener('resize', () => updateCarousel(false));
    
    // Inicializar posición
    updateCarousel(false);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', createCarousel);