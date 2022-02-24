<script lang="ts">
	import Header from '../components/Header.svelte';
	import Keyboard from '../components/Keyboard.svelte';
	import Gameboard from '../components/Gameboard.svelte';
	import GameOverModal from '../components/GameOverModal.svelte';
	import StatsModal from '../components/StatsModal.svelte';
	import InfoModal from '../components/InfoModal.svelte';
	import {
		today,
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
		gameOver,
		stats,
		showStats,
		showInfo,
		numGuesses,
		showHint,
		words
	} from '../stores/gameStore';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast'
	import { onMount } from 'svelte';
	import HintModal from '../components/HintModal.svelte';
	import validWords from '../../static/validwords';

	export let newStats = stats;
	export let showModal = false;

	if ($gameOver) {
		showModal = true; 
	}

	function updateArrays(event: any) {
		if (!$gameOver) {
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
	}

	function saveGame() {
		const savedGameObj = {
			saveDate: today,
			currentArray: $currentArray,
			currentLetter: $currentLetter,
			correctLetters: $correctLetters,
			inWordLetters: $inWordLetters,
			wrongLetters: $wrongLetters,
			correctLocations: $correctLocations,
			inWordLocations: $inWordLocations,
			wrongLocations: $wrongLocations,
			hasWon: $hasWon,
			gameOver: $gameOver,
			rows: $gameRows,
			numGuesses: $numGuesses
		};
		window.localStorage.setItem('savedWordlolGameboard', JSON.stringify(savedGameObj));

	}

	function updateStats(): void {
		newStats = stats;
		newStats.totalGames++;
		// was the game won? if so lets track it
		if ($hasWon) {
			newStats.totalWins++;
		}
		// is the last day played yesterday? if so the streak grows
		// otherwise the streak is over :(
		if (Date.parse(today) - Date.parse(newStats.lastDatePlayed) <= 86400000) {
			newStats.currentStreak++;
		} else {
			newStats.currentStreak = 1;
		}
		// has the current streak gotten bigger than the record? 
		if (newStats.currentStreak > newStats.maxDayStreak) {
			newStats.maxDayStreak = newStats.currentStreak;
		}
		newStats.lastDatePlayed = today;
		newStats.winPct = (newStats.totalWins / newStats.totalGames) * 100;
		newStats.numGuesses = $numGuesses;
		window.localStorage.setItem('wordlolstats', JSON.stringify(newStats));

	}

	function checkGuess(): void {
		const guessedWord = $gameRows[$currentArray].join('');
		// if not a valid word then they have to guess again
		if (!validWords.includes(guessedWord) && !words.includes(guessedWord)) {
			toast.push('Not a valid word.', {
				theme: {
					'--toastBarBackground': '#D13639'
				}
			});
			return;
		}
		// only actually check the guess if the current row
		// is filled out
		if (!$gameOver && $currentLetter === $gameRows[$currentArray].length) {
			// track number of guesses for stats
			$numGuesses++;
			
			console.log(guessedWord.slice(0, -1));
			
			let duplicateLetters = false;
			// check letters in current array for accuracy
			for (let i = 0; i < $gameRows[$currentArray].length; i++) {
				const letter = $gameRows[$currentArray][i];
				let countOfLetter = 0;
				// check for duplicate letters
				for (const t of $todaysWord) {
					if (letter === t) countOfLetter++;
				}

				// if duplicates found notify the user
				if (countOfLetter > 1) duplicateLetters = true;

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
			} else if (duplicateLetters) {
				toast.push('One of the letters you guessed appears in the word more than once!');
			}
			// check if they guessed the word or reached the end of guesses
			if ($hasWon || $currentArray === $gameRows.length - 1) {
				$gameOver = true;
				updateStats();
				saveGame();
				showModal = true;
				
			} else {
				$hasWon = false;
				$gameOver = false;
				$currentArray++;
				$currentLetter = 0;
				saveGame();
			}
		}
	}

	export function handleShare(): void {
		if (navigator.share) {
			navigator.share({
				title: 'playwordlol.com',
				text: $hasWon ? `WORDLOL x/6 ${newStats.numGuesses} ${newStats.numGuesses > 1 ? 'guesses' : 'guess'}.` : `Checkout today's wordlol`,
				url: 'http://playwordlol.com'
			})
			.then(() => console.log('Successful share'))
			.catch((error) => console.log('Error sharing', error));
		} else {
			console.log('no navigator share support');
		}
	}

	function handleKeyboardInput(e) {
		const value = e?.key.toUpperCase();
		if (!value) return;
		
		// tests if the key typed is alpha char 
		const isAlpha = typeof value === "string" && value.length === 1 && /[A-Za-z]/.test(value);
		let eventObj = {
			detail: {
				text: value,
				action: null
			}
		};
		if (isAlpha) {
			eventObj.detail.action = 'add';
			updateArrays(eventObj);
		} else if (value === 'ENTER') {
			checkGuess();
		} else if (value === 'BACKSPACE') {
			eventObj.detail.action = 'backspace';
			updateArrays(eventObj);
		}

	}

	onMount(() => {
		const app = new SvelteToast({
		// Set where the toast container should be appended into
		target: document.body
		});
	})

</script>

<svelte:head>
	<title>WORDLOL</title>
</svelte:head>

<svelte:window on:keydown={handleKeyboardInput} />

<main class="flex flex-col h-screen w-screen bg-white min-h-710 max-h-screen">
	<Header />
	<Gameboard />
	{#if $gameOver === true && showModal}
		<GameOverModal bind:showModal={showModal} {newStats} {handleShare}/>
	{/if}
	{#if $showStats === true}
		<StatsModal />
	{/if}
	{#if $showInfo === true }
		<InfoModal />
	{/if}
	{#if $showHint === true }
		<HintModal />
	{/if}
	<Keyboard on:letter={updateArrays} on:checkguess={checkGuess} />
</main>
