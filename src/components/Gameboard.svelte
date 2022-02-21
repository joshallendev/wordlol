<script lang="ts">
	import { correctLocations, wrongLocations, inWordLocations, gameRows } from '../stores/gameStore';
	import { fade } from 'svelte/transition'

	const letterStyles: string =
		'board-letter w-14 h-14 border border-black mx-1 bg-white text-3xl mx-0.5 flex rounded-md justify-center items-center';

	function checkForIncludes(arr1: Array<number>, arr2: Array<number>): boolean {
		return arr1.some((ele) => JSON.stringify(ele) === JSON.stringify(arr2));
	}
</script>

{#each $gameRows as row, i}
	<div class="flex justify-center my-2">
		{#each row as item, j}
			{#if checkForIncludes($correctLocations, [i, j])}
				<div class="{letterStyles} bg-correct">{item}</div>
			{:else if checkForIncludes($inWordLocations, [i, j])}
				<div class="{letterStyles} bg-robinblue">{item}</div>
			{:else if checkForIncludes($wrongLocations, [i, j])}
				<div class="{letterStyles} bg-darkgray">{item}</div>
			{:else}
				<div class="{letterStyles} bg-lightgray">{item}</div>
			{/if}
		{/each}
	</div>
{/each}

<style>
	.board-letter {
  		transition: background-color 2s ease;
	}
</style>
