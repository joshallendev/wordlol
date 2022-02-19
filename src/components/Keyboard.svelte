<script lang=ts>
import { onMount } from 'svelte';

    import { correctGuesses, todaysWord, wrongGuesses, guessedWords, currentRow } from '../stores/gameStore';

    const letterArrays: Array<Array<string>> = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    const disabledColor: string = '#6c6c6c';
    const rowStyles: string = "";
    const letterStyles: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm bg-minion text-black select-none active:bg-darkminion hover:bg-darkminion";
    const correctGuessedLetterStyles: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm bg-frostbite text-black select-none";
    const wrongGuessedLetterStyles: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm bg-dovegray text-black select-none active:bg-dovegray";

    function handleClick(e): void {
        const text: string = e.target.innerText; 
        $guessedWords.push(text);
        console.log(guessedWords);
        if (e.target.type === 'button' && text.length === 1 && $todaysWord.includes(text)) {
            $correctGuesses = [...$correctGuesses, text];
        } else {
            $wrongGuesses = [...$wrongGuesses, text];
        }
    }
</script>

<div id="keyboard" on:click={handleClick}>
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
        <button type="button" class="{letterStyles}">CHECK MY GUESS</button>
        <button type="button" class="{letterStyles}">DEL</button>        
    </div>


</div>