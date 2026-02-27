<template>
  <div class="leaderboard-container">
    <h2>Leaderboard</h2>
    <p>Top players integrated with MySQL.</p>

    <div v-if="leaderboardStore.loading" class="loading">
      Cargando posiciones...
    </div>

    <div v-else-if="leaderboardStore.error" class="error">
      {{ leaderboardStore.error }}
    </div>

    <table v-else class="leaderboard-table">
      <thead>
        <tr>
          <th>Puesto</th>
          <th>Jugador</th>
          <th>Puntaje</th>
          <th>Nota</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in leaderboardStore.entries" :key="entry.rank">
          <td>#{{ entry.rank }}</td>
          <td>{{ entry.player }}</td>
          <td>{{ entry.score }}</td>
          <td>{{ entry.note || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useLeaderboardStore } from '../stores/leaderboard';

const leaderboardStore = useLeaderboardStore();

onMounted(() => {
  leaderboardStore.fetchLeaderboard();
});
</script>

<style scoped>
.leaderboard-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}
.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.leaderboard-table th, .leaderboard-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
.leaderboard-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}
.leaderboard-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
.loading {
  font-style: italic;
  color: #666;
  margin: 20px 0;
}
.error {
  color: red;
  margin: 20px 0;
}
</style>
