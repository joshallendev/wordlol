<script lang="ts">
	import { showStats, game, showInfo, showHint, showSettings } from '../stores/gameStore';
	import { scale } from 'svelte/transition';
</script>

<header
	class="bg-background text-black border-b dark:text-white med:mb-10  py-3 flex justify-between"
>
	<div class="flex-row justify-start">
		<p class="px-5 font-semibold text-left hover:text-acc1"><a href="/">WORDLOL</a></p>
	</div>
	{#if !$game.gameOver && $game.currentArray > 2}
		<div in:scale out:scale>
			<button
				class="text-2xl {$game.hints < 2 ? 'animate-pulse' : ''}"
				type="button"
				aria-label="hint"
				on:click={() => ($showHint = !$showHint)}
			>
				✨
			</button>
		</div>
	{/if}
	<div class="inline pr-2 justify-end text-right">
		<button type="button" aria-label="information" on:click={() => ($showInfo = !$showInfo)}>
			<svg
				class="cursor-pointer"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				style="vertical-align: middle; display: inline;"
				width="2rem"
				height="2rem"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 20 20"
				><path
					fill="currentColor"
					d="M10.492 8.91A.5.5 0 0 0 9.5 9v4.502l.008.09a.5.5 0 0 0 .992-.09V9l-.008-.09Zm.307-2.16a.75.75 0 1 0-1.5 0a.75.75 0 0 0 1.5 0ZM18 10a8 8 0 1 0-16 0a8 8 0 0 0 16 0ZM3 10a7 7 0 1 1 14 0a7 7 0 0 1-14 0Z"
				/></svg
			>
		</button>

		<button
			type="button"
			class="ml-2"
			aria-label="statistics"
			on:click={() => ($showStats = !$showStats)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				style="vertical-align: middle; display: inline;"
				width="2rem"
				height="2rem"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M8.143 15.857H5.57V9.43h2.572v6.428zm5.143 0h-2.572V3h2.572v12.857zm5.142 0h-2.571v-9h2.571v9z"
				/><path
					fill="currentColor"
					fill-rule="evenodd"
					d="M21 20.714H3v-2h18v2z"
					clip-rule="evenodd"
				/></svg
			>
		</button>

		<button
			type="button"
			class="ml-2"
			aria-label="settings"
			on:click={() => ($showSettings = !$showSettings)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				style="vertical-align: middle; display: inline;"
				width="2rem"
				height="2rem"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 36 36"
				><path
					fill="currentColor"
					d="M18.1 11c-3.9 0-7 3.1-7 7s3.1 7 7 7s7-3.1 7-7s-3.1-7-7-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5s5 2.2 5 5s-2.2 5-5 5z"
					class="clr-i-outline clr-i-outline-path-1"
				/><path
					fill="currentColor"
					d="m32.8 14.7l-2.8-.9l-.6-1.5l1.4-2.6c.3-.6.2-1.4-.3-1.9l-2.4-2.4c-.5-.5-1.3-.6-1.9-.3l-2.6 1.4l-1.5-.6l-.9-2.8C21 2.5 20.4 2 19.7 2h-3.4c-.7 0-1.3.5-1.4 1.2L14 6c-.6.1-1.1.3-1.6.6L9.8 5.2c-.6-.3-1.4-.2-1.9.3L5.5 7.9c-.5.5-.6 1.3-.3 1.9l1.3 2.5c-.2.5-.4 1.1-.6 1.6l-2.8.9c-.6.2-1.1.8-1.1 1.5v3.4c0 .7.5 1.3 1.2 1.5l2.8.9l.6 1.5l-1.4 2.6c-.3.6-.2 1.4.3 1.9l2.4 2.4c.5.5 1.3.6 1.9.3l2.6-1.4l1.5.6l.9 2.9c.2.6.8 1.1 1.5 1.1h3.4c.7 0 1.3-.5 1.5-1.1l.9-2.9l1.5-.6l2.6 1.4c.6.3 1.4.2 1.9-.3l2.4-2.4c.5-.5.6-1.3.3-1.9l-1.4-2.6l.6-1.5l2.9-.9c.6-.2 1.1-.8 1.1-1.5v-3.4c0-.7-.5-1.4-1.2-1.6zm-.8 4.7l-3.6 1.1l-.1.5l-.9 2.1l-.3.5l1.8 3.3l-2 2l-3.3-1.8l-.5.3c-.7.4-1.4.7-2.1.9l-.5.1l-1.1 3.6h-2.8l-1.1-3.6l-.5-.1l-2.1-.9l-.5-.3l-3.3 1.8l-2-2l1.8-3.3l-.3-.5c-.4-.7-.7-1.4-.9-2.1l-.1-.5L4 19.4v-2.8l3.4-1l.2-.5c.2-.8.5-1.5.9-2.2l.3-.5l-1.7-3.3l2-2l3.2 1.8l.5-.3c.7-.4 1.4-.7 2.2-.9l.5-.2L16.6 4h2.8l1.1 3.5l.5.2c.7.2 1.4.5 2.1.9l.5.3l3.3-1.8l2 2l-1.8 3.3l.3.5c.4.7.7 1.4.9 2.1l.1.5l3.6 1.1v2.8z"
					class="clr-i-outline clr-i-outline-path-2"
				/><path fill="none" d="M0 0h36v36H0z" /></svg
			>
		</button>
	</div>
</header>
