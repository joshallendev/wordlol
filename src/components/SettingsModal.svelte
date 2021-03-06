<script lang="ts">
	import { showSettings, themePref } from '../stores/gameStore';
	import { fade, scale } from 'svelte/transition';

	function handleSettingsChange(e: any) {
		const name = e.target.name;
		const value = e.target.checked;
		$themePref[name] = value;
		window.localStorage.setItem('wordlol-theme', JSON.stringify($themePref));

		// dark high contrast
		if ($themePref.darkmode === true && $themePref.contrast === true) {
			document.documentElement.style.setProperty('--app-background', '#000000');
			document.documentElement.style.setProperty('--app-acc1', '#00856d');
			document.documentElement.style.setProperty('--app-acc2', '#8c7500');
			document.documentElement.style.setProperty('--app-acc4', '#4B5563');

			// light high contrast
		} else if ($themePref.contrast === true) {
			document.documentElement.classList.remove('dark');
			document.documentElement.style.setProperty('--app-background', '#FFF');
			document.documentElement.style.setProperty('--app-acc1', '#00856d');
			document.documentElement.style.setProperty('--app-acc2', '#8c7500');
			document.documentElement.style.setProperty('--app-acc4', '#E0E0E0');
			// just dark mode
		} else if ($themePref.darkmode === true) {
			document.documentElement.classList.add('dark');
			document.documentElement.style.setProperty('--app-background', '#1F2937');
			document.documentElement.style.setProperty('--app-acc1', '#39CCB1');
			document.documentElement.style.setProperty('--app-acc2', '#B59A27');
			document.documentElement.style.setProperty('--app-acc4', '#4B5563');
			// just light mode
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.style.setProperty('--app-background', '#FFF');
			document.documentElement.style.setProperty('--app-acc1', '#39CCB1');
			document.documentElement.style.setProperty('--app-acc2', '#B59A27');
			document.documentElement.style.setProperty('--app-acc4', '#E0E0E0');
		}
	}
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
		class="flex flex-col text-center bg-background dark:text-white w-5/6 md:w-1/2 pt-2 pb-6 px-4 rounded mt-20"
	>
		<div class="flex flex-row mb-4">
			<h3 class="text-lg font-semibold">SETTINGS</h3>
			<button
				class="ml-auto align-middle hover:text-acc1"
				on:click={() => ($showSettings = !$showSettings)}
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
					><path
						fill="currentColor"
						fill-rule="evenodd"
						d="M10.657 12.071L5 6.414L6.414 5l5.657 5.657L17.728 5l1.414 1.414l-5.657 5.657l5.657 5.657l-1.414 1.414l-5.657-5.657l-5.657 5.657L5 17.728z"
					/></svg
				>close
			</button>
		</div>

		<div class="flex flex-wrap justify-between border-b border-lightgray py-4 align-middle">
			<p>Dark Mode</p>
			<div class="form-check form-switch flex justify-end">
				<label class="relative flex justify-between items-center group p-2 text-xl">
					<input
						on:change={handleSettingsChange}
						bind:checked={$themePref.darkmode}
						type="checkbox"
						name="darkmode"
						class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
					/>
					<span
						class="w-10 h-5 flex items-center flex-shrink-0 ml-4 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-acc1 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5 group-hover:after:translate-x-1"
					/>
				</label>
			</div>
			<span class="text-sm w-full text-left"
				>{$themePref.darkmode ? 'Lights are currently off.' : 'Turn the lights off.'}</span
			>
		</div>
		<div class="flex flex-wrap justify-between border-b border-lightgray py-4 align-middle">
			<p>Hard Mode</p>
			<div class="form-check form-switch flex justify-end">
				<label class="relative flex justify-between items-center group p-2 text-xl">
					<input
						on:change={handleSettingsChange}
						bind:checked={$themePref.hardmode}
						type="checkbox"
						name="hardmode"
						class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
					/>
					<span
						class="w-10 h-5 flex items-center flex-shrink-0 ml-4 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-acc1 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5 group-hover:after:translate-x-1"
					/>
				</label>
			</div>
			<span class="text-sm w-full text-left"
				>{$themePref.hardmode
					? 'All revealed letters must be used in the next turn.'
					: 'Requires all revealed letters to be used in each guess.'}</span
			>
		</div>
		<div class="flex flex-wrap justify-between border-b border-lightgray py-4 align-middle">
			<p>High Contrast Mode</p>
			<div class="form-check form-switch flex justify-end">
				<label class="relative flex justify-between items-center group p-2 text-xl">
					<input
						on:change={handleSettingsChange}
						bind:checked={$themePref.contrast}
						type="checkbox"
						name="contrast"
						class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
					/>
					<span
						class="w-10 h-5 flex items-center flex-shrink-0 ml-4 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-acc1 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5 group-hover:after:translate-x-1"
					/>
				</label>
			</div>
			<span class="text-sm w-full text-left"
				>{$themePref.contrast ? 'Visibility is improved.' : 'Improved visibility.'}</span
			>
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
		<!-- <div class="flex justify-between border-b border-lightgray py-4 align-middle">
			<p class="text-left">Created By Josh Allen</p>
			<p>
				<a
					class="text-acc1 font-semibold hover:font-semibold hover:underline"
					href="https://www.joshallendev.com/">My Website</a
				>
			</p>
		</div> -->
	</div>
</div>
