<script lang=ts>
    import { maxGuesses } from '../stores/gameStore';
    export let stats; 
    const values: Array<number> = Object.values(stats.guessCounts);
    let guessEntries = Object.entries(stats.guessCounts);
    guessEntries = fillMissingValues(guessEntries).sort((a: any, b:any) => {return a[0] - b[0]});
    const highestGuessCount = Math.max(...values);

    function fillMissingValues(arr) {
        for (let index = 1; index <= maxGuesses; index++) {
            const containsIndex = arr.some(e => e[0] == index);
            if (!containsIndex) {
                arr.push([index.toString(), 0]);
            }
        }
        return arr;
    }

    function calculateGraphBarWidth(value) {
        let width: number = (value / highestGuessCount) * 100;
        if (!width) {
            width = 10;
        }
        return width.toString() + "%";
    }

</script>
{#if stats.guessCounts }
    <div class="w-full rounded-lg py-2">
        <p class="font-semibold text-base">GUESS DISTRIBUTION</p>
        <div class="text-sm">
        {#each guessEntries as guessEntry }
            <div class="flex flex-row align-middle mx-2 h-5 my-1">
                <div class="px-2 text-sm w-6">{guessEntry[0]}</div>
                <div style:width={calculateGraphBarWidth(guessEntry[1])} 
                    class="{guessEntry[1] === highestGuessCount ?"bg-correct" : "bg-darkgray"} text-white rounded-xl">
                    {guessEntry[1]}
                </div>
            </div>
        {/each}
        </div>
    </div>
{/if}
