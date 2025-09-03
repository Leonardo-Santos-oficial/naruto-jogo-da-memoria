import { shuffle } from './shuffle';

// Base Naruto character set (value links pairs)
const NARUTO_CHARACTERS = [
  'naruto',
  'sasuke',
  'sakura',
  'kakashi',
  'itachi',
  'gaara',
  'hinata',
  'jiraiya',
];

let uid = 0;
const nextId = () => {
  uid += 1;
  return uid;
};

export function createCard(value) {
  return {
    id: nextId(),
    value,
    isFlipped: false,
    isMatched: false,
  };
}

export function generateCards(customValues) {
  const values = Array.isArray(customValues) && customValues.length > 0 ? customValues : NARUTO_CHARACTERS;
  const pairs = values.flatMap((v) => [createCard(v), createCard(v)]);
  return shuffle(pairs);
}

export function resetIds() {
  uid = 0;
}

export const DEFAULT_VALUES = NARUTO_CHARACTERS;

export default generateCards;
