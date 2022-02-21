<script lang=ts>
    import { fade } from 'svelte/transition';
    import {
		hasWon,
	} from '../stores/gameStore';

    export let showModal;
    export let newStats;
    export let handleShare;
</script>



<div in:fade out:fade class="fixed flex items-center flex-col inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
    <div class="flex flex-col mt-3 text-center bg-white w-1/2 md:w-1/3 py-8 rounded mt-20">
        <button class="ml-auto px-4 align-middle" on:click="{() => showModal = !showModal}">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="vertical-align: middle; display: inline;" width="25" height="25" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.657 12.071L5 6.414L6.414 5l5.657 5.657L17.728 5l1.414 1.414l-5.657 5.657l5.657 5.657l-1.414 1.414l-5.657-5.657l-5.657 5.657L5 17.728z"/></svg>					
        </button>
        <h3 class="text-lg font-medium text-gray-900">{ $hasWon ? 'Well done!' : 'Better luck next time.'}</h3>
        <div class="mt-2 text-center">
            <p class="text-md text-gray-500">{ $hasWon ? 'You did great.' : 'Tomorrow is all you.'}</p>
            <p class="text-sm text-gray-500">Let's check out your stats</p>
            <div class="text-left px-6 py-2">
                <ul>
                    <li>Total games played: {newStats.totalGames}</li>
                    <li>Total games won: {newStats.totalWins}</li>
                    <li>Current Streak: {newStats.currentStreak}</li>
                    <li>Longest streak: {newStats.maxDayStreak}</li>
                    {#if $hasWon }
                        <li>Won in {newStats.numGuesses} guesses.</li>
                    {/if}	
                </ul>
            </div>
            <button type="button" class="bg-frostbite p-2 rounded align-middle" on:click="{handleShare}"> 
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="vertical-align: middle; display: inline;" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19.754 11a.75.75 0 0 1 .743.648l.007.102v7a3.25 3.25 0 0 1-3.065 3.246l-.185.005h-11a3.25 3.25 0 0 1-3.244-3.066l-.006-.184V11.75a.75.75 0 0 1 1.494-.102l.006.102v7a1.75 1.75 0 0 0 1.607 1.745l.143.006h11A1.75 1.75 0 0 0 19 18.894l.005-.143V11.75a.75.75 0 0 1 .75-.75ZM6.22 7.216l4.996-4.996a.75.75 0 0 1 .976-.073l.084.072l5.005 4.997a.75.75 0 0 1-.976 1.134l-.084-.073l-3.723-3.716l.001 11.694a.75.75 0 0 1-.648.743l-.102.007a.75.75 0 0 1-.743-.648L11 16.255V4.558L7.28 8.277a.75.75 0 0 1-.976.073l-.084-.073a.75.75 0 0 1-.073-.977l.073-.084l4.996-4.996L6.22 7.216Z"/></svg> Share Results
            </button>
        </div>				
    </div>
</div>