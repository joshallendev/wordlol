<script lang=ts>
    import Header from '../components/Header.svelte';
    import Keyboard from '../components/Keyboard.svelte';
    import Gameboard from '../components/Gameboard.svelte';
    import { todaysWord, 
        correctLocations, 
        wrongLocations, 
        inWordLocations,
        correctLetters,
        wrongLetters,
        inWordLetters,
        wordLength,
        maxGuesses,
    } from '../stores/gameStore';
    import { onMount } from 'svelte';

    const makeRows = () => {
        let tempRows = [];
        for (let i = 0; i < $maxGuesses; i++) {
            const row = [];
            for (let j = 0; j < $wordLength; j++) {
                row.push("");
            }   
            tempRows.push(row);
        }
        return tempRows;
    }

    export let rows = makeRows();

    let currentArray = 0; 
    let currentLetter = 0;

    function updateArrays(event) {
        switch (event.detail.action) {
            case 'add':
                if (currentLetter < rows[currentArray].length) {
                    rows[currentArray][currentLetter] = event.detail.text;
                    currentLetter++;
                }
                break;
            case 'backspace':
                // go back a letter but never lass than 0
                currentLetter > 0 ? currentLetter-- : null;
                rows[currentArray][currentLetter] = "";
                break;
            default:
                break;
        }
        
    }

    function checkGuess() {
        // only actually check the guess if the current row 
        // is filled out
        if (currentLetter === rows[currentArray].length) {
            // check letters in current array for accuracy
            for (let i = 0; i < rows[currentArray].length; i++) {
                const letter = rows[currentArray][i];
                // if is in right position
                if (letter === $todaysWord[i]) {
                    $correctLocations  = [...$correctLocations , [currentArray, i]]
                    $correctLetters  = [...$correctLetters , letter]
                } else if ($todaysWord.includes(letter)) {
                    $inWordLocations = [...$inWordLocations, [currentArray, i]]
                    $inWordLetters = [...$inWordLetters, letter]
                } else {
                    $wrongLocations = [...$wrongLocations, [currentArray, i]]
                    $wrongLetters = [...$wrongLetters, letter]
                }
                // else if included in the word at all 
                // otherwise not a valid letter
            }

            currentArray++;
            currentLetter = 0;


        }
    }

    onMount(() => console.log($todaysWord));
</script>

<main class="h-screen w-screen bg-sunray">
    <Header />
    <Gameboard {rows} />
    <Keyboard on:letter={updateArrays} on:checkguess={checkGuess}/>
    <!-- {#if gameOver }
        
    {/if} -->
</main>