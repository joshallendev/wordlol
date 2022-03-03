<script lang="ts">
	import { showSettings } from '../stores/gameStore';
	import { fade, scale } from 'svelte/transition';
</script>

<div
	on:click={() => ($showSettings = !$showSettings)}
	in:fade
	out:fade
	class="fixed flex items-center flex-col inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
>
	<div
		in:scale
		out:scale
		on:click|stopPropagation
		class="flex flex-col text-center bg-white w-5/6 md:w-1/2 pt-2 pb-6 px-4 rounded mt-20"
	>
		<div class="flex flex-row mb-4">
			<h3 class="text-lg font-semibold text-gray-900">SETTINGS</h3>
			<button class="ml-auto align-middle" on:click={() => ($showSettings = !$showSettings)}>
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
				>
			close</button>
		</div>

		<div class="flex justify-between border-b border-lightgray py-4 align-middle">
			<p>Dark Mode</p>
			<div class="form-check form-switch">
				<input
					class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
					type="checkbox"
					role="switch"
					id="flexSwitchCheckDefault"
				/>
			</div>
		</div>
		<div class="flex justify-between border-b border-lightgray py-4 align-middle">
			<p>Hard Mode</p>
			<div class="form-check form-switch">
				<input
					class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
					type="checkbox"
					role="switch"
					id="flexSwitchCheckDefault"
				/>
			</div>
		</div>
		<div class="flex justify-between border-b border-lightgray py-4 align-middle">
			<p>High Contrast Mode</p>
			<div class="form-check form-switch">
				<input
					class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
					type="checkbox"
					role="switch"
					id="flexSwitchCheckDefault"
				/>
			</div>
		</div>
		<div class="flex justify-between border-b border-lightgray py-4 align-middle">
			<p>Feedback</p>
			<p>
				<a
				class="text-actionred hover:font-semibold hover:underline"
					href="mailto:josh.allen@hey.com">Email Me</a
				>
			</p>
		</div>
		<div class="flex justify-between border-b border-lightgray py-4 align-middle">
			<p>See the Code</p>
			<p>
				<a
					class="text-actionred hover:font-semibold hover:underline"
					href="https://github.com/joshallendev/wordlol">Github Repo</a
				>
			</p>
		</div>
	</div>
</div>
