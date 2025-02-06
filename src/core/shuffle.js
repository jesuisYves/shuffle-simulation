'use strict';

const splitCards = (cards, arbitrary = false) => {
  const length = cards.length;
  if (length === 2) return [cards, []];
  const splitIndex = arbitrary ?
    length - Math.ceil(Math.random() * (length / 5)) :
    Math.ceil(length / 2);
  const right = cards.slice(0, splitIndex);
  const left = cards.slice(splitIndex);
  return [left, right];
};

const overhand = (deck) => {
  const shuffled = [];
  let remaining = deck;

  while (remaining.length > 0) {
    const [fall, stay] = splitCards(remaining, true);
    shuffled.push(...fall);
    remaining = stay;
  }

  return shuffled;
};

const faro = (deck) => {
  const length = deck.length;
  const [left, right] = splitCards(deck);
  const shuffled = new Array(length);

  const mixStartingHand = (left, right) => {
    const number = Math.random();
    if (number < 0.5) return [right, left];
    return [left, right];
  };

  const [front, rear] = mixStartingHand(left, right);
  for (let i = 0; i < length; i += 2) {
    const localI = i / 2;
    const cardL = front[localI];
    const cardR = rear[localI];
    shuffled[i] = cardL;
    shuffled[i + 1] = cardR;
  }

  return shuffled;
};

module.exports = { overhand, faro };
