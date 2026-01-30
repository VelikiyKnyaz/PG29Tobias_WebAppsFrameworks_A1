<template>
    <div>
        <h1>Leaderboard</h1>

        <button @click="refresh()">Refresh</button>

        <div style="display: flex; gap: 16px; margin-top: 12px;">
            <div style="flex: 2;">
                <LeaderboardTable :refreshToken="refreshToken"
                                  @loaded="onLoaded"
                                  @select="onSelect" />
            </div>

            <div style="flex: 1;">
                <LeaderboardStats :rows="rows" />
                <hr />
                <LeaderboardSidebar :selected="selected" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LeaderboardTable from "../components/LeaderboardTable.vue";
import LeaderboardStats from "../components/LeaderboardStats.vue";
import LeaderboardSidebar from "../components/LeaderboardSidebar.vue";

type LeaderboardItem = {
  rank: number;
  player: string;
  score: number;
  note?: string;
};

const rows = ref<LeaderboardItem[]>([]);
const selected = ref<LeaderboardItem | null>(null);
const refreshToken = ref(0);

function refresh() {
  refreshToken.value++;
}

function onLoaded(data: LeaderboardItem[]) {
  rows.value = data;
  // si no hay seleccionado, selecciona el primero por defecto
  if (!selected.value && data.length > 0) selected.value = data[0];
}

function onSelect(row: LeaderboardItem) {
  selected.value = row;
}
</script>
