// Importar las funciones necesarias de otros archivos
import { generatePokemonNameOptions, generatePokemonTypeOptions } from './pokemonData.js';
import { showPokemonSprites } from './hiddenSprites.js';
import { loadAllPokemonData } from './pokemonLoader.js';

// Definir las variables de estado del juego
let currentPokemon; // El Pokémon actual que se debe adivinar
let correctAnswer; // La respuesta correcta (nombre o tipos)
let isTypeQuestion; // Bandera que indica si es una pregunta de tipo

// Función para comenzar un nuevo juego
async function startGame(pokemonData) {
    // Obtener un Pokémon aleatorio de la lista de Pokémon disponibles
    currentPokemon = getRandomPokemon(pokemonData);

    // Decidir si la pregunta será sobre el nombre o el tipo del Pokémon
    isTypeQuestion = Math.random() < 0.5;

    // Generar las opciones de respuesta (nombre o tipos)
    correctAnswer = isTypeQuestion ? currentPokemon.types : currentPokemon.name;
    const options = isTypeQuestion
        ? await generatePokemonTypeOptions(currentPokemon.url, pokemonData)
        : generatePokemonNameOptions(currentPokemon, pokemonData);

    // Mostrar el Pokémon y las opciones en la interfaz de usuario
    displayPokemon(currentPokemon);
    displayOptions(options);
}

// Obtén una referencia al elemento de imagen
const pokemonImage = document.getElementById('pokemon-sprite');

export function displayPokemon(pokemon) {
    const pokemonImage = document.getElementById('pokemon-image');
    pokemonImage.src = pokemon.imageUrl;
    pokemonImage.alt = pokemon.name;
}



// En algún lugar de tu lógica de juego, llama a la función displayPokemon con el Pokémon que deseas mostrar:
const pokemonToShow = getRandomPokemon(pokemonData); // Obtén un Pokémon aleatorio
displayPokemon(pokemonToShow);


// Función para mostrar las opciones de respuesta en la interfaz de usuario
function displayOptions(options) {
    // Supongamos que tienes un elemento HTML con el ID 'options-container' para mostrar las opciones
    const optionsContainer = document.getElementById('options-container');

    // Limpia el contenedor de opciones antes de agregar las nuevas opciones
    optionsContainer.innerHTML = '';

    // Crea botones para cada opción y agrégales eventos de clic
    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => handleAnswer(option));
        optionsContainer.appendChild(button);
    });
}

// Función para manejar la respuesta del jugador
function handleAnswer(playerAnswer) {
    if (playerAnswer === correctAnswer) {
        // Respuesta correcta: Puedes agregar aquí la lógica para mostrar un mensaje de éxito
        console.log('¡Respuesta correcta!');
    } else {
        // Respuesta incorrecta: Puedes agregar aquí la lógica para mostrar un mensaje de error
        console.log('Respuesta incorrecta. La respuesta correcta era:', correctAnswer);
    }

    // Cargar la siguiente pregunta
    startGame(); // Puedes personalizar esta llamada según tu lógica de juego
}

// Función para obtener un Pokémon aleatorio de la lista de Pokémon disponibles
function getRandomPokemon(pokemonData) {
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    return pokemonData[randomIndex];
}

// Resto del código de manejo de respuestas y carga de siguientes preguntas

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Cargar los datos de los Pokémon desde pokemonLoader.js
        const allPokemon = await loadAllPokemonData(); // Supongamos que tienes una función para cargar todos los Pokémon

        // Iniciar el juego pasando los datos de los Pokémon
        await startGame(allPokemon);
    } catch (error) {
        console.error('Error al cargar los datos de los Pokémon:', error);
        // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
    }
});