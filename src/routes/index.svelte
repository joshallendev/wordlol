<script lang="ts">
	import Header from '../components/Header.svelte';
	import Keyboard from '../components/Keyboard.svelte';
	import Gameboard from '../components/Gameboard.svelte';
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
		stats
	} from '../stores/gameStore';
	import Icon from '@iconify/svelte';

	let guessCount = 0;
	let newStats;
	let showModal = false;

	if ($gameOver) {
		showModal = true; 
	}

	function updateArrays(event: any) {
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
		window.localStorage.setItem('wordlolstats', JSON.stringify(newStats));

	}

	function checkGuess(): void {
		// only actually check the guess if the current row
		// is filled out
		if ($currentLetter === $gameRows[$currentArray].length) {
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

	function handleShare(): void {
		if (navigator.share) {
			navigator.share({
				title: 'playwordlol.com',
				text: $hasWon ? `I beat today's wordlol game!` : `Checkout today's wordlol`,
				url: 'http://playwordlol.com'
			})
			.then(() => console.log('Successful share'))
			.catch((error) => console.log('Error sharing', error));
		} else {
			console.log('no navigator share support');
		}
	}

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<main class="h-screen w-screen bg-sunray">
	<Header />
	<Gameboard />
	{#if $gameOver === true && showModal}
		<div class="fixed flex items-center flex-col inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
			<div class="flex flex-col mt-3 text-center bg-white w-1/2 md:w-1/3 py-8 rounded mt-20">
				<button class="ml-auto px-4 align-middle" on:click="{toggleModal}">
					<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="vertical-align: middle; display: inline;" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.657 12.071L5 6.414L6.414 5l5.657 5.657L17.728 5l1.414 1.414l-5.657 5.657l5.657 5.657l-1.414 1.414l-5.657-5.657l-5.657 5.657L5 17.728z"/></svg>
						Close					
				</button>
				<h3 class="text-lg font-medium text-gray-900">{ $hasWon ? 'Well done!' : 'Better luck next time.'}</h3>
				<div class="mt-2 text-center">
					<p class="text-md text-gray-500">{ $hasWon ? 'You did great.' : 'Tomorrow is all you.'}</p>
					<p class="text-sm text-gray-500">Let's check out your stats</p>
					<div class="text-left px-6 py-2">
						<ul>
							<li>Total games played: {stats.totalGames}</li>
							<li>Total games won: {stats.totalWins}</li>
							<li>Current Streak: {stats.currentStreak}</li>
							<li>Longest streak: {stats.maxDayStreak}</li>
							{#if $hasWon }
								<li>Won in {guessCount} guesses.</li>
							{/if}	
						</ul>
					</div>
					<button type="button" class="bg-frostbite p-2 rounded align-middle" on:click="{handleShare}"> 
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="vertical-align: middle; display: inline;" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19.754 11a.75.75 0 0 1 .743.648l.007.102v7a3.25 3.25 0 0 1-3.065 3.246l-.185.005h-11a3.25 3.25 0 0 1-3.244-3.066l-.006-.184V11.75a.75.75 0 0 1 1.494-.102l.006.102v7a1.75 1.75 0 0 0 1.607 1.745l.143.006h11A1.75 1.75 0 0 0 19 18.894l.005-.143V11.75a.75.75 0 0 1 .75-.75ZM6.22 7.216l4.996-4.996a.75.75 0 0 1 .976-.073l.084.072l5.005 4.997a.75.75 0 0 1-.976 1.134l-.084-.073l-3.723-3.716l.001 11.694a.75.75 0 0 1-.648.743l-.102.007a.75.75 0 0 1-.743-.648L11 16.255V4.558L7.28 8.277a.75.75 0 0 1-.976.073l-.084-.073a.75.75 0 0 1-.073-.977l.073-.084l4.996-4.996L6.22 7.216Z"/></svg> Share Results
					</button>
				</div>				
			</div>
		</div>
	{/if}
	<Keyboard on:letter={updateArrays} on:checkguess={checkGuess} />
</main>
