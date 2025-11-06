/* const riveInstance = new rive.Rive({
  src: "resources/rive/probarive.riv",
  canvas: document.getElementById("riveCanvas"),
  autoplay: true,
  stateMachines: ["Motion"], // nombre exacto del State Machine
  onLoad: () => {
    // Ajusta el tamaño al canvas
    riveInstance.resizeDrawingSurfaceToCanvas();

    // Obtener los inputs del State Machine
    const inputs = riveInstance.stateMachineInputs("Motion");
    console.log(inputs);

  // Buscar los inputs
    const hoverInput = inputs.find(i => i.name === "Hover");
    const clickInput = inputs.find(i => i.name === "Click");

    const canvas = document.getElementById("riveCanvas");

    // Eventos del mouse
    canvas.addEventListener("mouseenter", () => {
      if (hoverInput) hoverInput.value = true;
    });

    canvas.addEventListener("mouseleave", () => {
      if (hoverInput) hoverInput.value = false;
    });

    canvas.addEventListener("click", () => {
      if (clickInput) clickInput.fire();
    });
  },
}); */

fetch('resources/json/carrousel_home_trailers.json')
  .then(response => {
    if (!response.ok) throw new Error('Error al cargar el JSON');
    return response.json();
  })
  .then(datos => {
    const contenedor = document.querySelector('.carrousel');

    datos.forEach((item, index) => {
      const slide = document.createElement('div');
      slide.classList.add('slide');
      if (index === 0) slide.classList.add('active');

      const video = document.createElement('video');
      video.src = item.path_video;
      video.autoplay = index === 0; // solo el primero al cargar
      video.loop = false; // queremos que avance al siguiente, no que se repita
      video.muted = true;
      video.playsInline = true;

      const logo = document.createElement('img');
      logo.src = item.logo;
      logo.classList.add('logo');

      slide.appendChild(video);
      slide.appendChild(logo);
      contenedor.appendChild(slide);
    });

    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const total = slides.length;
    const prev = document.querySelector('.arrow.left');
    const next = document.querySelector('.arrow.right');

    function showSlide(index) {
      slides.forEach((s, i) => {
        const video = s.querySelector('video');
        s.classList.remove('active');
        video.pause();
        video.currentTime = 0;
      });

      const activeSlide = slides[index];
      const activeVideo = activeSlide.querySelector('video');
      activeSlide.classList.add('active');
      activeVideo.play();

      currentIndex = index;
    }

    // Botones de navegación
    prev.addEventListener('click', () => {
      const newIndex = (currentIndex - 1 + total) % total;
      showSlide(newIndex);
    });

    next.addEventListener('click', () => {
      const newIndex = (currentIndex + 1) % total;
      showSlide(newIndex);
    });

    // Al terminar el vídeo, pasar al siguiente
    slides.forEach((s, i) => {
      const video = s.querySelector('video');
      video.addEventListener('ended', () => {
        const newIndex = (i + 1) % total;
        showSlide(newIndex);
      });
    });
  })
  .catch(error => console.error(error));