'use strict';

const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('.quote-container__quote');
const author = document.querySelector('.quote-container__author');

const twitterBtn = document.querySelector('.buttons-container__twitter-btn');
const newQuoteBtn = document.querySelector('.buttons-container__new-quote-btn');

const loader = document.querySelector('.loader');

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

let apiQuotes = [];

// Get Quotes from API
const getQuotes = async function () {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.error(`Something went wrong: ${error}`);
  }
};

// const getQuotes2 = function () {
//   showLoadingSpinner();

//   const apiUrl = 'https://type.fit/api/quotes';
//   fetch(apiUrl)
//     .then(res => res.json())
//     .then(data => {
//       apiQuotes = data;
//       newQuote();
//     })
//     .catch(err => console.error(`Something went wrong: ${err}`));
// };

// Get random Quote from apiQuotes Array
const newQuote = () => {
  showLoadingSpinner();
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const quote = apiQuotes[getRandomInt(0, apiQuotes.length - 1)];

  author.textContent = quote.author ? quote.author : 'Author not known';

  if (quote.text.length > 120) quoteText.classList.toggle('long-quote');
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
};

// Twee Quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
  window.open(twitterUrl, '_blank');
};

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
