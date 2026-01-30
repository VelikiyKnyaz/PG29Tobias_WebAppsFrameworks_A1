<template>
  <section>
    <h2>Player Info</h2>

    <div v-if="selected">
      <p><b>Selected player:</b> {{ selected.player }}</p>
      <p><b>Rank:</b> {{ selected.rank }}</p>
      <p><b>Score:</b> {{ selected.score }}</p>
      <p><b>Note:</b> {{ selected.note }}</p>
    </div>

    <p v-else>No selection yet. Click a row.</p>
  </section>
</template>

<script setup lang="ts">
type LeaderboardItem = {
  rank: number;
  player: string;
  score: number;
  note?: string;
};

defineProps<{
  selected: LeaderboardItem | null;
}>();
</script>
