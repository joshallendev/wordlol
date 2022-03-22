<script lang=ts>
    export let stats;
    const statStyles = 'text-3xl semibold'; 
    const titleStyles = 'text-sm w-1/2 text-center';
    const statDivStyles = 'flex flex-col items-center text-center w-1/3 md:w-1/6';
</script>

<div class="text-left px-1 py-2 flex flex-row justify-between flex-wrap">
    <div class={statDivStyles}>
        <strong><p class={statStyles}>{stats.totalGames}</p></strong>
        <p class={titleStyles}>Games Played</p>
    </div>
    <div class={statDivStyles}>
        <strong><p class={statStyles}>{stats.winPct || '0'}%</p></strong>
        <p class={titleStyles}>Win Pct</p>
    </div>
    <div class={statDivStyles}>
        <strong><p class={statStyles}>{stats.totalWins}</p></strong>
        <p class={titleStyles}>Total Wins</p>
    </div>
    <div class={statDivStyles}>
        <strong><p class={statStyles}>{stats.currentStreak}</p></strong>
        <p class={titleStyles}>Current Streak</p>
    </div>
    <div class={statDivStyles}>
        <strong><p class={statStyles}>{stats.maxDayStreak}</p></strong>
        <p class={titleStyles}>Longest Streak</p>
    </div>
    <div class={statDivStyles}>
        <strong><p class={statStyles}>{stats.hints ?? '0'}</p></strong>
        <p class={titleStyles}>Total Hints</p>
    </div>
</div>