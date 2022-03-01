<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import { correctLetters, wrongLetters, inWordLetters } from '../stores/gameStore';

	const letterArrays: Array<Array<string>> = [
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
		['Z', 'X', 'C', 'V', 'B', 'N', 'M']
	];
	const dispatch = createEventDispatcher();
	let keyboard;

	const letterStyles: string =
		'key-letter grow sm:grow-0 h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm select-none rounded hover:shadow-2xl';

	function handleLetterClick(e): void {
		const text: string = e.target.innerText;
		// only forward the letter to the letters array
		// if it's truly a single letter
		if (e.target.type === 'button' && text.length === 1) {
			dispatch('letter', {
				text: text,
				action: 'add'
			});
		}
	}

	function handleBackspaceClick() {
		dispatch('letter', {
			text: null,
			action: 'backspace'
		});
	}

	function handleCheckGuess() {
		dispatch('checkguess');
	}

	$: setLetterStyles = (letter) => {
		let classes:string = "";
		if ($correctLetters.includes(letter)) {
			classes = letterStyles + " text-black bg-correct";
		} else if ($inWordLetters.includes(letter)) {
			classes = letterStyles + " bg-squash text-white";
		} else if ($wrongLetters.includes(letter)) {
			classes = letterStyles + " text-black bg-darkgray";
		} else {
			classes = letterStyles + " text-black bg-lightgray";
		}
		return classes;
	}

</script>

<div on:click={handleLetterClick} class="sm:fixed sm:bottom-0 w-full">
	{#each letterArrays as row, i}
	<div class="my-3 flex justify-center">
			{#if i === 2 }
			<button type="button" class="{letterStyles} bg-actionred text-white w-auto sm:w-auto" on:click={handleCheckGuess}
				>ENTER</button>
			{/if}
			{#each row as letter}
				<button type="button" class={setLetterStyles(letter)}>{letter}</button>
			{/each}
			{#if i === 2 }
			<button type="button" class="{letterStyles} bg-actionred text-white w-auto sm:w-auto" on:click={handleBackspaceClick}
			>BACK</button>
			{/if}
		</div>
	{/each}
</div>

<style>
	.key-letter {
  		transition: all 0.5s ease;
	}
</style>