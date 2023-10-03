// generation1.js

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

async function fetchPokemonData() {
    try {
        const randomPokemonId = Math.floor(Math.random() * 151) + 1;
        const response = await fetch(apiUrl + randomPokemonId);

        if (!response.ok) {
            throw new Error(`Error fetching Pokémon data for ID ${randomPokemonId}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function displayPokemon(pokemonData) {
    const pokemonName = capitalizeFirstLetter(pokemonData.name);
    const pokemonImage = pokemonData.sprites.front_default;

    document.getElementById('pokemon-name').textContent = pokemonName;
    document.getElementById('pokemon-image').src = pokemonImage;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function loadAndDisplayGeneration1Pokemon() {
    try {
        const pokemonData = await fetchPokemonData();
        displayPokemon(pokemonData);
    } catch (error) {
        // Maneja el error, por ejemplo, muestra un mensaje al usuario
        console.error(error);
    }
}
// Función para manejar el clic en una opción
function handleOptionClick(selectedOption, correctOption) {
    if (selectedOption === correctOption) {
        // La opción seleccionada es correcta
        alert('¡Correcto!');
        fetchPokemonData(); // Cargar el siguiente Pokémon
    } else {
        // La opción seleccionada es incorrecta
        alert('¡Incorrecto!');
        // Puedes agregar lógica adicional aquí, como disminuir la puntuación o mostrar un mensaje de error
    }
}
loadAndDisplayGeneration1Pokemon();
