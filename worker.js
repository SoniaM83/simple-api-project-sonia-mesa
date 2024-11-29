onmessage = function(event) {
    const quote= event.data;

    const processedQuote = quote.toUpperCase();
    postMessage(processedQuote);
};