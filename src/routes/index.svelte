<script lang="ts">
	import Header from '../components/Header.svelte';
	import Keyboard from '../components/Keyboard.svelte';
	import Gameboard from '../components/Gameboard.svelte';
	import {
		todaysWord,
		correctLocations,
		wrongLocations,
		inWordLocations,
		correctLetters,
		wrongLetters,
		inWordLetters,
        currentArray,
        currentLetter,
        gameRows,
		hasWon,
		gameOver
	} from '../stores/gameStore';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/env';

	let guessCount = 0;

	function updateArrays(event) {
        const text = event.detail.text;
		switch (event.detail.action) {
			case 'add':
				if ($currentLetter < $gameRows[$currentArray].length) {
					$gameRows[$currentArray][$currentLetter] = text;
					$currentLetter++;
				}
				break;
			case 'backspace':
				// go back a letter but never lass than 0
				$currentLetter > 0 ? $currentLetter-- : null;
				$gameRows[$currentArray][$currentLetter] = '';
				break;
			default:
				break;
		}
	}

	function saveGame() {
		if (browser) {
			const savedGameObj = {
				saveDate: new Date().toDateString(), 
				currentArray: $currentArray, 
				currentLetter: $currentLetter,
				correctLetters: $correctLetters,
				inWordLetters: $inWordLetters,
				wrongLetters: $wrongLetters,
				correctLocations: $correctLocations,
				inWordLocations: $inWordLocations,
				wrongLocations: $wrongLocations,
				hasWon: $hasWon,
				gameover: $gameOver,
				rows: $gameRows
			}
			window.localStorage.setItem('savedWordlolGameboard', JSON.stringify(savedGameObj));
		}
	}

	function checkGuess() {
		// only actually check the guess if the current row
		// is filled out
		if ($currentLetter === $gameRows[$currentArray].length) {
			// track number of guesses for stats
			guessCount++;

			let guessedWord = $gameRows[$currentArray].join('');
			// check letters in current array for accuracy
			for (let i = 0; i < $gameRows[$currentArray].length; i++) {
				const letter = $gameRows[$currentArray][i];
				// if is in right position
				if (letter === $todaysWord[i]) {
					$correctLocations = [...$correctLocations, [$currentArray, i]];
					$correctLetters = [...$correctLetters, letter];
				} else if ($todaysWord.includes(letter)) {
					$inWordLocations = [...$inWordLocations, [$currentArray, i]];
					$inWordLetters = [...$inWordLetters, letter];
				} else {
					$wrongLocations = [...$wrongLocations, [$currentArray, i]];
					$wrongLetters = [...$wrongLetters, letter];
				}
				// else if included in the word at all
				// otherwise not a valid letter
			}
			if (guessedWord === $todaysWord) {
				$hasWon = true;
			}
			// check if they guessed the word or reached the end of guesses
			if ($hasWon || $currentArray === $gameRows.length - 1) {
				$gameOver = true;
				saveGame();
			} else {
				$hasWon = false;
				$gameOver = false;
				$currentArray++;
				$currentLetter = 0;
				saveGame();
			}
		}
	}

</script>

<main class="h-screen w-screen bg-sunray">
	<Header />
	<Gameboard />
	<Keyboard on:letter={updateArrays} on:checkguess={checkGuess} />
	<!-- {#if gameOver }
        
    {/if} -->
</main>
