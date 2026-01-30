<template>
    <div class="leaderboard-summary">
        <h2>Leaderboard Summary</h2>
        <table>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in leaderboardData" :key="index">
                    <td>{{ item.player }}</td>
                    <td>{{ item.score }}</td>
                </tr>
            </tbody>
        </table>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue";

    type LeaderboardItem = {
        player: string;
        score: number;

    }

    const leaderboardData = ref<LeaderboardItem[]>([]);
    const errorMessage = ref("");


    async function fetchleaderboardData() {
        try {
            const res = await fetch("http://localhost:3000/api/leaderboard-summary");

            if (!res.ok) throw new Error(`Server error ${res.status}`)

            const data = (await res.json()) as LeaderboardItem[];
            console.log(data);
            leaderboardData.value = data;
        } catch (err: any) {
            errorMessage.value = err?.message ?? "Unknown";
        }

    }

    onMounted(() => {
        fetchleaderboardData();
    })

</script>

<style scoped>
    .leaderboard-summary {
        margin-top: 10px;
    }

    table {
        margin: 0 auto;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ccc;
    }

    .error {
        color: rebeccapurple;
    }
</style>