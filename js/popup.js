document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const overlay = document.getElementById('popup-overlay');
    const title = document.getElementById('popup-title');
    const message = document.getElementById('popup-message');
    const icon = document.getElementById('popup-icon');
    const okBtn = document.getElementById('popup-ok-btn');
    const closeBtn = document.getElementById('popup-close');

    if (status && overlay) {
        if (status === 'success') {
            title.textContent = "Message Sent!";
            title.style.color = "#0280ff";
            message.textContent = "Thanks for reaching out! We'll get back to you soon.";
            okBtn.style.backgroundColor = "#0280ff";
            okBtn.textContent = "Awesome!";
        } else if (status === 'error') {
            title.textContent = "Ooops!";
            title.style.color = "#ff4757";
            message.textContent = "Something went wrong sending the message. Please try again.";
            okBtn.style.backgroundColor = "#ff4757";
            okBtn.textContent = "Try Again";
        }

        overlay.classList.add('active');

        window.history.replaceState(null, null, window.location.pathname);
    }

    function cerrarPopup() {
        overlay.classList.remove('active');
    }

    if (closeBtn) closeBtn.addEventListener('click', cerrarPopup);
    if (okBtn) okBtn.addEventListener('click', cerrarPopup);
    
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) cerrarPopup();
        });
    }
});