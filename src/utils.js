'use strict';

const { wrap } = require('./tools.js');
const {
  IFindNonshuffled,
  IBenchmark,
} = require('./interfaces.js');
const { validateArguments } = require('./validators.js');

const isSequence = (deckBefore, prevCard, currentCard) => {
  if (!prevCard || !currentCard) return false;
  const findPosition = (...cards) => findCardPosition(deckBefore, ...cards);
  const i = deckBefore.indexOf(prevCard);
  const j = deckBefore.indexOf(currentCard);
  const relativePosition = j - i;
  return relativePosition === 1;
};

const findNonshuffled = (before, after) => {
  const areNext = isSequence.bind(null, before);

  const sequences = [];
  let prevCard = null;
  let continuing = null;
  for (const card of after) {
    if (areNext(prevCard, card)) {
      if (continuing) {
        continuing.push(card);
      } else {
        const newSequence = [prevCard, card];
        sequences.push(newSequence);
        continuing = newSequence;
      }
    } else {
      continuing = null;
    }
    prevCard = card;
  }

  return sequences;
};

const calculateAverage = (total, length) => {
  if (length === 0) return 0;
  return total / length;
};

const benchmark = (deck, shuffle, maxIterations) => {
  const initial = [...deck];

  for (let i = 0; i < maxIterations; i++) deck = shuffle(deck);

  const sequences = findNonshuffled(initial, deck);
  let totalLength = 0;
  let longestSequence = 0;
  for (const sequence of sequences) {
    const length = sequence.length;
    totalLength += length;
    if (length > longestSequence) longestSequence = length;
  }

  return {
    totalSequences: sequences.length,
    averageSequenceLength: calculateAverage(totalLength, sequences.length),
    longestSequence
  };
};

module.exports = {
  findNonshuffled: wrap(
    validateArguments.bind(null, IFindNonshuffled),
    findNonshuffled
  ),
  benchmark: wrap(
    validateArguments.bind(null, IBenchmark),
    benchmark
  ),
};
