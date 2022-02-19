<script lang=ts>
    export let rows: Array<Array<string>>;
    
    import { correctLocations, wrongLocations, inWordLocations  } from '../stores/gameStore';
    
    const letterStyles: string = "w-14 h-14 border border-black mx-1 bg-white text-3xl mx-0.5 flex rounded-md justify-center"; 

    function checkForIncludes(arr1:Array<number>, arr2:Array<number>): boolean {
        return arr1.some(ele => JSON.stringify(ele) === JSON.stringify(arr2));
    }
</script>

{#each rows as row, i}
    <div class="flex justify-center my-2">
        {#each row as item, j}
            {#if checkForIncludes($correctLocations, [i,j]) }
                <div class="{letterStyles} bg-frostbite">{item}</div>
            {:else if checkForIncludes($inWordLocations, [i,j])}
                <div class="{letterStyles} bg-carolinablue">{item}</div>
            {:else if checkForIncludes($wrongLocations, [i,j])}
                <div class="{letterStyles} bg-dovegray">{item}</div>
            {:else}
                <div class="{letterStyles}">{item}</div>
            {/if}
        {/each}
    </div>
{/each}
