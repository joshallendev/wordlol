import { readable, writable } from "svelte/store";

const todaysWord = readable("POPPY");
const correctGuesses = writable([]);
const wrongGuesses = writable([]);
const guessedWords = writable([]);
const currentRow = writable(0);
const correctLetters = writable([]);
const wrongLetters = writable([]);
const inWordLetters = writable([]);

const correctLocations = writable([]);
const wrongLocations = writable([]);
const inWordLocations = writable([]);

export { todaysWord, correctGuesses, wrongGuesses, guessedWords, currentRow, correctLetters, wrongLetters, correctLocations, wrongLocations, inWordLocations, inWordLetters}