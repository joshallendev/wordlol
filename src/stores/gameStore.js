import { readable, writable } from "svelte/store";

const todaysWord = readable("PENTA");
const correctGuesses = writable([]);
const wrongGuesses = writable([]);
const guessedWords = writable([]);
const currentRow = writable(0);
const correctLetters = writable([]);

export { todaysWord, correctGuesses, wrongGuesses, guessedWords, currentRow, correctLetters}