const quoteselect = document.querySelector(".quoteinner");
const authorselect = document.querySelector(".quote-author");
const refreshBtn = document.querySelector(".refresh-btn");
const speechBtn = document.querySelector(".sound-btn");
const copyBtn = document.querySelector(".copy-btn");
const tweetBtn = document.querySelector(".tweet-btn");
let quotesData=[]

function displayQuote() {
  const quote = quotesData[Math.floor(Math.random() * quotesData.length)];
  if (!quote.Author) {
    authorselect.textContent = 'Author Unknown';
  } else {
    authorselect.textContent = " - " + quote.Author;
  }
  // Show quote
  quoteselect.textContent = quote.Quote;
  
}

//function to get quotes from api
async function getQuotes() {
  const apiLink = 'https://leilayesufu.github.io/api/data/quotes.json';
    try {
      const response = await fetch(apiLink);
      quotesData = await response.json()
      displayQuote();
    } catch (error) {
      // Catch Error Here
    }
  }


//generate the sound of the quote
function quoteToSound() {
  const text = quoteselect.textContent;
  const soundi = new SpeechSynthesisUtterance(
    text + " by " + authorselect.textContent.replace("-", "")
  );
  soundi.lang = "en-US";
  speechSynthesis.speak(soundi);
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteselect.innerText} - ${authorselect.innerText}`;
  window.open(twitterUrl, '_blank');
}

//copy quote to clipboard
function copyQuote() {
  //copy the quote to the clipboard
  const text = quoteselect.textContent;
  navigator.clipboard.writeText(text);

  //show the copy success message
  alert("copied to clipboard");
}
 
//run function on load
getQuotes()

//hook up event listeners
refreshBtn.addEventListener("click",getQuotes)
speechBtn.addEventListener("click", quoteToSound)
tweetBtn.addEventListener("click", tweetQuote)
copyBtn.addEventListener("click", copyQuote)