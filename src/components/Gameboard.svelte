<script lang="ts">
	import { correctLocations, wrongLocations, inWordLocations, gameRows } from '../stores/gameStore';
	import { fly } from 'svelte/transition';

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

<div>
	{#each $gameRows as row, i}
		<div class="flex flex-row justify-center my-2">
			{#each row as item, j}
				<div class={setLetterStyles([i, j])}>
					{#key $gameRows[i][j] }
						<span style="display: inline-block" in:fly={{ y: -20 }} out:fly={{ y: -20 }}>
							{item}
						</span>
					{/key}
				</div>
			{/each}
		</div>
	{/each}
</div>
<style>
	.board-letter {
		transition: background-color 2s ease;
	}
</style>
