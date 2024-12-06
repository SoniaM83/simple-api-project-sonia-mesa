onmessage = function(event) {
    const pokemon= event.data;

    const processedPokemon = pokemon.toUpperCase();
    postMessage(processedPokemon);
};