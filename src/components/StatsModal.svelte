<script lang="ts">
	import { showStats } from '../stores/gameStore';
	import { fade, scale } from 'svelte/transition';
import GuessCountMeters from './GuessCountMeters.svelte';
import Stats from './Stats.svelte';
export let newStats;
</script>

<div
	on:click={() => ($showStats = !$showStats)}
	in:fade
	out:fade
	class="fixed flex items-center flex-col inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
>
	<div
		in:scale
		out:scale
		on:click|stopPropagation
		class="flex flex-col text-center bg-white dark:bg-gray-800 dark:text-white w-3/4 md:w-1/2 pt-2 pb-6 px-4 rounded mt-20"
	>
		<div class="flex flex-row">
			<h3 class="text-lg font-semibold">STATISTICS</h3>
			<button class="ml-auto align-middle hover:text-actionred" on:click={() => ($showStats = !$showStats)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					role="img"
					style="vertical-align: middle; display: inline;"
					width="25"
					height="25"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
					><path
						fill="currentColor"
						fill-rule="evenodd"
						d="M10.657 12.071L5 6.414L6.414 5l5.657 5.657L17.728 5l1.414 1.414l-5.657 5.657l5.657 5.657l-1.414 1.414l-5.657-5.657l-5.657 5.657L5 17.728z"
					/></svg
				>close</button>
		</div>
		<Stats stats={newStats} />
		<GuessCountMeters stats={newStats} />
	</div>
</div>
