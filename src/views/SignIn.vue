<script setup>
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

function validateInput() {
    if (!email.value || !password.value) {
        return 'Please enter your email and password.';
    }
    if (!email.value.includes('@') || !email.value.includes('.')) {
        return 'Please enter a valid email address.';
    }
    return null;
}

async function signIn() {
    // Validate input before sending request
    const validationError = validateInput();
    if (validationError) {
        errorMessage.value = validationError;
        return;
    }

    const response = await fetch('https://hap-app-api.azurewebsites.net/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value, password: password.value }),
    }).catch(() => {
        errorMessage.value = 'Network error: Please check your connection.';
        return null;
    });

    if (!response) return;

    if (response.status === 200) {
        const data = await response.json();
        console.log('Login successful:', data);

        // Store user token
        // localStorage.setItem('token', data.token);
        // localStorage.setItem('email', email.value);
        // localStorage.setItem('lname', data.user.lastName)
        // localStorage.setItem('fname', data.user.firstName)
        // localStorage.setItem('username', data.user.userName);
        userStore.setUser(data.token, data.user.firstName, data.user.lastName, data.user.email, data.user.userName);

        // Redirect to main page
        router.push({ name: 'main' });
    } else if (response.status === 400) {
        errorMessage.value = 'Invalid email or password.';
    } else {
        errorMessage.value = 'An unexpected error occurred. Please try again.';
    }
}
</script>

<template>
    <Header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
        </nav>
    </Header>

    <main class="padding-block-700">
        <section class="container center in-form">
            <input type="email" required v-model="email" placeholder="Email">
            <input type="password" required v-model="password" placeholder="Password">
            <button class="button" @click="signIn">Sign In</button>
            <p class="error" v-if="errorMessage">⚠️ {{ errorMessage }}</p>
        </section>
    </main>
</template>

<style scoped>
:deep(a) {
    text-decoration: none;
}
input::placeholder {
    font-style: italic;
    text-align: center;
}
p{
    color: crimson;
}

</style>
