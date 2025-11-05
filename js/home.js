const riveInstance = new rive.Rive({
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
});