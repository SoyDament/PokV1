// utils.js

// Función para mezclar aleatoriamente un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para generar opciones (3 incorrectas y 1 correcta)
function generateOptions(correctOption) {
    const options = [];

    while (options.length < 4) {
        // Generar una opción incorrecta aleatoriamente
        const randomOption = getRandomIncorrectOption(correctOption);
        if (!options.includes(randomOption) && randomOption !== correctOption) {
            options.push(randomOption);
        }
    }

    // Insertar la opción correcta en una posición aleatoria
    const randomIndex = Math.floor(Math.random() * 4);
    options.splice(randomIndex, 0, correctOption);

    // Mezclar aleatoriamente las opciones
    shuffleArray(options);

    return options;
}

// Función para obtener una opción incorrecta aleatoria
function getRandomIncorrectOption() {
    // Puedes implementar la lógica para generar opciones incorrectas de manera aleatoria
    // Por ejemplo, puedes seleccionar nombres de Pokémon al azar
    const incorrectOptions = ['Incorrect1', 'Incorrect2', 'Incorrect3', 'Incorrect4'];
    return incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
}

// utils.js

function redirectToGame(selectedGeneration) {
    // Construir la URL de la página del juego con la generación seleccionada como parámetro
    const gameUrl = `game.html?generation=${selectedGeneration}`;

    // Redirigir a la página del juego
    window.location.href = gameUrl;
}


export { generateOptions, shuffleArray, redirectToGame };
