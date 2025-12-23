// Detección de hover solo en áreas no transparentes
document.addEventListener('DOMContentLoaded', function() {
    const heroChars = document.querySelectorAll('.hero-char');
    
    // Imágenes originales y hover para cada personaje
    const imageStates = {
        'hero-char-left': {
            normal: 'resources/img/dating_killmulator/characters/abel/abel_normal.png',
            hover: 'resources/img/dating_killmulator/characters/abel/abel_blush.png'
        },
        'hero-char-center': {
            normal: 'resources/img/dating_killmulator/characters/cain/cain_normal.png',
            hover: 'resources/img/dating_killmulator/characters/cain/cain_smile.png',
            blood: 'resources/img/dating_killmulator/characters/cain/cain_blood.png'
        },
        'hero-char-right': {
            normal: 'resources/img/dating_killmulator/characters/florian/florian_normal.png',
            hover: 'resources/img/dating_killmulator/characters/florian/florian_blush.png'
        }
    };
    
    // Precargar todas las imágenes
    Object.values(imageStates).forEach(state => {
        Object.values(state).forEach(imgPath => {
            const preload = new Image();
            preload.src = imgPath;
        });
    });
    
    heroChars.forEach(img => {
        // Crear canvas para leer los píxeles de la imagen
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Determinar qué personaje es
        let charClass = null;
        if (img.classList.contains('hero-char-left')) charClass = 'hero-char-left';
        if (img.classList.contains('hero-char-center')) charClass = 'hero-char-center';
        if (img.classList.contains('hero-char-right')) charClass = 'hero-char-right';
        
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
                    
                    // Cambiar imagen si tiene estado hover
                    if (charClass && imageStates[charClass]) {
                        const state = imageStates[charClass];
                        if (img.src.indexOf(state.normal) !== -1) {
                            img.src = state.hover;
                            // Recargar canvas con nueva imagen
                            img.addEventListener('load', function reloadCanvas() {
                                canvas.width = img.naturalWidth;
                                canvas.height = img.naturalHeight;
                                ctx.drawImage(img, 0, 0);
                                img.removeEventListener('load', reloadCanvas);
                            });
                        }
                    }
                } else {
                    img.classList.remove('hover-active');
                    
                    // Restaurar imagen original
                    if (charClass && imageStates[charClass]) {
                        const state = imageStates[charClass];
                        if (img.src.indexOf(state.hover) !== -1) {
                            img.src = state.normal;
                            // Recargar canvas con imagen original
                            img.addEventListener('load', function reloadCanvas() {
                                canvas.width = img.naturalWidth;
                                canvas.height = img.naturalHeight;
                                ctx.drawImage(img, 0, 0);
                                img.removeEventListener('load', reloadCanvas);
                            });
                        }
                    }
                }
            } catch (e) {
                // Si hay error CORS, usar hover normal
                console.warn('No se puede leer la imagen debido a CORS');
            }
        });
        
        img.addEventListener('mouseleave', function() {
            img.classList.remove('hover-active');
            
            // Restaurar imagen original
            if (charClass && imageStates[charClass]) {
                const state = imageStates[charClass];
                img.src = state.normal;
            }
        });
        
        // Evento de clic para Cain (centro)
        img.addEventListener('click', function() {
            if (img.classList.contains('hero-char-center')) {
                img.src = 'resources/img/dating_killmulator/characters/cain/cain_blood.png';
                // Recargar canvas con imagen de sangre
                img.addEventListener('load', function reloadCanvas() {
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    ctx.drawImage(img, 0, 0);
                    img.removeEventListener('load', reloadCanvas);
                });
                
                // Opcional: volver a normal después de 2 segundos
                setTimeout(function() {
                    img.src = imageStates['hero-char-center'].normal;
                    img.addEventListener('load', function reloadCanvas() {
                        canvas.width = img.naturalWidth;
                        canvas.height = img.naturalHeight;
                        ctx.drawImage(img, 0, 0);
                        img.removeEventListener('load', reloadCanvas);
                    });
                }, 2000);
            }
        });
    });
});