<script lang=ts>
    import Header from '../components/Header.svelte';
    import Keyboard from '../components/Keyboard.svelte';
    import Gameboard from '../components/Gameboard.svelte';
</script>

<main class="h-screen w-screen bg-cyanp">
    <Header />
    <Gameboard />
    <Keyboard />
</main>

<style>
    main {
        min-width: 320px;
        display: inline-block;
    }
</style>