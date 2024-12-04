const API_URL = 'https://zenquotes.io/api/random';
const LOCAL_STORAGE_KEY = 'savedQuotes';

function loadSavedQuotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

//UTILITY FUNCTION TO LOAD SAVED QUOTES FROM LocalStorage
function saveQuotesToLocalStorage(quotes) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(quotes));
}

//DISPLAY SAVED QUOTES FROM LocalStorage
function displaySavedQuotes() {
  const savedQuotes = loadSavedQuotes();
  const quoteList = document.getElementById('quoteList');
  quoteList.innerHTML = ''; //CLEARS EXISTING LIST ITEMS

  savedQuotes.forEach((quote, index) => {
    const li = document.createElement('li');
    li.textContent = `"${quote.content}" - ${quote.author}`;
    li.dataset.index = index; //ADD INDEX FOR POTENTIAL DELETION
    quoteList.appendChild(li);
  });
}

// Function to fetch a random Zen quote from the ZenQuotes API
async function fetchQuote() {
    try {
      console.log("Fetching quote...")
      const response = await fetch(API_URL); // FETCH DATA FROM the API using async/await
      if (!response.ok) {   //CHECK IF RESPONSE IS OK, ELSE THROW AN ERROR
        throw new Error(`Failed to fetch quote.`);
      }
        const data = await response.json();  // PARSE THE RESPONSE as JSON

      //DISPLAY FETCHED QUOTE
      const quote = data[0]; //data[0] IS THE ARRAY WITH THE QUOTE AND AUTHOR
      document.getElementById('quote').innerHTML = `"${quote.q}" - ${quote.a}`;
      
      const savedQuotes = loadSavedQuotes();
      savedQuotes.push({content: quote.q, author: quote.a});
      saveQuotesToLocalStorage(savedQuotes);

      displaySavedQuotes(); //REFRESH DISPLAYED SAVED QUOTES

      } catch (error) {
        console.error('Error fetching quote:', error);
        document.getElementById('quote').innerHTML = 'Failed to fetch quote. Please try again.';
      }
    }

function deleteLastQuote() {
  const savedQuotes = loadSavedQuotes();
  if (savedQuotes.length > 0) {
    savedQuotes.pop(); //REMOVES THE LAST QUOTE
    saveQuotesToLocalStorage(savedQuotes);
    displaySavedQuotes();
  } else {
    alert(`No quotes to delete!`);
  }
}

//INITIALIZE APP AND BIND EVENT LISTENERS
function init() {
  document.getElementById('fetchQuoteBtn').addEventListener('click', fetchQuote);
  document.getElementById('deleteQuoteBtn').addEventListener('click', deleteLastQuote);

//DISPLAY SAVED QUOTES ON LOAD
  displaySavedQuotes();
}

init();
