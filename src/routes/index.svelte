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

</script>

<main class="h-screen w-screen bg-sunray">
    <Header />
    <Gameboard rows={rows}/>
    <Keyboard />
</main>

<style>
    main {
        min-width: 320px;
        display: inline-block;
    }
</style>