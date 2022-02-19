<script lang=ts>
import { createEventDispatcher, onMount } from 'svelte';

    import { correctGuesses, todaysWord, wrongGuesses, guessedWords, currentRow } from '../stores/gameStore';

    const letterArrays: Array<Array<string>> = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    const dispatch = createEventDispatcher();

    const disabledColor: string = '#6c6c6c';
    const rowStyles: string = "";
    const letterStyles: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm bg-minion text-black select-none active:bg-darkminion hover:bg-darkminion";
    const correctGuessedLetterStyles: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm bg-frostbite text-black select-none";
    const wrongGuessedLetterStyles: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm bg-dovegray text-black select-none active:bg-dovegray";

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
        $guessedWords.push(text);
        if (e.target.type === 'button' && text.length === 1 && $todaysWord.includes(text)) {
            $correctGuesses = [...$correctGuesses, text];
        } else {
            $wrongGuesses = [...$wrongGuesses, text];
        }
    }

    function handleBackspaceClick() {
        dispatch('letter', {
            text: null, 
            action: 'backspace'
        });
    }
</script>

<div id="keyboard" on:click={handleLetterClick}>
    {#each letterArrays as row }
        <div class="my-3 flex justify-center">
            {#each row as letter }
                {#if $correctGuesses.includes(letter)}
                    <button type="button" class="{correctGuessedLetterStyles}">{letter}</button>
                {:else if $wrongGuesses.includes(letter)}
                    <button type="button" class="{wrongGuessedLetterStyles}">{letter}</button>
                {:else}
                    <button type="button" class="{letterStyles}">{letter}</button>
                {/if}
            {/each}
        </div>
    {/each}

    <div class="my-3 flex justify-center">
        <button type="button" class="{letterStyles} w-auto sm:w-auto">CHECK MY GUESS</button>
        <button type="button" class="{letterStyles} w-auto sm:w-auto" on:click={handleBackspaceClick}>BACKSPACE</button>        
    </div>
</div>