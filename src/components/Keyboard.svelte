<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { game, themePref } from '../stores/gameStore';

	const letterArrays: Array<Array<string>> = [
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
		['Z', 'X', 'C', 'V', 'B', 'N', 'M']
	];
	const dispatch = createEventDispatcher();

	const letterStyles: string =
		'key-letter grow sm:grow-0 h-14 w-14 flex justify-center px-2 py-3 sm:px-4 font-medium mx-0.5 text-xl select-none rounded hover:shadow-2xl';

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

	$: textColor = $themePref.contrast === true ? 'text-white' : '';
	$: textColor2 = $themePref.contrast === true && $themePref.darkmode === true ? 'text-white' : '';
	$: setLetterStyles = (letter) => {
		let classes: string = '';
		if ($game.correctLetters.includes(letter)) {
			classes = letterStyles + ' bg-acc1 ' + textColor;
		} else if ($game.inWordLetters.includes(letter)) {
			classes = letterStyles + ' bg-acc2 ' + textColor;
		} else if ($game.wrongLetters.includes(letter)) {
			classes = letterStyles + ' bg-acc3 ' + textColor;
		} else {
			classes = letterStyles + ' bg-acc4 ' + textColor2;
		}
		return classes;
	};
</script>

<div class="flex flex-col justify-end">
	<div on:click={handleLetterClick}>
		{#each letterArrays as row, i}
			<div class="my-3 flex justify-center">
				{#if i === 2}
					<button
						type="button"
						class="{letterStyles} w-auto sm:w-auto text-black bg-acc4 dark:text-white"
						on:click={handleCheckGuess}>ENTER</button
					>
				{/if}
				{#each row as letter}
					<button type="button" class={setLetterStyles(letter)}>{letter}</button>
				{/each}
				{#if i === 2}
					<button
						type="button"
						class="{letterStyles} w-auto sm:w-auto text-black bg-acc4 dark:text-white"
						on:click={handleBackspaceClick}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
							role="img"
							style="vertical-align: middle; display: inline;"
							width="2rem"
							height="2rem"
							preserveAspectRatio="xMidYMid meet"
							viewBox="0 0 512 512"
							><path
								fill="currentColor"
								d="M227.313 363.313L312 278.627l84.687 84.686l22.626-22.626L334.627 256l84.686-84.687l-22.626-22.626L312 233.373l-84.687-84.686l-22.626 22.626L289.373 256l-84.686 84.687l22.626 22.626z"
							/><path
								fill="currentColor"
								d="M472 64H194.644a24.091 24.091 0 0 0-17.42 7.492L16 241.623v28.754l161.224 170.131a24.091 24.091 0 0 0 17.42 7.492H472a24.028 24.028 0 0 0 24-24V88a24.028 24.028 0 0 0-24-24Zm-8 352H198.084L48 257.623v-3.246L198.084 96H464Z"
							/></svg
						>
					</button>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.key-letter {
		transition: all 0.5s ease;
	}
</style>
