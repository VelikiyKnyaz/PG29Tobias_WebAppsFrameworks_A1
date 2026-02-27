<template>
  <div class="contact-container">
    <h2>Contact Us</h2>
    <p>We'd love to hear your feedback!</p>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>

    <form @submit.prevent="handleSubmit" class="contact-form" v-else>
      <div class="form-group">
        <label for="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          v-model="form.name" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email" 
          required 
        />
      </div>
      
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea 
          id="message" 
          v-model="form.message" 
          rows="5" 
          required
        ></textarea>
      </div>
      
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import api from '../services/api';

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
    // Basic Validation
    if (!form.name || !form.email || !form.message) {
        errorMessage.value = "All fields are required.";
        return;
    }

    isSubmitting.value = true;
    errorMessage.value = '';

    try {
        const payload = {
            name: form.name,
            email: form.email,
            message: form.message
        };

        const response = await api.post('/contact', payload);

        if (response.data.ok) {
            successMessage.value = "Your message has been sent successfully!";
            form.message = ''; // Clear message
        } else {
             errorMessage.value = response.data.error || "Failed to send message.";
        }
    } catch (err: any) {
        errorMessage.value = err.response?.data?.error || err.message || "An error occurred.";
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<style scoped>
.contact-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}
.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}
.form-group input, .form-group textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-group input:disabled {
    background-color: #f5f5f5;
    color: #888;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.success-message {
  color: green;
  background-color: #e8f5e9;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}
.error {
  color: red;
  margin-top: 5px;
}
</style>
