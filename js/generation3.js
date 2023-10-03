// generation3.js

// Función para cargar y mostrar Pokémon de la tercera generación
async function loadAndDisplayGeneration3Pokemon() {
    try {
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
        const randomPokemonId = getRandomPokemonIdForGeneration3();
        const pokemonData = await fetchPokemonData(apiUrl + randomPokemonId);

        const correctOption = Math.floor(Math.random() * 4) + 1;
        displayPokemon(pokemonData, correctOption);
    } catch (error) {
        console.error(error);
        // Maneja el error, por ejemplo, muestra un mensaje al usuario
    }
}

// Función para obtener un ID aleatorio de Pokémon de la tercera generación (entre 252 y 386)
function getRandomPokemonIdForGeneration3() {
    return Math.floor(Math.random() * 135) + 252;
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
loadAndDisplayGeneration3Pokemon();
