document.addEventListener('DOMContentLoaded', function() {
    const heroChars = document.querySelectorAll('.hero-char');
    
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
    
    Object.values(imageStates).forEach(state => {
        Object.values(state).forEach(imgPath => {
            const preload = new Image();
            preload.src = imgPath;
        });
    });
    
    heroChars.forEach(img => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        let charClass = null;
        if (img.classList.contains('hero-char-left')) charClass = 'hero-char-left';
        if (img.classList.contains('hero-char-center')) charClass = 'hero-char-center';
        if (img.classList.contains('hero-char-right')) charClass = 'hero-char-right';
        
        img.addEventListener('load', function() {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
        });
        
        if (img.complete) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
        }
        
        img.addEventListener('mousemove', function(e) {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const scaleX = img.naturalWidth / rect.width;
            const scaleY = img.naturalHeight / rect.height;
            const imgX = Math.floor(x * scaleX);
            const imgY = Math.floor(y * scaleY);
            
            try {
                const pixel = ctx.getImageData(imgX, imgY, 1, 1).data;
                const alpha = pixel[3];
                if (alpha > 50) {
                    img.classList.add('hover-active');
                    
                    if (charClass && imageStates[charClass]) {
                        const state = imageStates[charClass];
                        if (img.src.indexOf(state.normal) !== -1) {
                            img.src = state.hover;
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
                    
                    if (charClass && imageStates[charClass]) {
                        const state = imageStates[charClass];
                        if (img.src.indexOf(state.hover) !== -1) {
                            img.src = state.normal;
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
                console.warn('No se puede leer la imagen debido a CORS');
            }
        });
        
        img.addEventListener('mouseleave', function() {
            img.classList.remove('hover-active');
            
            if (charClass && imageStates[charClass]) {
                const state = imageStates[charClass];
                img.src = state.normal;
            }
        });
        
        img.addEventListener('click', function() {
            if (img.classList.contains('hero-char-center')) {
                img.src = 'resources/img/dating_killmulator/characters/cain/cain_blood.png';
                img.addEventListener('load', function reloadCanvas() {
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    ctx.drawImage(img, 0, 0);
                    img.removeEventListener('load', reloadCanvas);
                });
                
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