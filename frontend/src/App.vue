<template>
    <div id="app">
        <header>
            <nav>
                <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>

                <router-link to="/leaderboard">Leaderboard</router-link>
                <router-link to="/contact">Contact</router-link>
            </nav>
        </header>

        <main>
            <router-view />
        </main>
    </div>
</template>
