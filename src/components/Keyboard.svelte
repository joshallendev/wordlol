<script lang=ts>

    const qwertyRow1: Array<string> = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const qwertyRow2: Array<string> = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const qwertyRow3: Array<string> = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];  

    const disabledColor: string = '#6c6c6c';

    const btnStyles: string = "px-4 py-4 mx-0.5 font-semibold text-med bg-minion text-black rounded-half shadow-sm";

    function handleClick(e): void {
        if (e.target.type === 'button') {
            console.log(e.target.innerText);
        }
    }
</script>

<div id="keyboard" on:click={handleClick} class="flex flex-col w-screen items-center">
    <div id="key-row-1" class="my-0.5">
        {#each qwertyRow1 as letter }
            <button type="button" class="{btnStyles}">{letter}</button>
        {/each}
    </div>
    <div id="key-row-2" class="my-0.5">
        {#each qwertyRow2 as letter }
            <button type="button" class="{btnStyles}">{letter}</button>
        {/each}
    </div>
    <div id="key-row-3" class="my-0.5">
        {#each qwertyRow3 as letter }
            <button type="button" class="{btnStyles}">{letter}</button>
        {/each}
    </div>
    <div id="key-row-4" class="my-0.5">
        <button type="button" class="{btnStyles}">BACKSPACE</button>
        <button type="button" class="{btnStyles}">ENTER</button>
    </div>
</div>