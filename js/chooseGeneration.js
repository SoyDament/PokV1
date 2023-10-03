// chooseGeneration.js

// Importa las funciones de las generaciones individuales
import { loadAndDisplayGeneration1Pokemon } from './generation1.js';
import { loadAndDisplayGeneration2Pokemon } from './generation2.js';
import { loadAndDisplayGeneration3Pokemon } from './generation3.js';

// Obtén los botones de selección de generación
const generationButtons = [
    document.getElementById('generation-kanto'),
    document.getElementById('generation-johto'),
    document.getElementById('generation-hoenn')
];

// Agrega un evento de clic a cada botón para detectar la selección de generación
generationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Obtener la generación seleccionada desde el atributo 'data-generation'
        const selectedGeneration = button.getAttribute('data-generation');

        // Llamar a la función correspondiente a la generación seleccionada
        switch (selectedGeneration) {
            case '1':
                loadAndDisplayGeneration1Pokemon();
                break;
            case '2':
                loadAndDisplayGeneration2Pokemon();
                break;
            case '3':
                loadAndDisplayGeneration3Pokemon();
                break;
            // Agrega más casos para generaciones adicionales si es necesario
        }
    });
});
