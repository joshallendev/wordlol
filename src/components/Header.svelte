<script lang="ts">
	import { showStats, showInfo, showHint, todaysWord, gameOver } from '../stores/gameStore';
</script>

<header class="bg-black med:mb-10 text-white py-3 flex justify-between">
	<div class="inline">
		<p class="px-5 font-semibold inline">WORDLOL</p>
	</div>
	{#if $todaysWord.length > 4 && !$gameOver}
		<div>
			<button type="button" on:click={() => $showHint = !$showHint}>
			<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="30" height="30" role="img" style="vertical-align: middle; display: inline;" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="#292F33" d="M3.651 29.852L29.926 3.576c.391-.391 2.888 2.107 2.497 2.497L6.148 32.349c-.39.391-2.888-2.107-2.497-2.497z"/><path fill="#66757F" d="M30.442 4.051L4.146 30.347l.883.883L31.325 4.934z"/><path fill="#E1E8ED" d="m34.546 2.537l-.412-.412l-.671-.671a.967.967 0 0 0-.255-.169a.988.988 0 0 0-1.159.169l-2.102 2.102l.495.495l.883.883l1.119 1.119l2.102-2.102a.999.999 0 0 0 0-1.414zM5.029 31.23l-.883-.883l-.495-.495l-2.209 2.208a.988.988 0 0 0-.169 1.159c.046.09.094.18.169.255l.671.671l.412.412a.999.999 0 0 0 1.414 0l2.208-2.208l-1.118-1.119z"/><path fill="#F5F8FA" d="m31.325 4.934l2.809-2.809l-.671-.671a.967.967 0 0 0-.255-.169l-2.767 2.767l.884.882zM4.146 30.347L1.273 33.22c.046.09.094.18.169.255l.671.671l2.916-2.916l-.883-.883z"/><path fill="#FFAC33" d="m28.897 14.913l1.542-.571l.6-2.2a.667.667 0 0 1 1.287 0l.6 2.2l1.542.571a.665.665 0 0 1 0 1.25l-1.534.568l-.605 2.415a.667.667 0 0 1-1.293 0l-.605-2.415l-1.534-.568a.665.665 0 0 1 0-1.25M11.961 5.285l2.61-.966l.966-2.61a1.103 1.103 0 0 1 2.07 0l.966 2.61l2.609.966a1.103 1.103 0 0 1 0 2.07l-2.609.966l-.966 2.61a1.105 1.105 0 0 1-2.07 0l-.966-2.61l-2.61-.966a1.104 1.104 0 0 1 0-2.07M24.13 20.772l1.383-.512l.512-1.382a.585.585 0 0 1 1.096 0l.512 1.382l1.382.512a.584.584 0 0 1 0 1.096l-1.382.512l-.512 1.382a.585.585 0 0 1-1.096 0l-.512-1.382l-1.383-.512a.585.585 0 0 1 0-1.096"/></svg>
			</button>
		</div>
	{/if}
	<div class="inline pr-5">
		<button type="button" on:click={() => $showInfo = !$showInfo}>
			<svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="vertical-align: middle; display: inline;" width="30" height="30" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M10.492 8.91A.5.5 0 0 0 9.5 9v4.502l.008.09a.5.5 0 0 0 .992-.09V9l-.008-.09Zm.307-2.16a.75.75 0 1 0-1.5 0a.75.75 0 0 0 1.5 0ZM18 10a8 8 0 1 0-16 0a8 8 0 0 0 16 0ZM3 10a7 7 0 1 1 14 0a7 7 0 0 1-14 0Z"/></svg>
		</button>

		<button type="button" on:click={() => $showStats = !$showStats}>
			<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="vertical-align: middle; display: inline;" width="30" height="30" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M8.143 15.857H5.57V9.43h2.572v6.428zm5.143 0h-2.572V3h2.572v12.857zm5.142 0h-2.571v-9h2.571v9z"/><path fill="currentColor" fill-rule="evenodd" d="M21 20.714H3v-2h18v2z" clip-rule="evenodd"/></svg>
		</button>
	</div>
</header>
