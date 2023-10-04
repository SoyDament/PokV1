// Obtenemos los elementos del DOM
const pokemonImage = document.getElementById('pokemon-image');
const options = document.getElementById('options');
const message = document.getElementById('message');

// Función para obtener un número aleatorio entre 1 y 150 (para obtener Pokémon de la Pokedex original)
function getRandomPokemonNumber() {
    return Math.floor(Math.random() * 150) + 1;
}

// Función para cargar y mostrar un Pokémon al azar
async function loadRandomPokemon() {
    try {
        const pokemonNumber = getRandomPokemonNumber();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
        const data = await response.json();

        const pokemonName = data.name;
        const pokemonSprite = data.sprites.front_default;
        const correctOption = pokemonName.toUpperCase();

        // Mostrar la imagen del Pokémon
        pokemonImage.src = pokemonSprite;
        pokemonImage.alt = `Imagen de ${pokemonName}`;

        // Generar opciones de respuesta (una correcta y tres incorrectas)
        const optionsArray = [correctOption];
        while (optionsArray.length < 4) {
            const randomOption = data.species.name.toUpperCase(); // Opción incorrecta al azar
            if (!optionsArray.includes(randomOption)) {
                optionsArray.push(randomOption);
            }
        }

        // Barajar las opciones para que la correcta no siempre esté en la misma posición
        optionsArray.sort(() => Math.random() - 0.5);

        // Mostrar las opciones en los botones
        options.innerHTML = '';
        optionsArray.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.textContent = option;
            options.appendChild(button);
        });

        // Limpiar el mensaje anterior
        message.textContent = '¡Elige una opción!';
    } catch (error) {
        console.error('Error al obtener datos del Pokémon:', error);
    }
}

// Evento de clic en las opciones
options.addEventListener('click', event => {
    if (event.target.classList.contains('option')) {
        const selectedOption = event.target.textContent.toUpperCase();
        const correctOption = pokemonImage.alt.split(' ')[2].toUpperCase(); // Obtener la opción correcta del alt de la imagen

        if (selectedOption === correctOption) {
            message.textContent = '¡Correcto! ¡Ese es el Pokémon!';
        } else {
            message.textContent = '¡Incorrecto! Inténtalo de nuevo.';
        }

        // Cargar y mostrar otro Pokémon después de unos segundos
        setTimeout(loadRandomPokemon, 2000);
    }
});

// Inicializar el juego cargando el primer Pokémon
loadRandomPokemon();
