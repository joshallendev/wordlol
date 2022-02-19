<script lang=ts>
    import Header from '../components/Header.svelte';
    import Keyboard from '../components/Keyboard.svelte';
    import Gameboard from '../components/Gameboard.svelte';

    export let rows:Array<Array<string>> = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ]

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
                // go back a letter
                currentLetter--;
                rows[currentArray][currentLetter] = "";
                break;
            default:
                break;
        }
        
    }



</script>

<main class="h-screen w-screen bg-sunray">
    <Header />
    <Gameboard {rows} />
    <Keyboard on:letter={updateArrays} />
</main>

<style>
    main {
        min-width: 320px;
        display: inline-block;
    }
</style>