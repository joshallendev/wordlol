<script lang="ts">
	import { correctLocations, wrongLocations, inWordLocations, gameRows } from '../stores/gameStore';
	import { fly, fade, blur, slide, draw, crossfade, scale} from 'svelte/transition';
	import {flip} from 'svelte/animate';

	const letterStyles: string =
		'board-letter inline w-14 h-14 mx-1 text-3xl mx-0.5 flex rounded-md justify-center items-center';



	$: setLetterStyles = (loc) => {
		let classes:string = "";
		if (checkForIncludes($correctLocations, loc)) {
			classes = letterStyles + " bg-correct text-white";
		} else if (checkForIncludes($inWordLocations, loc)) {
			classes = letterStyles + " bg-squash text-white";
		} else if (checkForIncludes($wrongLocations, loc)) {
			classes = letterStyles + " bg-darkgray text-white";
		} else {
			classes = letterStyles + " bg-[#f2f2f2] border-darkgray border text-black";
		}
		return classes;
	}

	function checkForIncludes(arr1: Array<number>, arr2: Array<number>): boolean {
		return arr1.some((ele) => JSON.stringify(ele) === JSON.stringify(arr2));
	}
</script>

<div transition:fade>
	{#each $gameRows as row, i}
		<div class="flex flex-row justify-center my-2">
			{#each row as item, j}
			<div class={setLetterStyles([i, j])}>
				{#key item.content}
						<p in:scale out:scale>{item.content}</p>
						{/key}
						</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.board-letter {
		transition: all 0.5s ease;
	}
</style>
