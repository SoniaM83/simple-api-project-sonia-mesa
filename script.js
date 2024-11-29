// Function to fetch a random Zen quote from the ZenQuotes API
async function fetchQuote() {
    try {
      console.log("Fetching quote...");
      
      // Fetch data from the API using async/await
      const response = await fetch('https://api.quotable.io/random');
      
      // Check if response is ok, else throw an error
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the response as JSON
      const data = await response.json();
      console.log('Received data:', data);
      
      // Display the quote and author
      document.getElementById('quote').innerHTML = `"${data.content}" - ${data.author}`;

        console.log('Received data:', data);

      // Example of Promise.all()
      const additionalQuotes = await Promise.all([
        fetch('https://zenquotes.io').then(res => res.json()), // First quote
        fetch('https://zenquotes.io/').then(res => res.json())  // Second quote
      ]);
  
      console.log('Additional Quotes from Promise.all:', additionalQuotes);
  
      // Example of Promise.any()
      const result = await Promise.any([
        fetch('https://zenquotes.io/').then(res => res.json()),
        fetch('https://zenquotes.io/').then(res => res.json())
      ]);
      console.log('One quote from Promise.any:', result);

      // Use of web worker for offloading quote processing
      processQuoteInWorker(result[0].q);
      
    } catch (error) {
      console.error('Error fetching quote:', error);
      document.getElementById('quote').innerHTML = "Sorry, something went wrong. Please try again.";
    }
  }
  
  // Web Worker setup to process quote in the background
  function processQuoteInWorker(quote) {
    const worker = new Worker('worker.js'); // Load web worker
    worker.postMessage(quote); // Send quote to worker
    
    worker.onmessage = function(event) {
      console.log('Processed quote:', event.data);
      document.getElementById('quote').innerHTML += `<br><b>Processed Quote:</b> ${event.data}`;
    };
    
    worker.onerror = function(error) {
      console.log('Web Worker error:', error);
    };
  }
  