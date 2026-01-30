<template>
    <div>
        <h1>Cool game</h1>
        <p>Best game ever!</p>

        <!--Widgets-->
        <CounterWidget />
        <LeaderboardSummary />
    </div>
</template>

<script setup lang="ts">
    import CounterWidget from "../components/CounterWidget.vue"
    import LeaderboardSummary from "../components/LeaderboardSummary.vue"
</script>

<style scoped>
    .landing-page {
        text-align: center;
        margin-top: 10px;
    }
</style>