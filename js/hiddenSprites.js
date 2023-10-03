// hiddenSprites.js

// Obtener el contenedor de sprites una vez para evitar búsquedas repetidas
const spritesContainer = document.getElementById('sprites-container');

// Función para ocultar los sprites de los Pokémon y mostrar la silueta (solo en modo difícil)
function hidePokemonSprites() {
    // Ocultar todos los sprites (puedes adaptar esto según tu estructura HTML/CSS)
    const sprites = spritesContainer.querySelectorAll('img');
    sprites.forEach((sprite) => {
        sprite.style.display = 'none';
    });

    // Mostrar la silueta u otra representación en modo difícil
    // Puedes agregar aquí el código para mostrar la silueta o cualquier otro elemento
}

// Función para mostrar los sprites de los Pokémon
async function showPokemonSprites() {
    try {
        // Realizar una solicitud a la API de pokeapi.co para obtener información de los Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');

        if (!response.ok) {
            throw new Error('Error fetching Pokémon data');
        }

        const pokemonData = await response.json();

        // Obtener los sprites de los Pokémon
        const sprites = pokemonData.results.map((pokemon) => pokemon.url);

        // Mostrar los sprites en tu juego
        displayPokemonSprites(sprites);
    } catch (error) {
        console.error(error);
        // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
    }
}

// Función para mostrar los sprites en el juego
function displayPokemonSprites(sprites) {
    // Limpiar el contenedor antes de mostrar los nuevos sprites
    spritesContainer.innerHTML = '';

    // Recorrer las URLs de los sprites y crear imágenes para cada uno
    sprites.forEach((spriteUrl) => {
        const img = document.createElement('img');
        img.src = spriteUrl;
        img.alt = 'Pokemon Sprite'; // Agrega un texto alternativo apropiado para la accesibilidad
        spritesContainer.appendChild(img); // Agregar la imagen al contenedor
    });
}

// Función para manejar la lógica de acuerdo a la dificultad seleccionada
function handleDifficultySelection(difficulty) {
    switch (difficulty) {
        case 'easy':
        case 'medium':
            showPokemonSprites();
            // Aquí puedes agregar lógica adicional según el modo fácil o medio
            break;
        case 'hard':
            hidePokemonSprites();
            // Aquí puedes agregar lógica adicional según el modo difícil
            break;
        default:
            console.warn(`Dificultad no reconocida: ${difficulty}`);
            break;
    }
}

// Exportar las funciones necesarias
export { hidePokemonSprites, showPokemonSprites, handleDifficultySelection };
