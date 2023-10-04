// pokemonUtils.js

// Función para obtener un Pokémon aleatorio de una generación específica
async function getRandomPokemonByGeneration(generation) {
    // Asegúrate de que 'generation' sea un número válido
    if (isNaN(generation)) {
        console.error(`Invalid generation: ${generation}`);
        return null;
    }

    // Determina el rango de números de Pokémon para la generación seleccionada
    let minPokemonId, maxPokemonId;

    switch (generation) {
        case 1:
            minPokemonId = 1;
            maxPokemonId = 151; // Cantidad total de Pokémon de la primera generación
            break;
        case 2:
            minPokemonId = 152;
            maxPokemonId = 251; // Cantidad total de Pokémon de la segunda generación
            break;
        case 3:
            minPokemonId = 252;
            maxPokemonId = 386; // Cantidad total de Pokémon de la tercera generación
            break;
        default:
            console.error(`Invalid generation: ${generation}`);
            return null;
    }

    // Genera un número aleatorio dentro del rango de la generación
    const randomPokemonId = Math.floor(Math.random() * (maxPokemonId - minPokemonId + 1)) + minPokemonId;

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`;

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
        throw error;
    }
}

export { getRandomPokemonByGeneration };
