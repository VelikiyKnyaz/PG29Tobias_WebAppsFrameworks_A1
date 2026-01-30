import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import AboutPage from "../views/AboutPage.vue";

import LeaderboardPage from "../views/LeaderboardPage.vue";
import ContactPage from "../views/ContactPage.vue";

const routes: RouteRecordRaw[] = [
    { path: "/", name: "Landing", component: LandingPage },
    { path: "/about", name: "About", component: AboutPage },

    { path: "/leaderboard", name: "Leaderboard", component: LeaderboardPage },
    { path: "/contact", name: "Contact", component: ContactPage },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
