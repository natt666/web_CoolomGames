// Cambiar iconos de redes sociales en hover
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.xarxes-socials a');
    
    socialLinks.forEach(link => {
        const img = link.querySelector('img');
        if (!img) return;
        
        const originalSrc = img.src;
        const hoverSrc = originalSrc.replace('_white', '_black');
        
        // Precargar imagen hover
        const preload = new Image();
        preload.src = hoverSrc;
        
        link.addEventListener('mouseenter', function() {
            img.src = hoverSrc;
        });
        
        link.addEventListener('mouseleave', function() {
            img.src = originalSrc;
        });
    });
});