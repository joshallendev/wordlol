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
		words,
		maxGuesses,
		hintsUsed,
		saveVersion,
		showSettings,
		themePref,
		revealedLetters
	} from '../stores/gameStore';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import HintModal from '../components/HintModal.svelte';
	import validWords from '../../static/validwords';
	import Particles from '../components/Particles.svelte';
	import SettingsModal from '../components/SettingsModal.svelte';

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
					if ($currentLetter < $gameRows[$currentArray].letters.length) {
						$gameRows[$currentArray].letters[$currentLetter].content = text;
						$currentLetter++;
					}
					break;
				case 'backspace':
					// go back a letter but never lass than 0
					$currentLetter > 0 ? $currentLetter-- : null;
					$gameRows[$currentArray].letters[$currentLetter].content = '';
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
			numGuesses: $numGuesses,
			hints: $hintsUsed,
			saveVersion,
			revealedLetters: $revealedLetters
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
		if (!newStats.guessCounts) {
			newStats.guessCounts = {};
		}
		if (newStats.guessCounts[$numGuesses]) {
			newStats.guessCounts[$numGuesses] += 1;
		} else {
			newStats.guessCounts[$numGuesses] = 1;
		}
		newStats.hints = newStats.hints + $hintsUsed;
		console.table(newStats);
		window.localStorage.setItem('wordlolstats', JSON.stringify(newStats));
	}

	function replaceAtIndex(str, index, newValue) {
		if (index > str.length - 1) {
			return str;
		} else {
			return str.substring(0, index) + newValue + str.substring(index + 1);
		}
	}

	function addToArrIfNotExists(elem, arr) {
		if (arr.indexOf(elem) < 0) {
			arr.push(elem);
		}
	}

	function checkGuess(): void {
		toast.pop(0);
		if (!$gameOver) {
			const guessedWord = $gameRows[$currentArray].letters.reduce(
				(prev, curr) => prev.concat('', curr.content),
				''
			);
	
			if (guessedWord.length < $todaysWord.word.length) {
				toast.push('Not enough letters', {
					theme: {
						'--toastBarBackground': '#D13639'
					}
				});
				return;
			}
	
			// if not a valid word then they have to guess again
			if (!validWords.includes(guessedWord) && !words.some((e) => e.word === guessedWord)) {
				toast.push('Not a valid word', {
					theme: {
						'--toastBarBackground': '#D13639'
					}
				});
				return;
			}

			console.log($revealedLetters);

			// hard mode edits 
			if ($themePref.hardmode === true && $revealedLetters.length > 0) {
				console.log($revealedLetters);
				let unusedLetter = 0;
				for (let index = 0; index < $revealedLetters.length; index++) {
					if (!guessedWord.includes($revealedLetters[index])) {
						console.log(index);
						unusedLetter++;
					}
					
				}
				if (unusedLetter > 0) {
					toast.push(`Hard Mode is enabled. You must use previously revealed letters: ${$revealedLetters.join(', ')}`, {
						theme: {
							'--toastBarBackground': '#D13639'
						}
					});
					return;
				}
			}
	
			// track number of guesses for stats
			$numGuesses++;
	
			let tempUserWord = guessedWord;
			let tempTodaysWord = $todaysWord.word;
			let letterCount = {};
	
			// check for duplicate letters
			// for (let i = 0; i < tempUserWord.length; i++) {
			// 	const ltrRegex = new RegExp()
			// 	if (tempTodaysWord.match(/[tempUserWord[i]]/)) {
			// 		letterCount[tempUserWord[i]] += 1;
			// 	}
			// }
	
			// check for correct letters
			for (let i = 0; i < tempUserWord.length; i++) {
				if (tempUserWord[i] === tempTodaysWord[i]) {
					addToArrIfNotExists(tempUserWord[i], $revealedLetters);
					$correctLocations = [...$correctLocations, [$currentArray, i]];
					$correctLetters = [...$correctLetters, tempUserWord[i]];
					tempUserWord = replaceAtIndex(tempUserWord, i, '#');
					tempTodaysWord = replaceAtIndex(tempTodaysWord, i, '@');
				}
			}
	
			// check for in-word letters
			for (let i = 0; i < tempUserWord.length; i++) {
				// if (tempTodaysWord.includes(tempUserWord[i])) {
				const indx = tempTodaysWord.indexOf(tempUserWord[i]);
				if (indx >= 0) {
					$inWordLocations = [...$inWordLocations, [$currentArray, i]];
					$inWordLetters = [...$inWordLetters, tempUserWord[i]];
					addToArrIfNotExists(tempUserWord[i], $revealedLetters);
					tempTodaysWord = replaceAtIndex(tempTodaysWord, indx, '@');
				}
			}
	
			// check for in-word letters
			for (let i = 0; i < tempUserWord.length; i++) {
				if (tempUserWord[i] != '#') {
					$wrongLocations = [...$wrongLocations, [$currentArray, i]];
					$wrongLetters = [...$wrongLetters, tempUserWord[i]];
				}
			}
	
			if (guessedWord === $todaysWord.word) {
				$hasWon = true;
			}
			if (Object.values(letterCount).some((el) => el > 1)) {
				toast.push('A letter you guessed appears in the word more than once');
			}
			if (!$hasWon) {
				$gameRows[$currentArray].status +=' wrong';
			}
			// check if they guessed the word or reached the end of guesses
			if ($hasWon || $currentArray === $gameRows.length - 1) {
				updateStats();
				$gameOver = true;
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

	function generateShareText() {
		let tmpString = $hasWon
			? `WORDLOL ${newStats.numGuesses}/${maxGuesses}\n`
			: `WORDLOL X/${maxGuesses}\n`;
		if ($hintsUsed === 0) {
			tmpString += `no hints used! \n`;
		} 
		for (let i = 0; i < newStats.numGuesses; i++) {
			if($gameRows[i].status.includes('hint')) {
				const hintCount = $gameRows[i].status.match('hint').length;
				console.log($gameRows[i].status.match('hint').length);
				if (hintCount === 1) {
					tmpString += '✨1 hint used\n';
				} else {
					tmpString += `✨${hintCount} hints used\n`;
				}
			}
			for (let j = 0; j < $gameRows[i].letters.length; j++) {
				const loc = [i, j];
				if (checkForIncludes($correctLocations, loc)) {
					tmpString += '🟩';
				} else if (checkForIncludes($inWordLocations, loc)) {
					tmpString += '🟨';
				} else {
					tmpString += '⬜';
				}
			}
			tmpString += '\n';
		}
		console.log(tmpString);
		return tmpString;
	}

	function checkForIncludes(arr1: Array<number>, arr2: Array<number>): boolean {
		return arr1.some((ele) => JSON.stringify(ele) === JSON.stringify(arr2));
	}

	export function handleShare(): void {
		if (navigator.share) {
			navigator
				.share({
					title: 'playwordlol.com',
					text: generateShareText()
				})
				.then(() => console.log('Successful share'))
				.catch((error) => console.log('Error sharing', error));
		} else {
			console.log('no navigator share support');
		}
	}

	function isAlpha(val: any) {
		return typeof val === 'string' && val.length === 1 && /[A-Za-z]/.test(val);
	}

	function handleKeyboardInput(e: KeyboardEvent) {
		const value = e?.key.toUpperCase();
		if (!value) return;

		let eventObj = {
			detail: {
				text: value,
				action: null
			}
		};
		if (isAlpha(value)) {
			eventObj.detail.action = 'add';
			updateArrays(eventObj);
		} else if (value === 'ENTER') {
			checkGuess();
		} else if (value === 'BACKSPACE') {
			eventObj.detail.action = 'backspace';
			updateArrays(eventObj);
		}
	}
	const appHeight = () => {
		const doc = document.documentElement
		doc.style.setProperty('--app-height', `${window.innerHeight}px`)
	}
	onMount(() => {
		const app = new SvelteToast({
			// Set where the toast container should be appended into
			target: document.body
		});
		appHeight();

	});
</script>

<svelte:head>
	<title>WORDLOL - A League of Legends Word Game</title>
</svelte:head>

<svelte:window on:keydown={handleKeyboardInput} on:resize={appHeight}/>
{#if $hasWon}
	<Particles particlesUrl=".//particles/fireworks.json" />
{/if}
<main class="transition-all select-none {$themePref.darkmode === true ? 'dark h-full' : 'h-full'}">
	<div class="flex flex-col h-full bg-white dark:bg-gray-800 dark:text-white justify-between overflow-x-hidden font-barlow text-xl">
		<Header />
		<Gameboard />
		{#if $gameOver === true && showModal}
			<GameOverModal bind:showModal {newStats} {handleShare} />
		{/if}
		{#if $showStats === true}
			<StatsModal {newStats}/>
		{/if}
		{#if $showInfo === true}
			<InfoModal />
		{/if}
		{#if $showHint === true}
			<HintModal on:hint={saveGame} />
		{/if}
		{#if $showSettings === true}
			<SettingsModal />
		{/if}
		<Keyboard on:letter={updateArrays} on:checkguess={checkGuess} />
	</div>
</main>