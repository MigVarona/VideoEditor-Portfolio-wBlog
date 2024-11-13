function openModal(modalId) {
    document.getElementById(modalId).style.setProperty('display', 'flex', 'important');
}

function closeModal(modalId, iframeId) {
    var iframe = document.getElementById(iframeId);
    iframe.src = iframe.src; // Reinicia el src del iframe para detener el video
    document.getElementById(modalId).style.display = "none";
}

window.onclick = function(event) {
    var modals = document.querySelectorAll('.modal'); // Asegúrate de que todos tus modales tengan la clase "modal"
    modals.forEach(function(modal) {
        if (event.target === modal) {
            modal.style.display = "none";
            var iframe = modal.querySelector("iframe");
            if (iframe) {
                iframe.src = iframe.src; 
            }
        }
    });
};
