// game.js

import { generateOptions } from './utils.js';
import { getRandomPokemonByGeneration } from './pokemonUtils.js';


const answerButton1 = document.getElementById('answer1');
const answerButton2 = document.getElementById('answer2');
const answerButton3 = document.getElementById('answer3');
const answerButton4 = document.getElementById('answer4');
const errorMessage = document.getElementById('error-text');

const urlParams = new URLSearchParams(window.location.search);
const selectedGeneration = urlParams.get('generation');
const selectedGenerationParam = urlParams.get('generation');
// Verifica si 'selectedGenerationParam' es null o no es un número válido

if (selectedGeneration !== null) {
    // selectedGeneration contiene el valor pasado desde index.html
    console.log(`Generación seleccionada: ${selectedGeneration}`);
} else {
    // No se pasó el parámetro o es nulo, maneja este caso según tus necesidades
    console.error('No se proporcionó una generación válida.');
}


async function getPokemonDataForGeneration(generation) {
    // Asegúrate de que 'generation' sea un número válido
    if (isNaN(generation)) {
        console.error(`Invalid generation: ${generation}`);
        return null;
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${generation}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error fetching Pokémon data for generation ${generation}`);
        }

        const pokemonData = await response.json();

        return {
            name: pokemonData.name,
            sprite: pokemonData.sprites.front_default,
        };
    } catch (error) {
        console.error(error);
        alert('Ocurrió un error al obtener los datos del Pokémon. Por favor, inténtalo de nuevo más tarde.');
        throw error;
    }
}


async function loadAndDisplayPokemon(selectedGeneration) {
    try {
        // Obtén el Pokémon aleatorio de la generación seleccionada usando la función importada
        const pokemonData = await getRandomPokemonByGeneration(selectedGeneration);

        // Desestructura los datos del Pokémon
        const { name, sprite } = pokemonData;

        // Actualiza la imagen y el atributo 'alt' del Pokémon
        const pokemonImageElement = document.getElementById('pokemon-image');
        pokemonImageElement.src = sprite;
        pokemonImageElement.alt = name;

        // Genera las opciones de respuesta
        const options = generateOptions(name);

        // Muestra las opciones en los botones
        displayOptions(options);
    } catch (error) {
        console.error(error);
        alert('Ocurrió un error al cargar el Pokémon. Por favor, inténtalo de nuevo más tarde.');
    }
}


function displayOptions(options) {
    const optionElements = document.querySelectorAll('.answer-button');

    // Asigna cada nombre de Pokémon a un botón de respuesta
    optionElements.forEach((element, index) => {
        element.textContent = options[index];
    });

    // Agrega eventos de clic a los botones de respuesta
    optionElements.forEach((element) => {
        element.addEventListener('click', () => {
            handleAnswerClick(element);
        });
    });
}


// Función para manejar la selección de respuestas
function handleAnswerClick(button) {
    const selectedAnswer = button.textContent;
    const correctAnswer = document.querySelector('.answer-button[data-correct="true"]').textContent;

    if (selectedAnswer === correctAnswer) {
        // Respuesta correcta: Implementa la lógica aquí (por ejemplo, actualiza el puntaje y muestra un mensaje)
        console.log('¡Respuesta correcta!');
        // Lógica para actualizar el puntaje y cambiar de Pokémon
        // ...
        loadAndDisplayPokemon(selectedGeneration); // Cambiar de Pokémon
    } else {
        // Respuesta incorrecta: Implementa la lógica aquí (por ejemplo, muestra un mensaje de error)
        console.log('¡Respuesta incorrecta!');
        // Lógica para manejar la respuesta incorrecta
        showError();
    }
}

// Función para mostrar un mensaje de error
function showError() {
    errorMessage.textContent = 'Respuesta incorrecta. Inténtalo de nuevo.';
}

// Llama a la función para cargar y mostrar Pokémon con la generación seleccionada
loadAndDisplayPokemon(selectedGeneration);
