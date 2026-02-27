import { defineStore } from 'pinia';
import api from '../services/api';

export interface LeaderboardEntry {
    rank: number;
    player: string;
    score: number;
    note?: string;
}

export const useLeaderboardStore = defineStore('leaderboard', {
    state: () => ({
        entries: [] as LeaderboardEntry[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchLeaderboard() {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get('/leaderboard');
                this.entries = response.data;
            } catch (err: any) {
                this.error = err.message || 'Failed to fetch leaderboard';
            } finally {
                this.loading = false;
            }
        }
    }
});
