<template>
    <section>
        <h2>Stats</h2>

        <p>Total players: {{ total }}</p>
        <p v-if="bestPlayer">
            Best: {{ bestPlayer }} ({{ bestScore }})
        </p>
    </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

type LeaderboardItem = {
  rank: number;
  player: string;
  score: number;
  note?: string;
};

const props = defineProps<{
  rows: LeaderboardItem[];
}>();

const total = computed(() => props.rows.length);

const best = computed(() => {
  if (props.rows.length === 0) return null;
  return props.rows.reduce((acc, cur) => (cur.score > acc.score ? cur : acc));
});

const bestPlayer = computed(() => best.value?.player ?? "");
const bestScore = computed(() => best.value?.score ?? 0);
</script>
