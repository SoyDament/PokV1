// select.js

import { redirectToGame } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
    // Obtén los botones de selección de generación
    const generationButtons = [
        document.getElementById('generation1-button'),
        document.getElementById('generation2-button'),
        document.getElementById('generation3-button')
    ];

    // Función para manejar la selección de opciones
    function handleSelection(buttons) {
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                buttons.forEach((btn) => {
                    btn.classList.remove('selected');
                });
                button.classList.add('selected');
                const selectedGeneration = button.getAttribute('data-generation');
                redirectToGame(selectedGeneration.toString()); // Asegúrate de que sea una cadena
            });
        });
    }

    // Manejar la selección de generación
    handleSelection(generationButtons);

    // Agregar evento de clic al botón de juego para redirigir
    const gameButton = document.getElementById('game-button');
    gameButton.addEventListener('click', () => {
        const selectedGeneration = localStorage.getItem('selectedGeneration');
        if (!selectedGeneration) {
            console.error('Error: selectedGeneration is null');
            return;
        }
        redirectToGame(selectedGeneration.toString()); // Asegúrate de que sea una cadena
    });
});
