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

function createCarousel() {
    const container = document.getElementById('games-carousel');
    
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
    
    // Duplicar los juegos para el efecto infinito
    const extendedGames = [...games, ...games, ...games];
    const track = document.getElementById('carousel-track');
    
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
    
    initCarousel();
}

function initCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    let currentIndex = games.length;
    const totalOriginal = games.length;
    
    // Variables para swipe táctil
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTransform = 0;
    
    // Obtener el ancho correcto del slide incluyendo el gap
    const getSlideWidth = () => {
        const slideWidth = slides[0].offsetWidth;
        const computedStyle = window.getComputedStyle(carouselTrack);
        const gap = parseFloat(computedStyle.gap) || 0;
        return slideWidth + gap;
    };
    
    function updateCarousel(smooth = true) {
        if (!smooth) {
            carouselTrack.style.transition = 'none';
        } else {
            carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        const offset = currentIndex * getSlideWidth();
        carouselTrack.style.transform = `translateX(-${offset}px)`;
    }
    
    function goToSlide(index, smooth = true) {
        currentIndex = index;
        updateCarousel(smooth);
        
        // Resetear posición si llegamos a los clones
        if (currentIndex >= totalOriginal * 2) {
            setTimeout(() => {
                currentIndex = totalOriginal;
                updateCarousel(false);
            }, smooth ? 600 : 0);
        } else if (currentIndex < totalOriginal) {
            setTimeout(() => {
                currentIndex = totalOriginal * 2 - 1;
                updateCarousel(false);
            }, smooth ? 600 : 0);
        }
    }
    
    // Botón derecha
    rightArrow.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // Botón izquierda
    leftArrow.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    // ==================== SWIPE TÁCTIL ====================
    
    // Touch Start
    carouselContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startTransform = currentIndex * getSlideWidth();
        carouselTrack.style.transition = 'none';
    }, { passive: true });
    
    // Touch Move
    carouselContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        const newTransform = startTransform + diff;
        
        carouselTrack.style.transform = `translateX(-${newTransform}px)`;
    }, { passive: true });
    
    // Touch End
    carouselContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        isDragging = false;
        const diff = startX - currentX;
        const threshold = getSlideWidth() * 0.2; // 20% del ancho para cambiar
        
        carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe izquierda - siguiente slide
                goToSlide(currentIndex + 1);
            } else {
                // Swipe derecha - slide anterior
                goToSlide(currentIndex - 1);
            }
        } else {
            // No alcanzó el threshold, volver a la posición actual
            updateCarousel(true);
        }
    });
    
    // ==================== MOUSE DRAG (para desktop) ====================
    
    carouselContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startTransform = currentIndex * getSlideWidth();
        carouselTrack.style.transition = 'none';
        carouselContainer.style.cursor = 'grabbing';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        currentX = e.clientX;
        const diff = startX - currentX;
        const newTransform = startTransform + diff;
        
        carouselTrack.style.transform = `translateX(-${newTransform}px)`;
    });
    
    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        isDragging = false;
        const diff = startX - currentX;
        const threshold = getSlideWidth() * 0.2;
        
        carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        carouselContainer.style.cursor = 'grab';
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(currentIndex - 1);
            }
        } else {
            updateCarousel(true);
        }
    });
    
    // Prevenir que los links se activen durante el drag
    slides.forEach(slide => {
        slide.addEventListener('click', (e) => {
            if (Math.abs(startX - currentX) > 5) {
                e.preventDefault();
            }
        });
    });
    
    // ==================== RESIZE ====================
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel(false);
        }, 100);
    });
    
    // Inicializar
    updateCarousel(false);
}

document.addEventListener('DOMContentLoaded', createCarousel);