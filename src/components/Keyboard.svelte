<script lang=ts>
    import { correctGuesses, todaysWord, wrongGuesses } from '../stores/gameStore';

    const qwertyRow1: Array<string> = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const qwertyRow2: Array<string> = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const qwertyRow3: Array<string> = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];  

    const letterArrays: Array = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    
    console.log($correctGuesses);
    const disabledColor: string = '#6c6c6c';
    const rowStyles: string = "";
    const letterStyles: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm bg-minion text-black select-none active:bg-darkminion hover:bg-darkminion";
    const correctGuessedLetterStyles: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm bg-frostbite text-black select-none";
    const wrongGuessedLetterStyles: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm bg-dovegray text-black select-none active:bg-dovegray";

    function handleClick(e): void {
        const text: string = e.target.innerText; 
        if (e.target.type === 'button' && text.length === 1 && $todaysWord.includes(text)) {
            $correctGuesses = [...$correctGuesses, text];
        } else {
            $wrongGuesses = [...$wrongGuesses, text];
        }
    }
</script>

<div id="keyboard" on:click={handleClick}>
    <div id="key-row-1" class="my-3 flex justify-center">
        {#each qwertyRow1 as letter }
            {#if $correctGuesses.includes(letter)}
                <button type="button" class="{correctGuessedLetterStyles}">{letter}</button>
            {:else if $wrongGuesses.includes(letter)}
                <button type="button" class="{wrongGuessedLetterStyles}">{letter}</button>
            {:else}
                <button type="button" class="{letterStyles}">{letter}</button>
            {/if}
        {/each}
    </div>
    <div id="key-row-2" class="my-3 flex justify-center">
        {#each qwertyRow2 as letter }
            {#if $correctGuesses.includes(letter)}
                <button type="button" class="{correctGuessedLetterStyles}">{letter}</button>
            {:else if $wrongGuesses.includes(letter)}
                <button type="button" class="{wrongGuessedLetterStyles}">{letter}</button>
            {:else}
                <button type="button" class="{letterStyles}">{letter}</button>
            {/if}
        {/each}
    </div>
    <div id="key-row-3" class="my-3 flex justify-center">
        <button type="button" class="{letterStyles} w-12 sm:w-20">ENTER</button>
        
        {#each qwertyRow3 as letter }
            {#if $correctGuesses.includes(letter)}
                <button type="button" class="{correctGuessedLetterStyles}">{letter}</button>
            {:else if $wrongGuesses.includes(letter)}
                <button type="button" class="{wrongGuessedLetterStyles}">{letter}</button>
            {:else}
                <button type="button" class="{letterStyles}">{letter}</button>
            {/if}
        {/each}
        <button type="button" class="{letterStyles} w-fit">DEL</button>
    </div>
</div>