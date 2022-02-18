import { readable, writable } from "svelte/store";

const todaysWord = readable("PENTA");
const correctGuesses = writable([]);
const wrongGuesses = writable([]);

export { todaysWord, correctGuesses, wrongGuesses }