<script lang=ts>

    const qwertyRow1: Array<string> = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const qwertyRow2: Array<string> = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const qwertyRow3: Array<string> = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];  
    
    
    const disabledColor: string = '#6c6c6c';
    const rowStyles: string = "";
    const btnStyles: string = "h-14 w-10 sm:w-14 flex justify-center px-2 py-4 sm:px-4 font-medium mx-0.5 text-sm bg-minion text-black select-none active:bg-darkminion hover:bg-darkminion";

    function handleClick(e): void {
        if (e.target.type === 'button') {
            console.log(e.target.innerText);
        }
    }
</script>

<div id="keyboard" on:click={handleClick}>
    <div id="key-row-1" class="my-3 flex justify-center">
        {#each qwertyRow1 as letter }
            <button type="button" class="{btnStyles}">{letter}</button>
        {/each}
    </div>
    <div id="key-row-2" class="my-3 flex justify-center">
        {#each qwertyRow2 as letter }
            <button type="button" class="{btnStyles}">{letter}</button>
        {/each}
    </div>
    <div id="key-row-3" class="my-3 flex justify-center">
        <button type="button" class="{btnStyles} w-12 sm:w-20">ENTER</button>
        
        {#each qwertyRow3 as letter }
            <button type="button" class="{btnStyles}">{letter}</button>
        {/each}
        <button type="button" class="{btnStyles} w-fit">DEL</button>
    </div>
</div>