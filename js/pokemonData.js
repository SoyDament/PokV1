// pokemonData.js
import { getPokemonTypes } from './pokemonLoader.js';

// Función para generar opciones de nombres de Pokémon
function generatePokemonNameOptions(correctPokemon, allPokemon) {
    const options = [correctPokemon.name]; // Agrega el nombre del Pokémon correcto

    // Obtén nombres aleatorios de otros Pokémon de la misma generación
    const sameGenerationPokemon = allPokemon.filter(pokemon => pokemon.generation === correctPokemon.generation && pokemon.name !== correctPokemon.name);

    for (let i = 0; i < 3; i++) {
        const randomPokemon = getRandomPokemon(sameGenerationPokemon);
        options.push(randomPokemon.name);
    }

    // Mezcla las opciones para que el Pokémon correcto no siempre esté en la misma posición
    return shuffleArray(options);
}

// Función para generar opciones de tipos de Pokémon
async function generatePokemonTypeOptions(correctPokemonUrl, allPokemon) {
    try {
        const correctPokemonResponse = await fetch(correctPokemonUrl);
        const correctPokemonData = await correctPokemonResponse.json();
        const correctPokemonTypes = getPokemonTypes(correctPokemonData);

        const options = [...correctPokemonTypes];

        // Agrega tipos aleatorios de otros Pokémon de la misma generación
        const sameGenerationPokemon = allPokemon.filter(pokemon => pokemon.generation === correctPokemonData.generation && pokemon.name !== correctPokemonData.name);

        for (let i = 0; i < 3; i++) {
            const randomPokemon = getRandomPokemon(sameGenerationPokemon);
            const randomPokemonTypes = getPokemonTypes(randomPokemon);
            options.push(...randomPokemonTypes);
        }

        // Mezcla las opciones para que los tipos correctos no siempre estén en la misma posición
        return shuffleArray(options);
    } catch (error) {
        console.error(error);
        // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
        return [];
    }
}

// Función para obtener un Pokémon aleatorio de la lista
function getRandomPokemon(pokemonList) {
    return pokemonList[Math.floor(Math.random() * pokemonList.length)];
}

// Función para mezclar un array aleatoriamente (algoritmo de Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Exportar las funciones que necesitarás en otros archivos
export { generatePokemonNameOptions, generatePokemonTypeOptions };
