// Función para iniciar el temporizador con un tiempo fijo de 1 minuto
function startGameTimer(nextCallback) {
    const timerDisplay = document.getElementById('timer-display');
    const timeUpMessage = document.getElementById('time-up-message'); // Nuevo elemento para el mensaje
    let duration = 60; // 1 minuto de tiempo

    function displayTime() {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerDisplay.textContent = 'Tiempo agotado';
        timeUpMessage.classList.remove('hidden'); // Mostrar el mensaje
        nextCallback();
        mostrarMensajeDeError();
        actualizarSprite();
    }

    const timerInterval = setInterval(() => {
        displayTime();

        if (duration <= 0) {
            stopTimer();
        }

        duration--;
    }, 1000);

    displayTime();
}

function mostrarMensajeDeError() {
    console.log('¡Tiempo agotado! Debes ser más rápido.');
}

function actualizarSprite() {
    console.log('Actualizando el sprite del Pokémon.');
}

export { startGameTimer };
