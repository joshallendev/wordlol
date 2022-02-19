<script lang=ts>
    import { createEventDispatcher } from 'svelte';

    import { correctLetters,
        wrongLetters,
        inWordLetters } from '../stores/gameStore';

    const letterArrays: Array<Array<string>> = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    const dispatch = createEventDispatcher();

    const letterStyles: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm text-black select-none hover:bg-darkminion rounded bg-minion active:bg-darkminion";
    const correctLetterStyles: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm text-black select-none hover:bg-darkminion rounded bg-frostbite";
    const wrongLetterClasses: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm text-black select-none hover:bg-darkminion rounded bg-dovegray";
    const inWordLetterClasses: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm text-black select-none hover:bg-darkminion rounded bg-carolinablue";

    function handleLetterClick(e): void {
        const text: string = e.target.innerText; 
        // only forward the letter to the letters array
        // if it's truly a single letter
        if (e.target.type === 'button' && text.length === 1) {
            dispatch('letter', {
                text: text, 
                action: 'add'
            });
        }
    }

    function handleBackspaceClick() {
        dispatch('letter', {
            text: null, 
            action: 'backspace'
        });
    }

    function handleCheckGuess() {
        dispatch('checkguess');
    }
</script>

<div on:click={handleLetterClick}>
    {#each letterArrays as row }
        <div class="my-3 flex justify-center">
            {#each row as letter }
                {#if $correctLetters.includes(letter)}
                    <button type="button" class="{correctLetterStyles}">{letter}</button>
                {:else if $wrongLetters.includes(letter)}
                        <button type="button" class="{wrongLetterClasses}">{letter}</button>
                {:else if $inWordLetters.includes(letter)}
                    <button type="button" class="{inWordLetterClasses}">{letter}</button>
                {:else}
                    <button type="button" class="{letterStyles}">{letter}</button>
                {/if}
            {/each}
        </div>
    {/each}

    <div class="my-3 flex justify-center">
        <button type="button" class="{letterStyles} w-auto sm:w-auto" on:click={handleCheckGuess}>CHECK MY GUESS</button>
        <button type="button" class="{letterStyles} w-auto sm:w-auto" on:click={handleBackspaceClick}>BACKSPACE</button>        
    </div>
</div>