<script lang="ts">
	import { showInfo } from '../stores/gameStore';
	import { fade, scale } from 'svelte/transition';

	const letterStyles: string =
		'board-letter inline w-14 h-14 mx-1 text-3xl mx-0.5 flex rounded-md justify-center items-center';

	function handleScroll(e) {
		if (
			e.target.scrollTop + Math.round(e.target.getBoundingClientRect().height) ===
			e.target.scrollHeight
		) {
			// hide the down arrow
			document.getElementById('scroll-down').style.display = 'none';
		} else {
			// show the down arrow
			document.getElementById('scroll-down').style.display = 'block';
		}
	}
</script>

<div
	in:fade
	out:fade
	on:click={() => ($showInfo = !$showInfo)}
	class="fixed flex items-center flex-col inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
>
	<div
		in:scale
		out:scale
		id="info-modal"
		on:click|stopPropagation
		on:scroll={handleScroll}
		class="flex flex-col text-center bg-background dark:text-white w-5/6 md:w-1/2 pt-2 pb-5 px-4 rounded mt-20 h-3/4 overflow-y-auto"
	>
		<div class="flex flex-row mb-4">
			<h3 class="text-l font-semibold">HOW TO PLAY</h3>
			<button
				class="ml-auto align-middle hover:text-acc1"
				on:click={() => ($showInfo = !$showInfo)}
			>
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
				close</button
			>
		</div>
		<section id="instructions" class="text-left">
			<p class="py-2">
				Guess the League of Legends related <strong>WORDLOL</strong> in 6 tries or less.
			</p>
			<p class="py-2">
				Words may include champion names, game terms, item names, etc. Words currently won't exceed
				a length of 6.. but that may change in the future.
			</p>
			<p class="py-2">
				Hints are available if you might need them after round 3. Click the ✨ icon in the header at
				the top of the page.
			</p>
			<p class="py-2">
				After guessing the letters will change colors to show how close you are to the secret word.
			</p>
			<p class="py-2">If using a keyboard, you can type on that or use the on-screen keys.</p>
		</section>
		<section id="examples" class="border-t border-lightgray text-left">
			<p class="text-l font-semibold py-4">EXAMPLES</p>
			<div class="flex flex-row justify-left my-2">
				<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">L</div>
				<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">U</div>
				<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">D</div>
				<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">E</div>
				<div class="{letterStyles} bg-acc1 text-white">N</div>
			</div>
			<p class="py-1"><strong>N</strong> is in the correct position.</p>

			<div class="flex flex-row justify-left my-2">
				<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">P</div>
				<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">E</div>
				<div class="{letterStyles} bg-acc2 text-white">N</div>
				<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">T</div>
				<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">A</div>
			</div>

			<p class="py-1"><strong>N</strong> is in the word but in the wrong location.</p>

			<div class="flex flex-row justify-left my-2">
				<div class="{letterStyles} bg-acc3 text-white">T</div>
				<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">E</div>
				<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">E</div>
				<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">M</div>
				<div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">O</div>
			</div>

			<p class="py-1"><strong>T</strong> is not in the word at all.</p>
		</section>
		<div class="mt-2 border-t border-lightgray text-left">
			<p class="text-l font-semibold py-4">ABOUT WORDLOL</p>
			<p class="py-1">WORDLOL is a League of Legends themed clone of the original Wordle game.</p>
			<a
				class="text-acc1 font-semibold hover:font-semibold hover:underline"
				href="https://www.nytimes.com/games/wordle/index.html"
				>Play the original Wordle.
			</a>

			<p class="py-1">Tech details:</p>
			<ul class="list-disc list-inside m-2">
				<li>
					Built in <a
						class="text-acc1 font-semibold hover:font-semibold hover:underline"
						href="https://kit.svelte.dev/">SvelteKit</a
					>
				</li>
				<li>
					Styled with <a
						class="text-acc1 font-semibold hover:font-semibold hover:underline"
						href="https://tailwindcss.com/">Tailwind CSS</a
					>
				</li>
				<li>
					Hosted on <a
						class="text-acc1 font-semibold hover:font-semibold hover:underline"
						href="https://www.netlify.com/">Netlify</a
					>
				</li>
			</ul>
		</div>
		<div class="flex justify-between border-b border-lightgray py-4 align-middle">
			<p>Feedback</p>
			<p>
				<a
					class="text-acc1 font-semibold hover:font-semibold hover:underline"
					href="mailto:hello@playwordlol.com">Send an Email</a
				>
			</p>
		</div>
		<div class="flex justify-between border-b border-lightgray py-4 align-middle">
			<p>See the Code</p>
			<p>
				<a
					class="text-acc1 font-semibold hover:font-semibold hover:underline"
					href="https://github.com/joshallendev/wordlol">Github Repo</a
				>
			</p>
		</div>
		<div class="flex justify-between border-b border-lightgray py-4 align-middle">
			<p class="text-left">Created By Josh Allen</p>
			<p>
				<a
					class="text-acc1 font-semibold hover:font-semibold hover:underline"
					href="https://www.joshallendev.com/">My Website</a
				>
			</p>
		</div>
		<p class="text-sm text-left mt-4">
			League of Legends and Wordle are trademarked / registered trademarks of / otherwise owned by
			Riot Games and The New York Times, respectively. This game is not endorsed or affiliated with
			them in any way... it's just a hobby project about a game I love :)
		</p>
	</div>
	<svg
		id="scroll-down"
		class="scroll-down"
		fill="#39ccb1"
		height="75"
		viewBox="0 0 24 24"
		width="75"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
		<path d="M0-.75h24v24H0z" fill="none" />
	</svg>
</div>

<style>
	.scroll-down {
		margin: 0 auto;
		position: relative;
		bottom: 10%;
		animation-name: bounce;
		animation-duration: 1s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}

	@keyframes bounce {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(10px);
		}
	}
</style>
