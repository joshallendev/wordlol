<script lang="ts">
	import { showHint, todaysWord, revealType, revealClue, game } from '../stores/gameStore';
	import { fade, scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const letterStyles: string =
		'board-letter inline w-14 h-14 mx-1 text-3xl mx-0.5 flex rounded-md justify-center items-center';
	let hintSpan, clueSpan;

	let type = $todaysWord.type;
	let clue = $todaysWord.clue[0];
	const dispatch = createEventDispatcher();

	function toggleVisibility(el: HTMLElement) {
		if (el.style.opacity === '1') {
			el.style.opacity = '0';
		} else {
			el.style.opacity = '1';
		}
	}

	function handleHintReveal() {
		if ($game.rows[$game.currentArray].hints === NaN || $game.rows[$game.currentArray].hints < 0) {
			$game.rows[$game.currentArray].hints = 0;
		}

		$game.rows[$game.currentArray].hints++;
		$game.hints++;
		dispatch('hint');
	}
</script>

<div
	in:fade
	out:fade
	on:click={() => ($showHint = !$showHint)}
	class="fixed flex items-center flex-col inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto"
>
	<div
	in:scale
	out:scale
		on:click|stopPropagation
		class="flex flex-col text-center bg-white dark:bg-gray-800 w-3/4 md:w-1/2 pt-2 pb-6 px-4 rounded mt-20 overflow-y-auto"
	>
		<div class="flex flex-row mb-4">
			<h3 class="text-lg font-semibold">NEED A HINT?</h3>
			<button class="ml-auto align-middle hover:text-actionred" on:click={() => $showHint = !$showHint}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					role="img"
					style="vertical-align: middle; display: inline;"
					width="25"
					height="25"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
				>
					<path
						fill="currentColor"
						fill-rule="evenodd"
						d="M10.657 12.071L5 6.414L6.414 5l5.657 5.657L17.728 5l1.414 1.414l-5.657 5.657l5.657 5.657l-1.414 1.414l-5.657-5.657l-5.657 5.657L5 17.728z"
					/>
				</svg>
			close</button>
		</div>
		<p class="mb-2">
			No shame in using a hint, but it does get tracked in your stats if you reveal it.
		</p>
		<section class="flex flex-col items-center">
			{#if !$revealType}
				<button
					type="button"
					class="bg-lightgray text-black rounded mb-6 p-2"
					on:click={() => {$revealType = !$revealType;handleHintReveal();}}
				>
					✨ show me the hint! ✨
				</button>
			{:else}
				<span bind:this={hintSpan} class="mb-4 border-b-2 border-correct">hint: {type}</span>
			{/if}
		</section>
		<section class="flex flex-col items-center">
			{#if $revealType && !$revealClue}
				<button
					type="button"
					class="block bg-lightgray text-black rounded mb-6 p-2"
					on:click={() => {$revealClue = !$revealClue; handleHintReveal();}}
				>
					✨ i'm stuck.. show me another hint! ✨
				</button>
			{:else if $revealType && $revealClue}
				<span bind:this={clueSpan} class="border-b-2 border-correct">hint: {clue}</span>
			{/if}
		</section>
	</div>
</div>

<style>
	span {
		transition: opacity 0.3s linear;
	}
</style>
