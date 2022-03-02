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

<div class="flex-col grow">
	<div transition:fade class="self-start mx-auto sm:mt-20">
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

</div>

<style>
	.board-letter {
		transition: all 0.5s ease;
	}

	.board-row-wrong {
		animation: shake-horizontal 0.5s;
		animation-iteration-count: 1;
	}



	@keyframes shake-horizontal {
	2% {
		transform: translate(-5px, 0) rotate(0)
	}
	4% {
		transform: translate(8px, 0) rotate(0)
	}
	6% {
		transform: translate(8px, 0) rotate(0)
	}
	8% {
		transform: translate(9px, 0) rotate(0)
	}
	10% {
		transform: translate(-7px, 0) rotate(0)
	}
	12% {
		transform: translate(1px, 0) rotate(0)
	}
	14% {
		transform: translate(-4px, 0) rotate(0)
	}
	16% {
		transform: translate(7px, 0) rotate(0)
	}
	18% {
		transform: translate(8px, 0) rotate(0)
	}
	20% {
		transform: translate(-7px, 0) rotate(0)
	}
	22% {
		transform: translate(9px, 0) rotate(0)
	}
	24% {
		transform: translate(8px, 0) rotate(0)
	}
	26% {
		transform: translate(-2px, 0) rotate(0)
	}
	28% {
		transform: translate(5px, 0) rotate(0)
	}
	30% {
		transform: translate(6px, 0) rotate(0)
	}
	32% {
		transform: translate(4px, 0) rotate(0)
	}
	34% {
		transform: translate(3px, 0) rotate(0)
	}
	36% {
		transform: translate(7px, 0) rotate(0)
	}
	38% {
		transform: translate(-1px, 0) rotate(0)
	}
	40% {
		transform: translate(3px, 0) rotate(0)
	}
	42% {
		transform: translate(10px, 0) rotate(0)
	}
	44% {
		transform: translate(3px, 0) rotate(0)
	}
	46% {
		transform: translate(-9px, 0) rotate(0)
	}
	48% {
		transform: translate(6px, 0) rotate(0)
	}
	50% {
		transform: translate(-8px, 0) rotate(0)
	}
	52% {
		transform: translate(6px, 0) rotate(0)
	}
	54% {
		transform: translate(1px, 0) rotate(0)
	}
	56% {
		transform: translate(5px, 0) rotate(0)
	}
	58% {
		transform: translate(-4px, 0) rotate(0)
	}
	60% {
		transform: translate(3px, 0) rotate(0)
	}
	62% {
		transform: translate(-5px, 0) rotate(0)
	}
	64% {
		transform: translate(7px, 0) rotate(0)
	}
	66% {
		transform: translate(-8px, 0) rotate(0)
	}
	68% {
		transform: translate(-2px, 0) rotate(0)
	}
	70% {
		transform: translate(-5px, 0) rotate(0)
	}
	72% {
		transform: translate(1px, 0) rotate(0)
	}
	74% {
		transform: translate(1px, 0) rotate(0)
	}
	76% {
		transform: translate(-9px, 0) rotate(0)
	}
	78% {
		transform: translate(6px, 0) rotate(0)
	}
	80% {
		transform: translate(8px, 0) rotate(0)
	}
	82% {
		transform: translate(10px, 0) rotate(0)
	}
	84% {
		transform: translate(-6px, 0) rotate(0)
	}
	86% {
		transform: translate(-1px, 0) rotate(0)
	}
	88% {
		transform: translate(5px, 0) rotate(0)
	}
	90% {
		transform: translate(-1px, 0) rotate(0)
	}
	92% {
		transform: translate(7px, 0) rotate(0)
	}
	94% {
		transform: translate(-3px, 0) rotate(0)
	}
	96% {
		transform: translate(-7px, 0) rotate(0)
	}
	98% {
		transform: translate(-4px, 0) rotate(0)
	}
	0%,
	100% {
		transform: translate(0, 0) rotate(0)
	}
}
</style>
