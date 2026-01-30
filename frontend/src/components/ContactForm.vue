<template>
    <form @submit.prevent="submitForm" style="display: grid; gap: 8px; max-width: 420px;">
        <label>
            Name
            <input v-model="name" type="text" required />
        </label>

        <label>
            Email
            <input v-model="email" type="email" required />
        </label>

        <label>
            Message
            <textarea v-model="message" rows="4" required />
        </label>

        <button type="submit" :disabled="loading">
            {{ loading ? "Sending..." : "Submit" }}
        </button>

        <p v-if="status" style="font-size: 12px;">{{ status }}</p>
        <p v-if="error" style="color: rebeccapurple;">{{ error }}</p>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");

const loading = ref(false);
const status = ref("");
const error = ref("");

async function submitForm() {
  loading.value = true;
  status.value = "";
  error.value = "";

  try {
    const res = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error ?? `Server error ${res.status}`);
    }

    status.value = "Message sent! Grasias";
    name.value = "";
    email.value = "";
    message.value = "";
  } catch (err: any) {
    error.value = err?.message ?? "Unknown error";
  } finally {
    loading.value = false;
  }
}
</script>
