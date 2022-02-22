<script lang="ts">
	import Header from '../components/Header.svelte';
	import Keyboard from '../components/Keyboard.svelte';
	import Gameboard from '../components/Gameboard.svelte';
	import GameOverModal from '../components/GameOverModal.svelte';
	import StatsModal from '../components/StatsModal.svelte';
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
		showStats
	} from '../stores/gameStore';

	let guessCount = 0;
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
			numGuesses: guessCount
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
		console.log(Date.parse(today) - Date.parse(newStats.lastDatePlayed));
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
		newStats.numGuesses = guessCount;
		window.localStorage.setItem('wordlolstats', JSON.stringify(newStats));

	}

	function checkGuess(): void {
		// only actually check the guess if the current row
		// is filled out
		if (!$gameOver && $currentLetter === $gameRows[$currentArray].length) {
			// track number of guesses for stats
			guessCount++;

			const guessedWord = $gameRows[$currentArray].join('');
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
			} else {
				// notify?
			}
			// check if they guessed the word or reached the end of guesses
			if ($hasWon || $currentArray === $gameRows.length - 1) {
				console.log('game over');
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
				text: $hasWon ? `I beat today's wordlol game in ${newStats.numGuesses} ${newStats.numGuesses > 1 ? 'guesses' : 'guess'}.` : `Checkout today's wordlol`,
				url: 'http://playwordlol.com'
			})
			.then(() => console.log('Successful share'))
			.catch((error) => console.log('Error sharing', error));
		} else {
			console.log('no navigator share support');
		}
	}


</script>

<main class="flex flex-col h-screen w-screen bg-[#f2f2f2] justify-between min-h-710 max-h-screen">
	<Header />
	<Gameboard />
	{#if $gameOver === true && showModal}
		<GameOverModal bind:showModal={showModal} {newStats} {handleShare}/>
	{/if}
	{#if $showStats === true}
		<StatsModal />
	{/if}
	<Keyboard on:letter={updateArrays} on:checkguess={checkGuess} />
</main>

