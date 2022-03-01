<script lang="ts">
	import { correctLocations, wrongLocations, inWordLocations, gameRows, gameOver } from '../stores/gameStore';
	import { fade, scale } from 'svelte/transition';

	const letterStyles: string =
		'board-letter select-none inline w-14 h-14 mx-1 text-3xl mx-0.5 flex rounded-md justify-center items-center';



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
		<div class="{row.status === 'wrong' && !$gameOver ? 'board-row-wrong ' : ''}flex flex-row justify-center my-2">
			{#each row.letters as item, j}
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

	.board-row-wrong {
		animation: shake 0.5s;
		animation-iteration-count: 1;
	}



	@keyframes shake {
		10%, 90% {
			transform: translate3d(-1px, 0, 0);
		}
		
		20%, 80% {
			transform: translate3d(2px, 0, 0);
		}

		30%, 50%, 70% {
			transform: translate3d(-4px, 0, 0);
		}

		40%, 60% {
			transform: translate3d(4px, 0, 0);
		}
		}

</style>
