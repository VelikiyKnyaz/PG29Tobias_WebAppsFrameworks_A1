<template>
    <section>
        <h2>Table</h2>

        <p v-if="loading">Loading...</p>
        <p v-if="error" style="color: rebeccapurple;">{{ error }}</p>

        <table v-if="!loading && rows.length" style="border-collapse: collapse; width: 100%;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ccc;">Rank</th>
                    <th style="border: 1px solid #ccc;">Player</th>
                    <th style="border: 1px solid #ccc;">Score</th>
                    <th style="border: 1px solid #ccc;">Note</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="r in rows"
                    :key="r.rank"
                    @click="selectRow(r)"
                    style="cursor: pointer;">
                    <td style="border: 1px solid #ccc;">{{ r.rank }}</td>
                    <td style="border: 1px solid #ccc;">{{ r.player }}</td>
                    <td style="border: 1px solid #ccc;">{{ r.score }}</td>
                    <td style="border: 1px solid #ccc;">{{ r.note }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from "vue";

    type LeaderboardItem = {
        rank: number;
        player: string;
        score: number;
        note?: string;
    };

    const props = defineProps<{
        refreshToken: number;
    }>();

    const emit = defineEmits<{
        (e: "loaded", rows: LeaderboardItem[]): void;
        (e: "select", row: LeaderboardItem): void;
    }>();

    const rows = ref<LeaderboardItem[]>([]);
    const loading = ref(false);
    const error = ref("");

    async function fetchData() {
        loading.value = true;
        error.value = "";

        try {
            const res = await fetch("http://localhost:3000/api/leaderboard");
            if (!res.ok) throw new Error(`Server error ${res.status}`);

            const data = (await res.json()) as LeaderboardItem[];
            rows.value = data;
            emit("loaded", data);
        } catch (err: any) {
            error.value = err?.message ?? "Unknown error";
        } finally {
            loading.value = false;
        }
    }

    function selectRow(row: LeaderboardItem) {
        emit("select", row);
    }

    onMounted(fetchData);

    watch(
        () => props.refreshToken,
        () => fetchData()
    );
</script>
