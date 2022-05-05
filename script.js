"use strict";

const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector(".quote-container__quote");
const author = document.querySelector(".quote-container__author");

const twitterBtn = document.querySelector(".buttons-container__twitter-btn");
const newQuoteBtn = document.querySelector(".buttons-container__new-quote-btn");

const loader = document.querySelector(".loader");

// Show Loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide Loading
const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

let apiQuotes = [];

// Show new quote
const newQuote = () => {
  loading();
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const quote = apiQuotes[getRandomInt(0, apiQuotes.length - 1)];

  author.textContent = quote.author ? quote.author : "Author not known";

  if (quote.text.length > 120) quoteText.classList.toggle("long-quote");
  quoteText.textContent = quote.text;
  complete();
};

// Get Quotes from API
const getQuotes = async function () {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
};

// Twee Quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
