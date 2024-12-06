const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const LOCAL_STORAGE_KEY = 'savedPokemon';

function loadSavedPokemons() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

//UTILITY FUNCTION TO LOAD SAVED POKEMON FROM LocalStorage
function savePokemonToLocalStorage(pokemon) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pokemon));
}

//DISPLAY SAVED POKEMON FROM LocalStorage
function displaySavedPokemons() {
  const savedPokemons = loadSavedPokemons();
  const pokemonList = document.getElementById('pokemonList');
  pokemonList.innerHTML = ''; //CLEARS EXISTING LIST ITEMS


  if (savedPokemons.length === 0) {
    pokemonList.innerHTML = '<li>No saved Pokemon</li>';
  } else {

  savedPokemons.forEach((pokemon, index) => {
    const li = document.createElement('li');
    li.textContent = `${pokemon.name} - ${pokemon.weight}`;
    li.dataset.index = index; //ADD INDEX FOR POTENTIAL DELETION
    pokemonList.appendChild(li);
  });
}
}

//FUNCTION TO FETCH A RANDOM POKEMON FROM the POKE API
async function fetchPokemon() {
    try {
      console.log("Fetching Pokemon...")
      
      const randomId = Math.floor(Math.random() * 100) + 1; //RANDOMLY SELECTS AN ID FROM 1 TO 100
      const response = await fetch(`${API_URL}/${randomId}`); // FETCH DATA FROM the API using THE RANDOM ID
      if (!response.ok) {   //CHECK IF RESPONSE IS OK, ELSE THROW AN ERROR
        throw new Error('Failed to fetch Pokemon. Please try again later.');
      }
        const data = await response.json();  // PARSE THE RESPONSE as JSON

      //DISPLAY FETCHED POKEMON
      const pokemon = data;
      document.getElementById('pokemon').innerHTML = `${pokemon.name} - ${pokemon.weight}`;
      
      const savedPokemons = loadSavedPokemons();
      savedPokemons.push({name: pokemon.name, weight: pokemon.weight});
      savePokemonToLocalStorage(savedPokemons);

      displaySavedPokemons(); //REFRESH DISPLAYED SAVED POKEMON

      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        document.getElementById('pokemon').innerHTML = 'Failed to fetch Pokemon. Please try again.';
      }
    }

function deleteLastPokemon() {
  const savedPokemons = loadSavedPokemons();
  if (savedPokemons.length > 0) {
    savedPokemons.pop(); //REMOVES THE LAST POKEMON
    savePokemonToLocalStorage(savedPokemons);
    displaySavedPokemons();
  } else {
    alert(`No Pokemon to delete!`);
  }
}

//INITIALIZE APP AND BIND EVENT LISTENERS
function init() {
  document.getElementById('fetchPokemonBtn').addEventListener('click', fetchPokemon);
  document.getElementById('deletePokemonBtn').addEventListener('click', deleteLastPokemon);

//DISPLAY SAVED POKEMON ON LOAD
  displaySavedPokemons();
}

init();