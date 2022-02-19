<script lang=ts>
    const letterStyles: string = "w-14 h-14 border border-black mx-1 bg-white text-3xl mx-0.5 rounded flex justify-center"; 
    export let rows: Array<Array<string>>;
    export let wrongLetters: Array<Array<number>>;
    export let rightLetters: Array<Array<number>>;
    export let almostRightLetters: Array<Array<number>>;
    import { correctLetters } from '../stores/gameStore';
</script>


{#each rows as row, i}
    <div class="letter-row flex justify-center my-1">
        {#each row as item, j}
            {#if $correctLetters.some(ele => JSON.stringify(ele) === JSON.stringify([i, j])) }
                <div class="{letterStyles} bg-frostbite">{item}</div>
            {:else}
                <div class="{letterStyles}">{item}</div>
            {/if}
        {/each}
    </div>
{/each}
