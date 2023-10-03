// generation2.js

// Función para cargar y mostrar Pokémon de la segunda generación
async function loadAndDisplayGeneration2Pokemon() {
    try {
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
        const randomPokemonId = getRandomPokemonIdForGeneration2();
        const pokemonData = await fetchPokemonData(apiUrl + randomPokemonId);

        const correctOption = Math.floor(Math.random() * 4) + 1;
        displayPokemon(pokemonData, correctOption);
    } catch (error) {
        console.error(error);
        // Maneja el error, por ejemplo, muestra un mensaje al usuario
    }
}

// Función para obtener un ID aleatorio de Pokémon de la segunda generación (entre 152 y 251)
function getRandomPokemonIdForGeneration2() {
    return Math.floor(Math.random() * 100) + 152;
}

// Función para mostrar un Pokémon en la interfaz de usuario
function displayPokemon(pokemonData, correctOption) {
    const pokemonName = capitalizeFirstLetter(pokemonData.name);
    const pokemonImage = pokemonData.sprites.front_default;

    // Coloca el nombre y la imagen del Pokémon en la interfaz de usuario
    document.getElementById('pokemon-name').textContent = pokemonName;
    document.getElementById('pokemon-image').src = pokemonImage;

    for (let i = 1; i <= 4; i++) {
        const optionElement = document.getElementById(`option${i}`);

        if (i === correctOption) {
            optionElement.textContent = pokemonName;
            optionElement.addEventListener('click', handleCorrectAnswer);
        } else {
            getRandomWrongPokemonName().then((wrongName) => {
                optionElement.textContent = capitalizeFirstLetter(wrongName);
                optionElement.addEventListener('click', handleIncorrectAnswer);
            });
        }
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
loadAndDisplayGeneration2Pokemon();
