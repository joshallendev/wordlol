<script lang=ts>
    import { showHint, todaysWord, correctLetters } from '../stores/gameStore';
    import { fade } from 'svelte/transition';
import { onMount } from 'svelte';
    const letterStyles: string =
		'board-letter inline w-14 h-14 mx-1 text-3xl mx-0.5 flex rounded-md justify-center items-center';
        let hintSpan;
        let hint;

    function getLetterForHint() {
        let wordLetters = $todaysWord.split("").filter((ltr) => !$correctLetters.includes(ltr));
        const random = Math.floor(Math.random() * wordLetters.length);
        const hint = wordLetters[random];
        return hint;
    }

    onMount(() => hint = getLetterForHint());
</script>



<div 
    in:fade 
    out:fade 
    on:click={() => $showHint = !$showHint} 
    class="fixed flex items-center flex-col inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto">
    <div 
        on:click|stopPropagation 
        class="flex flex-col mt-3 text-center bg-white w-3/4 md:w-1/2 pt-2 pb-6 px-4 rounded mt-20 overflow-y-auto">
        <button 
            class="ml-auto align-middle" 
            on:click="{() => $showHint = !$showHint}">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                aria-hidden="true" 
                role="img" 
                style="vertical-align: middle; display: inline;" 
                width="25" 
                height="25" 
                preserveAspectRatio="xMidYMid meet" 
                viewBox="0 0 24 24">
                <path 
                    fill="currentColor" 
                    fill-rule="evenodd" 
                    d="M10.657 12.071L5 6.414L6.414 5l5.657 5.657L17.728 5l1.414 1.414l-5.657 5.657l5.657 5.657l-1.414 1.414l-5.657-5.657l-5.657 5.657L5 17.728z"
                />
            </svg>					
        </button>
        <h2 class="text-2xl font-medium text-gray-900 mb-8">MAGIC HINT BUTTON</h2>
        <button type="button" class="bg-lightgray rounded mb-6 p-2" on:click={() => hintSpan.style.visibility = 'visible'}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" style="vertical-align: middle; display: inline;" width="30" height="30" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><g transform="translate(36 0) scale(-1 1)"><path fill="#292F33" d="M3.651 29.852L29.926 3.576c.391-.391 2.888 2.107 2.497 2.497L6.148 32.349c-.39.391-2.888-2.107-2.497-2.497z"/><path fill="#66757F" d="M30.442 4.051L4.146 30.347l.883.883L31.325 4.934z"/><path fill="#E1E8ED" d="m34.546 2.537l-.412-.412l-.671-.671a.967.967 0 0 0-.255-.169a.988.988 0 0 0-1.159.169l-2.102 2.102l.495.495l.883.883l1.119 1.119l2.102-2.102a.999.999 0 0 0 0-1.414zM5.029 31.23l-.883-.883l-.495-.495l-2.209 2.208a.988.988 0 0 0-.169 1.159c.046.09.094.18.169.255l.671.671l.412.412a.999.999 0 0 0 1.414 0l2.208-2.208l-1.118-1.119z"/><path fill="#F5F8FA" d="m31.325 4.934l2.809-2.809l-.671-.671a.967.967 0 0 0-.255-.169l-2.767 2.767l.884.882zM4.146 30.347L1.273 33.22c.046.09.094.18.169.255l.671.671l2.916-2.916l-.883-.883z"/><path fill="#FFAC33" d="m28.897 14.913l1.542-.571l.6-2.2a.667.667 0 0 1 1.287 0l.6 2.2l1.542.571a.665.665 0 0 1 0 1.25l-1.534.568l-.605 2.415a.667.667 0 0 1-1.293 0l-.605-2.415l-1.534-.568a.665.665 0 0 1 0-1.25M11.961 5.285l2.61-.966l.966-2.61a1.103 1.103 0 0 1 2.07 0l.966 2.61l2.609.966a1.103 1.103 0 0 1 0 2.07l-2.609.966l-.966 2.61a1.105 1.105 0 0 1-2.07 0l-.966-2.61l-2.61-.966a1.104 1.104 0 0 1 0-2.07M24.13 20.772l1.383-.512l.512-1.382a.585.585 0 0 1 1.096 0l.512 1.382l1.382.512a.584.584 0 0 1 0 1.096l-1.382.512l-.512 1.382a.585.585 0 0 1-1.096 0l-.512-1.382l-1.383-.512a.585.585 0 0 1 0-1.096"/></g></svg> 
            show me the hint!
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="30" height="30" role="img" style="vertical-align: middle; display: inline;" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="#292F33" d="M3.651 29.852L29.926 3.576c.391-.391 2.888 2.107 2.497 2.497L6.148 32.349c-.39.391-2.888-2.107-2.497-2.497z"/><path fill="#66757F" d="M30.442 4.051L4.146 30.347l.883.883L31.325 4.934z"/><path fill="#E1E8ED" d="m34.546 2.537l-.412-.412l-.671-.671a.967.967 0 0 0-.255-.169a.988.988 0 0 0-1.159.169l-2.102 2.102l.495.495l.883.883l1.119 1.119l2.102-2.102a.999.999 0 0 0 0-1.414zM5.029 31.23l-.883-.883l-.495-.495l-2.209 2.208a.988.988 0 0 0-.169 1.159c.046.09.094.18.169.255l.671.671l.412.412a.999.999 0 0 0 1.414 0l2.208-2.208l-1.118-1.119z"/><path fill="#F5F8FA" d="m31.325 4.934l2.809-2.809l-.671-.671a.967.967 0 0 0-.255-.169l-2.767 2.767l.884.882zM4.146 30.347L1.273 33.22c.046.09.094.18.169.255l.671.671l2.916-2.916l-.883-.883z"/><path fill="#FFAC33" d="m28.897 14.913l1.542-.571l.6-2.2a.667.667 0 0 1 1.287 0l.6 2.2l1.542.571a.665.665 0 0 1 0 1.25l-1.534.568l-.605 2.415a.667.667 0 0 1-1.293 0l-.605-2.415l-1.534-.568a.665.665 0 0 1 0-1.25M11.961 5.285l2.61-.966l.966-2.61a1.103 1.103 0 0 1 2.07 0l.966 2.61l2.609.966a1.103 1.103 0 0 1 0 2.07l-2.609.966l-.966 2.61a1.105 1.105 0 0 1-2.07 0l-.966-2.61l-2.61-.966a1.104 1.104 0 0 1 0-2.07M24.13 20.772l1.383-.512l.512-1.382a.585.585 0 0 1 1.096 0l.512 1.382l1.382.512a.584.584 0 0 1 0 1.096l-1.382.512l-.512 1.382a.585.585 0 0 1-1.096 0l-.512-1.382l-1.383-.512a.585.585 0 0 1 0-1.096"/></svg> 
        </button>
        <span bind:this={hintSpan} class="invisible border-b-2 border-correct">Today's word contains the letter {hint}!</span>			
    </div>
</div>