'use strict';

const { wrap } = require('../tools.js');
const { IConfig }  = require('../interfaces.js');
const { validateArguments } = require('../validators.js');

const SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];
const FACES = ['jack', 'queen', 'king', 'ace'];
const JOKER_COLORS = ['red', 'black'];

const generatePips = (deckLength) => {
  const smallestPip = deckLength > 36 ? 2 : 6;
  const suitsLength = SUITS.length;
  const faceCardsAmount = FACES.length * suitsLength;
  const length = (deckLength - faceCardsAmount) / suitsLength;
  const pips = (new Array(length));
  for (let i = 0; i < length; i++) {
    pips[i] = (i + smallestPip).toString();
  }
  return pips;
};

const buildConfig = (deckLength, jokers) => {
  const pips = generatePips(deckLength);
  const ranks = [...pips, ...FACES];
  return {
    suits: SUITS,
    ranks,
    length: deckLength,
    jokers,
  };
};

const buildDeck = (config) => {
  const {
    length,
    suits,
    ranks,
    jokers
  } = config;
  const cards = new Array(length);

  const cardFactory = (rank, suit) => [rank, suit];

  for (let i = 0; i < length; i++) {
    const ranksLength = ranks.length;

    const suitIndex = Math.floor(i / ranksLength);
    const suit = suits[suitIndex];
    const rankIndex = i % ranksLength;
    const rank = ranks[rankIndex];

    const card = cardFactory(rank, suit);
    cards[i] = card;
  }

  if (jokers) {
    for (const color of JOKER_COLORS) {
      const card = cardFactory('joker', color);
      cards.push(card);
    }
  }

  return cards;
};

const createDeck = (deckLength = 52, jokers = false) => {
  const config = buildConfig(deckLength, jokers);
  return buildDeck(config);
};

module.exports = {
  createDeck: wrap(
    validateArguments.bind(null, IConfig),
    createDeck
  ),
};
