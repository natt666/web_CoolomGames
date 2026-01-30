document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const botonesNav = document.getElementById('botonesNav');

    if (!menuToggle || !botonesNav) {
        console.warn('Menu toggle elements not found');
        return;
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        botonesNav.classList.toggle('active');
        
        if (botonesNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    const navLinks = botonesNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            botonesNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !botonesNav.contains(e.target)) {
            menuToggle.classList.remove('active');
            botonesNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && botonesNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            botonesNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            botonesNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});