<template>
    <div id="app">
        <header>
            <nav>
                <div class="nav-links">
                    <router-link to="/">Home</router-link>
                    <router-link to="/about">About</router-link>
                    <router-link to="/leaderboard">Leaderboard</router-link>
                    <router-link to="/contact">Contact</router-link>
                </div>
            </nav>
        </header>

        <main>
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
// Authentication removed based on user request.
</script>

<style scoped>
header {
    background-color: #f8f9fa;
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.nav-links a {
    margin-right: 15px;
    text-decoration: none;
    color: #333;
    font-weight: bold;
}

.nav-links a.router-link-exact-active {
    color: #4CAF50;
}

.auth-section {
    display: flex;
    align-items: center;
    gap: 15px;
}

.welcome-text {
    font-weight: bold;
    color: #555;
}

.logout-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.login-link {
    background-color: #007bff;
    color: white !important;
    padding: 5px 10px;
    border-radius: 4px;
    text-decoration: none;
}
</style>
