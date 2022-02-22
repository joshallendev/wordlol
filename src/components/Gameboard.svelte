<script lang="ts">
	import { correctLocations, wrongLocations, inWordLocations, gameRows } from '../stores/gameStore';
	import { fade } from 'svelte/transition'

	const letterStyles: string =
		'board-letter inline w-14 h-14 mx-1 text-3xl text-lightgray mx-0.5 flex rounded-md justify-center items-center';

	function checkForIncludes(arr1: Array<number>, arr2: Array<number>): boolean {
		return arr1.some((ele) => JSON.stringify(ele) === JSON.stringify(arr2));
	}
</script>

<div>
	{#each $gameRows as row, i}
		<div class="flex flex-row justify-center my-2">
			{#each row as item, j}
				{#if checkForIncludes($correctLocations, [i, j])}
					<div class="{letterStyles} bg-correct text-white">{item}</div>
				{:else if checkForIncludes($inWordLocations, [i, j])}
					<div class="{letterStyles} border-robinblue border-2 text-robinblue">{item}</div>
				{:else if checkForIncludes($wrongLocations, [i, j])}
					<div class="{letterStyles} bg-darkgray text-lightgray">{item}</div>
				{:else}
					<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">{item}</div>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style>
	.board-letter {
		transition: background-color 2s ease;
	}
</style>
