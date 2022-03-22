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
		game,
		stats,
		showStats,
		showInfo,
		showHint,
		words,
		maxGuesses,
		saveVersion,
		showSettings,
		themePref,
		wordIndex
	} from '../stores/gameStore';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import HintModal from '../components/HintModal.svelte';
	import validWords from '../../static/validwords';
	import Particles from '../components/Particles.svelte';
	import SettingsModal from '../components/SettingsModal.svelte';

	export let newStats = stats;
	export let showModal = false;
	if ($game.gameOver) {
		showModal = true;
	}
	function updateArrays(event: any) {
		if (!$game.gameOver) {
			const text = event.detail.text;
			switch (event.detail.action) {
				case 'add':
					if ($game.currentLetter < $game.rows[$game.currentArray].letters.length) {
						$game.rows[$game.currentArray].letters[$game.currentLetter].content = text;
						$game.currentLetter++;
					}
					break;
				case 'backspace':
					// go back a letter but never lass than 0
					$game.currentLetter > 0 ? $game.currentLetter-- : null;
					$game.rows[$game.currentArray].letters[$game.currentLetter].content = '';
					break;
				default:
					break;
			}
		}
	}

	function saveGame() {
		const savedGameObj = {
			saveDate: today,
			currentArray: $game.currentArray,
			currentLetter: $game.currentLetter,
			correctLetters: $game.correctLetters,
			inWordLetters: $game.inWordLetters,
			wrongLetters: $game.wrongLetters,
			correctLocations: $game.correctLocations,
			inWordLocations: $game.inWordLocations,
			wrongLocations: $game.wrongLocations,
			hasWon: $game.hasWon,
			gameOver: $game.gameOver,
			rows: $game.rows,
			numGuesses: $game.numGuesses,
			hints: $game.hints,
			saveVersion,
			revealedLetters: $game.revealedLetters
		};
		window.localStorage.setItem('savedWordlolGameboard', JSON.stringify(savedGameObj));
	}

	function updateStats(): void {
		newStats = stats;
		newStats.totalGames++;
		// was the game won? if so lets track it
		if ($game.hasWon) {
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
		newStats.numGuesses = $game.numGuesses;
		if (!newStats.guessCounts) {
			newStats.guessCounts = {};
		}
		if (newStats.guessCounts[$game.numGuesses]) {
			newStats.guessCounts[$game.numGuesses] += 1;
		} else {
			newStats.guessCounts[$game.numGuesses] = 1;
		}
		newStats.hints = newStats.hints + $game.hints;
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
		if (!$game.gameOver) {
			const guessedWord = $game.rows[$game.currentArray].letters.reduce(
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

			// hard mode edits
			if ($themePref.hardmode === true && $game.revealedLetters.length > 0) {
				let unusedLetter = 0;
				for (let index = 0; index < $game.revealedLetters.length; index++) {
					if (!guessedWord.includes($game.revealedLetters[index])) {
						unusedLetter++;
					}
				}
				if (unusedLetter > 0) {
					toast.push(
						`Hard Mode is enabled. Guesses must contain previously revealed letters: ${$game.revealedLetters.join(
							', '
						)}`,
						{
							theme: {
								'--toastBarBackground': '#D13639'
							}
						}
					);
					return;
				}
			}

			// track number of guesses for stats
			$game.numGuesses++;

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
					addToArrIfNotExists(tempUserWord[i], $game.revealedLetters);
					$game.correctLocations = [...$game.correctLocations, [$game.currentArray, i]];
					$game.correctLetters = [...$game.correctLetters, tempUserWord[i]];
					tempUserWord = replaceAtIndex(tempUserWord, i, '#');
					tempTodaysWord = replaceAtIndex(tempTodaysWord, i, '@');
				}
			}

			// check for in-word letters
			for (let i = 0; i < tempUserWord.length; i++) {
				// if (tempTodaysWord.includes(tempUserWord[i])) {
				const indx = tempTodaysWord.indexOf(tempUserWord[i]);
				if (indx >= 0) {
					$game.inWordLocations = [...$game.inWordLocations, [$game.currentArray, i]];
					$game.inWordLetters = [...$game.inWordLetters, tempUserWord[i]];
					addToArrIfNotExists(tempUserWord[i], $game.revealedLetters);
					tempTodaysWord = replaceAtIndex(tempTodaysWord, indx, '@');
				}
			}

			// check for in-word letters
			for (let i = 0; i < tempUserWord.length; i++) {
				if (tempUserWord[i] != '#') {
					$game.wrongLocations = [...$game.wrongLocations, [$game.currentArray, i]];
					$game.wrongLetters = [...$game.wrongLetters, tempUserWord[i]];
				}
			}

			if (guessedWord === $todaysWord.word) {
				$game.hasWon = true;
			}
			if (Object.values(letterCount).some((el) => el > 1)) {
				toast.push('A letter you guessed appears in the word more than once');
			}
			if (!$game.hasWon) {
				$game.rows[$game.currentArray].status += ' wrong';
			}
			// check if they guessed the word or reached the end of guesses
			if ($game.hasWon || $game.currentArray === $game.rows.length - 1) {
				updateStats();
				$game.gameOver = true;
				saveGame();
				toast.push(gameOverMessage(), {
					onpop: () => showModal = true,
					duration: 2000
				});
			} else {
				$game.hasWon = false;
				$game.gameOver = false;
				$game.currentArray++;
				$game.currentLetter = 0;
				saveGame();
			}
		}
	}

	function gameOverMessage() {
		if (!$game.hasWon) {
			return 'Better luck next time.'
		} else if ($game.numGuesses === 6) {
			return 'Just in time!';
		} else if ($game.numGuesses >= 4) {
			return 'Nicel!';
		} else if ($game.numGuesses >= 2) {
			return 'Terrific!';
		} else {
			return 'Amazing!';
		}
	}

	function generateShareText() {
		let shareText = $game.hasWon
			? `WORDLOL ${wordIndex} ${newStats.numGuesses}/${maxGuesses}\n`
			: `WORDLOL ${wordIndex} X/${maxGuesses}\n`;
		if ($game.hints === 0) {
			shareText += `no hints used! \n`;
		} else if ($game.hints === 1) {
			shareText += `1 hint used\n`;
		} else if ($game.hints === 2) {
			shareText += `2 hints used\n`;
		}
		for (let i = 0; i < newStats.numGuesses; i++) {
			if ($game.rows[i].hints === 1) {
				shareText += '✨ hint\n';
			} else if ($game.rows[i].hints > 1) {
				shareText += `✨ ${$game.rows[i].hints} hints\n`;
			}
			for (let j = 0; j < $game.rows[i].letters.length; j++) {
				const loc = [i, j];
				if (checkForIncludes($game.correctLocations, loc)) {
					shareText += '🟩';
				} else if (checkForIncludes($game.inWordLocations, loc)) {
					shareText += '🟨';
				} else {
					shareText += '⬜';
				}
			}
			shareText += '\n';
		}
		return shareText;
	}

	function checkForIncludes(arr1: Array<number>, arr2: Array<number>): boolean {
		return arr1.some((ele) => JSON.stringify(ele) === JSON.stringify(arr2));
	}

	export function handleShare(): void {
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		const shareText = generateShareText();
		if (navigator.share && isMobile) {
			navigator
				.share({
					title: 'playwordlol.com',
					text: shareText
				})
				.then(() => console.log('Successful share'))
				.catch((error) => console.log('Error sharing', error));
		} else {
			navigator.clipboard.writeText(shareText);
			toast.push('Game copied to clipboard');
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
		const doc = document.documentElement;
		doc.style.setProperty('--app-height', `${window.innerHeight}px`);
	};
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

<svelte:window on:keydown={handleKeyboardInput} on:resize={appHeight} />
{#if $game.hasWon}
	<Particles particlesUrl=".//particles/fireworks.json" />
{/if}
<main class="transition-all select-none {$themePref.darkmode === true ? 'dark h-full' : 'h-full'}">
	<div
		class="flex flex-col h-full bg-background dark:text-white justify-between overflow-x-hidden font-barlow text-xl"
	>
		<Header />
		<Gameboard />
		{#if $game.gameOver === true && showModal}
			<GameOverModal bind:showModal {newStats} {handleShare} />
		{/if}
		{#if $showStats === true}
			<StatsModal {newStats} />
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
