'use strict';

const DECKS = [36, 40, 48, 52];

const IConfig = [
  {
    validate: (length) => DECKS.includes(length),
    message: `Cannot create such deck. Allowed values: ${DECKS}`,
  },
  {
    validate: (flag = false) => typeof flag === 'boolean',
    message: '"jokers" are expected to be boolean',
  },
];

const ICard = {
  validate: (card) =>
    (Array.isArray(card) && card.length === 2),
  message: 'Card must be an array of [rank, suit]',
};

const IDeck = {
  validate: (deck) => {
    if (!Array.isArray(deck)) return false;
    let isNormalized = true;
    for (const card of deck) {
      isNormalized = isNormalized && ICard.validate(card);
    }
    return isNormalized;
  },
  message: 'Deck must be a non-empty array of valid cards',
};

const IFindNonshuffled = [
  IDeck,
  IDeck,
  ([before, after]) => {
    if (before.length !== after.length)
      throw new Error('The decks should have the same number of cards');
  },
];

const IBenchmark = [
  IDeck,
  {
    validate: (fn) => typeof fn === 'function',
    errorMessage: '"shuffle" should be a function',
  },
  {
    validate: (num) => Number.isInteger(num),
    errorMessage: '"maxIterations" must be an integer',
  },
];

module.exports = {
  IConfig,
  IDeck,
  IFindNonshuffled,
  IBenchmark,
};
