// Detección de hover solo en áreas no transparentes
document.addEventListener('DOMContentLoaded', function() {
    const heroChars = document.querySelectorAll('.hero-char');
    
    heroChars.forEach(img => {
        // Crear canvas para leer los píxeles de la imagen
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        img.addEventListener('load', function() {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
        });
        
        // Si la imagen ya está cargada
        if (img.complete) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
        }
        
        img.addEventListener('mousemove', function(e) {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Convertir coordenadas del DOM a coordenadas de la imagen
            const scaleX = img.naturalWidth / rect.width;
            const scaleY = img.naturalHeight / rect.height;
            const imgX = Math.floor(x * scaleX);
            const imgY = Math.floor(y * scaleY);
            
            try {
                // Leer el píxel en esa posición
                const pixel = ctx.getImageData(imgX, imgY, 1, 1).data;
                const alpha = pixel[3]; // Canal alpha (transparencia)
                
                // Si el alpha es mayor que 50 (no es muy transparente)
                if (alpha > 50) {
                    img.classList.add('hover-active');
                } else {
                    img.classList.remove('hover-active');
                }
            } catch (e) {
                // Si hay error CORS, usar hover normal
                console.warn('No se puede leer la imagen debido a CORS');
            }
        });
        
        img.addEventListener('mouseleave', function() {
            img.classList.remove('hover-active');
        });
    });
});