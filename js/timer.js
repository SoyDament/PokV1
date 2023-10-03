// Función para iniciar el temporizador según la dificultad
function startGameTimer(difficulty, nextCallback) {
    const timerDisplay = document.getElementById('timer-display');
    let duration;

    switch (difficulty) {
        case 'easy':
            duration = 60; // 1 minuto para el modo fácil
            break;
        case 'medium':
            duration = 30; // 30 segundos para el modo medio
            break;
        case 'hard':
            duration = 15; // 15 segundos para el modo difícil
            break;
        default:
            duration = 60; // Valor predeterminado: 1 minuto para el modo fácil
    }

    function displayTime() {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerDisplay.textContent = 'Tiempo agotado';
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
