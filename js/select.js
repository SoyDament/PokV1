// select.js

// Función para manejar la selección de opciones
function handleSelection(buttons, selectedButton, callback) {
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (button !== selectedButton) {
                buttons.forEach((btn) => {
                    btn.classList.remove('selected');
                });
                button.classList.add('selected');
                selectedButton = button;
                callback(selectedButton);
            }
        });
    });
}

// Obtener los botones de selección de generación
const generationButtons = [
    document.getElementById('generation-kanto'),
    document.getElementById('generation-johto'),
    document.getElementById('generation-hoenn')
];

// Obtener los botones de selección de dificultad
const difficultyButtons = [
    document.getElementById('difficulty-easy'),
    document.getElementById('difficulty-medium'),
    document.getElementById('difficulty-hard')
];

// Función para habilitar el botón de inicio una vez que se seleccionen ambas opciones
function enableStartButton(selectedGeneration, selectedDifficulty) {
    const startButton = document.getElementById('startbutton');
    if (selectedGeneration && selectedDifficulty) {
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
    }
}

// Variable para mantener la opción seleccionada en ambas categorías
let selectedGeneration = null;
let selectedDifficulty = null;

// Manejar la selección de generación y dificultad
handleSelection(generationButtons, selectedGeneration, (button) => {
    selectedGeneration = button.getAttribute('data-generation');
    enableStartButton(selectedGeneration, selectedDifficulty);
});

handleSelection(difficultyButtons, selectedDifficulty, (button) => {
    selectedDifficulty = button.getAttribute('data-value');
    enableStartButton(selectedGeneration, selectedDifficulty);
});

// Manejar el inicio del juego al hacer clic en el botón "Comenzar Juego"
const startButton = document.getElementById('startbutton');

startButton.addEventListener('click', () => {
    if (selectedGeneration && selectedDifficulty) {
        const url = `game.html?generation=${selectedGeneration}&difficulty=${selectedDifficulty}`;
        window.location.href = url;
    }
});
