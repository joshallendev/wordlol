<script lang=ts>

const letterStyles: string = "w-14 h-14 border border-black mx-1 bg-white text-lg mx-0.5 rounded"; 
export let rows;
import { guessedWords } from '../stores/gameStore';
</script>


{#each rows as row }
    <div class="letter-row flex justify-center my-1">
        {#each row as item }
            <div class="{letterStyles}">{item}</div>
        {/each}
    </div>
{/each}
