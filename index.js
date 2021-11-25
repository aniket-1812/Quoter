const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


// Show Loading
function startLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quote from API
async function getQuote() {
    startLoadingSpinner(); // start loading
    const apiUrl = "https://api.quotable.io/random";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // If author is blank add unknown
        if (data.author === "") {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.author;
        }

        if (data.content > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        } 
        quoteText.innerText = data.content;
        // stop loading show quote
        removeLoadingSpinner();
    } catch (error) {
        console.log(error);
        getQuote();
    }
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuote();