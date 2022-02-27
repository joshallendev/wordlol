<script lang=ts>
    import { showInfo } from '../stores/gameStore';
    import { fade } from 'svelte/transition';
import { onMount } from 'svelte';
import { loop_guard } from 'svelte/internal';
    const letterStyles: string =
		'board-letter inline w-14 h-14 mx-1 text-3xl mx-0.5 flex rounded-md justify-center items-center';

    function handleScroll(e) {
        if (e.target.scrollTop + Math.round(e.target.getBoundingClientRect().height) === e.target.scrollHeight) {
            // hide the down arrow
            document.getElementById('scroll-down').style.display = 'none';

        } else {
            // show the down arrow
            document.getElementById('scroll-down').style.display = 'block';
        }
    }

</script>

<div
    in:fade 
    out:fade 
    on:click={() => $showInfo = !$showInfo} 
    class="fixed flex items-center flex-col inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
    <div 
        id="info-modal"

        on:click|stopPropagation 
        on:scroll={handleScroll}
        class="flex flex-col mt-3 text-center bg-white w-3/4 md:w-1/2 pt-2 pb-6 px-4 rounded mt-20 h-3/4 overflow-y-auto pb-5">
        <button 
            class="ml-auto align-middle" 
            on:click="{() => $showInfo = !$showInfo}">
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
        <h2 class="text-xl font-medium text-gray-900 mb-4">HOW TO PLAY</h2>
        <section id="instructions" class="text-left">
            <p class="py-1">Guess the League of Legends related <strong>WORDLOL</strong> in 6 tries or less.</p>
            <p class="py-1">Words are not limited to champion names.</p>
            <p class="py-1">Words over 5 letters will have random characters revealed to help.</p>
            <p class="py-1">After guessing the letters will change colors to show how close you are to the secret word.</p>
            <p class="py-1">If using a keyboard, you can type on that or the on-screen keys.</p>
        </section>
        <section id="examples">
            <p class="text-l font-semibold py-4">EXAMPLES</p>
            <div class="flex flex-row justify-center my-2">
                <div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">K</div>
                <div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">A</div>
                <div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">I</div>
                <div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">S</div>
                <div class="{letterStyles} bg-correct text-white">A</div>
            </div>

            <p class="py-1"><strong>A</strong> is in the correct position.</p>

            <div class="flex flex-row justify-center my-2">
                <div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">P</div>
                <div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">E</div>
                <div class="{letterStyles} bg-squash text-white">N</div>
                <div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">T</div>
                <div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">A</div>
            </div>

            <p class="py-1"><strong>N</strong> is in the word but in the wrong location.</p>

            <div class="flex flex-row justify-center my-2">
                <div class="{letterStyles} bg-darkgray text-lightgray">T</div>
                <div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">E</div>
                <div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">E</div>
                <div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">M</div>
                <div class="{letterStyles} bg-[#f2f2f2] border-darkgray border text-black">O</div>
            </div>

            <p class="py-1"><strong>T</strong> is not in the word at all.</p>

        </section>        
        <div class="mt-2">
            <p class="text-l font-semibold py-4">About WORDLOL</p>
            <p class="py-1">WORDLOL is a League of Legends themed clone of the original Wordle game.</p>
            <p><a class="font-semibold hover:text-actionred hover:underline" href="https://github.com/joshallendev/wordlol">Peek at the code</a></p>
            <p><a class="font-semibold hover:text-actionred hover:underline" href="https://www.nytimes.com/games/wordle/index.html">Play Wordle</a></p>

        </div>				
    </div>
    <svg id="scroll-down" class="scroll-down" fill="#39ccb1" height="75" viewBox="0 0 24 24" width="75" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
        <path d="M0-.75h24v24H0z" fill="none"/>
    </svg>
</div>

<style>
    .scroll-down {
        margin:0 auto;
        position:relative;
        bottom:10%;
        animation-name:bounce;
        animation-duration:1s;
        animation-iteration-count:infinite;
        animation-direction: alternate;
    }

    @keyframes bounce {
        from {
            transform:translateY(0px);
        }
        to {
            transform:translateY(10px);
        }
    }
</style>