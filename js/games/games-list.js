// Configuración de juegos
const gamesData = [
    {
        title: "Dating Killmulator",
        image: "resources/img/dating_killmulator/landing_page/dating_lp_img.png",
        logo: "resources/img/dating_killmulator/logo/logo_blanc.png",
        description: "A comedy dating sim about a serial killer, a popular guy, and a psychologist.",
        link: "https://coolom-games.itch.io/datingkillmulator",
        reverse: false
    },
    {
        title: "En Patufet Torna a Casa",
        image: "resources/img/en_patufet_torna_a_casa/landing_page/patufet_lp_img.png",
        logo: null,
        description: "Help Patufet get home, one adjective after another! · Ludi 3CAT Award for best replayability.",
        link: "https://coolom-games.itch.io/enpatufettornaacasa",
        reverse: true
    },
    {
        title: "Midlander",
        image: "resources/img/midlander/landing_page/midlander_lp_img.png",
        logo: "resources/img/midlander/logo/logo.png",
        description: "A crazy game about killing gods, surviving an island, and stabbing everything that gets in your way.",
        link: "http://coolom-games.itch.io/midlander",
        reverse: false
    }
];

// Crear la lista de juegos
function createGamesList() {
    const gamesListContainer = document.querySelector('.games-list');
    
    if (!gamesListContainer) {
        console.error('No se encontró el contenedor .games-list');
        return;
    }
    
    // Limpiar contenedor
    gamesListContainer.innerHTML = '';
    
    // Crear cada juego
    gamesData.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        if (game.reverse) {
            gameItem.classList.add('reverse');
        }
        
        // Crear HTML del juego
        gameItem.innerHTML = `
            <div class="game-image-wrapper">
                <img src="${game.image}" alt="${game.title}">
            </div>
            <div class="game-info">
                ${game.logo ? `<img src="${game.logo}" alt="${game.title} Logo" class="game-info-logo">` : ''}
                <p class="game-description">${game.description}</p>
                <a href="${game.link}" target="_blank" rel="noopener noreferrer" class="game-link">Learn More</a>
            </div>
        `;
        
        gamesListContainer.appendChild(gameItem);
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', createGamesList);