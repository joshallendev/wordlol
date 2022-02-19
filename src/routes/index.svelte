<script lang=ts>
    import Header from '../components/Header.svelte';
    import Keyboard from '../components/Keyboard.svelte';
    import Gameboard from '../components/Gameboard.svelte';
    import { todaysWord, correctLetters } from '../stores/gameStore';

    export let rows:Array<Array<string>> = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ];

    export let wrongLetters: Array<Array<number>> = [

    ];
    export let rightLetters: Array<Array<number>> = [

    ];
    export let almostRightLetters: Array<Array<number>> = [

    ];

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
        console.log($correctLetters);
        // only actually check the guess if the current row 
        // is filled out
        if (currentLetter === rows[currentArray].length) {
            // check letters in current array for accuracy
            for (let i = 0; i < rows[currentArray].length; i++) {
                const letter = rows[currentArray][i];
                console.log(letter);
                console.log($todaysWord[i]);
                // if is in right position
                if (letter === $todaysWord[i]) {
                    $correctLetters = [...$correctLetters, [currentArray, i]]
                }
                // else if included in the word at all 
                // otherwise not a valid letter
            }

            currentArray++;
            currentLetter = 0;


        }
    }
</script>

<main class="h-screen w-screen bg-sunray">
    <Header />
    <Gameboard {rows} {wrongLetters} {rightLetters} {almostRightLetters} />
    <Keyboard on:letter={updateArrays} on:checkguess={checkGuess}/>
</main>

<style>
    main {
        min-width: 320px;
        display: inline-block;
    }
</style>