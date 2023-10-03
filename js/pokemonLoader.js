// pokemonLoader.js

async function fetchPokemonData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error fetching Pokémon data from URL: ${url}`);
        }

        const pokemonData = await response.json();
        return pokemonData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { fetchPokemonData };
