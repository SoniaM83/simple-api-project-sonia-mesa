onmessage = function(event) {
    const pokemon= event.data;

    const processedPokemon = pokemon.name.toUpperCase(); //CAPITALIZE THE POKEMON NAME
    postMessage(processedPokemon); //SEND INFO TO MAIN THREAD
};