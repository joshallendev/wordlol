<script lang=ts>
     export let stats;
</script>

<div class="text-left px-1 py-2 flex flex-row justify-between flex-wrap">
    <div class="flex flex-col items-center text-center w-1/3 md:w-1/6">
        <strong><p class="text-l">{stats.totalGames}</p></strong>
        <p class="text-base w-1/2 text-center">Games Played</p>
    </div>
    <div class="flex flex-col items-center text-center w-1/3 md:w-1/6">
        <strong><p class="text-l">{stats.winPct}%</p></strong>
        <p class="text-base w-1/2">Win Pct</p>
    </div>
    <div class="flex flex-col items-center text-center w-1/3 md:w-1/6">
        <strong><p class="text-l">{stats.totalWins}</p></strong>
        <p class="text-base w-1/2">Total Wins</p>
    </div>
    <div class="flex flex-col items-center text-center w-1/3 md:w-1/6">
        <strong><p class="text-l">{stats.currentStreak}</p></strong>
        <p class="text-base w-1/2">Current Streak</p>
    </div>
    <div class="flex flex-col items-center text-center w-1/3 md:w-1/6">
        <strong><p class="text-l">{stats.maxDayStreak}</p></strong>
        <p class="text-base w-1/2">Longest Streak</p>
    </div>
    <div class="flex flex-col items-center text-center w-1/3 md:w-1/6">
        <strong><p class="text-l">{stats.hints ?? '0'}</p></strong>
        <p class="text-base w-1/2">Total Hints</p>
    </div>
</div>