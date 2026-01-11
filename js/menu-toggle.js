/**
 * Menu Hamburguesa - Script reutilizable
 * Coolom Games
 * 
 * Uso: Incluir este script en cualquier HTML que tenga el menú
 * <script src="js/menu-toggle.js"></script>
 */

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const botonesNav = document.getElementById('botonesNav');

    // Verificar que los elementos existen
    if (!menuToggle || !botonesNav) {
        console.warn('Menu toggle elements not found');
        return;
    }

    // Toggle del menú al hacer click en el botón hamburguesa
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        botonesNav.classList.toggle('active');
        
        // Prevenir scroll cuando el menú está abierto
        if (botonesNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú al hacer click en un enlace
    const navLinks = botonesNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            botonesNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Cerrar menú al hacer click fuera del menú
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !botonesNav.contains(e.target)) {
            menuToggle.classList.remove('active');
            botonesNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && botonesNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            botonesNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú al cambiar el tamaño de la ventana a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            botonesNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});