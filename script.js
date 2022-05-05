"use strict";

let apiQuotes = [];

// Show new quote
const newQuote = function () {
  const getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const quote = apiQuotes[getRandomInt(0, apiQuotes.length - 1)];
  return quote;
};



// Get Quotes from API
const getQuotes = async function () {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
};

// On Load
getQuotes();


