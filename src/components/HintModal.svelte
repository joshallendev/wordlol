<script lang=ts>
    import { showHint, todaysWord, hintsUsed } from '../stores/gameStore';
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    const letterStyles: string =
		'board-letter inline w-14 h-14 mx-1 text-3xl mx-0.5 flex rounded-md justify-center items-center';
    let hintSpan, clueSpan;
    // $: hintSpanVisible = hintSpan.style.opacity === '1';
    // $: clueSpanVisible = clueSpan.style.opacity === '1';
    let type = $todaysWord.type;
    let clue = $todaysWord.clue[0];
    const dispatch = createEventDispatcher();


    function toggleVisibility(el: HTMLElement) {
        if (el.style.opacity === '1') {
            el.style.opacity = '0';
        } else {
            el.style.opacity = '1';
        }
    }

    function handleHintReveal() {
        if ($hintsUsed < 2) {
            $hintsUsed++;
        }
        dispatch('hint');
    }

</script>



<div 
    in:fade 
    out:fade 
    on:click={() => $showHint = !$showHint} 
    class="fixed flex items-center flex-col inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto">
    <div 
        on:click|stopPropagation 
        class="flex flex-col mt-3 text-center bg-white w-3/4 md:w-1/2 pt-2 pb-6 px-4 rounded mt-20 overflow-y-auto">
        <button 
            class="ml-auto align-middle" 
            on:click="{() => $showHint = !$showHint}">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                aria-hidden="true" 
                role="img" 
                style="vertical-align: middle; display: inline;" 
                width="25" 
                height="25" 
                preserveAspectRatio="xMidYMid meet" 
                viewBox="0 0 24 24">
                <path 
                    fill="currentColor" 
                    fill-rule="evenodd" 
                    d="M10.657 12.071L5 6.414L6.414 5l5.657 5.657L17.728 5l1.414 1.414l-5.657 5.657l5.657 5.657l-1.414 1.414l-5.657-5.657l-5.657 5.657L5 17.728z"
                />
            </svg>					
        </button>
        <h2 class="text-2xl font-medium text-gray-900 mb-2">MAGIC HINT BUTTON</h2>
        <p class="mb-2">No shame in using a hint, but it does get tracked in your stats if you reveal it.</p>
        <section class="flex flex-col items-center">
            <button type="button" class="bg-lightgray rounded mb-6 p-2" on:click={() => {
                toggleVisibility(hintSpan); 
                hintSpan.parentNode.nextElementSibling.style.opacity = 1;
                handleHintReveal(); }}>
                ✨ show me the hint! ✨
            </button>
            <span bind:this={hintSpan} class="mb-4 opacity-0 border-b-2 border-correct">The word is a {type}</span>			
        </section>
            <section class="opacity-0 flex flex-col items-center">
                <button type="button" class="block bg-lightgray rounded mb-6 p-2" on:click={() => {toggleVisibility(clueSpan);handleHintReveal();}}>
                    ✨ i'm stuck.. show me another hint! ✨
                </button>
                <span bind:this={clueSpan} class="opacity-0 border-b-2 border-correct">{clue}</span>
            </section>
    </div>
</div>

<style>
    span {
        transition: opacity 0.3s linear;
    }
</style>