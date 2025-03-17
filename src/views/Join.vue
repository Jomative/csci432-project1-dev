<script setup>
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'; 
import { ref } from 'vue';

const router = useRouter();

const email = ref('');
const password = ref('');
const userName = ref('');
const fname = ref('');
const lname = ref('');
const errorMessage = ref('');

function validateInput() {
    if (!fname.value || !lname.value || !email.value || !password.value || !userName.value) {
        // add ref for box border color and set to red here(double bind)
        return 'Please fill out all fields.';
    }
    if (!email.value.includes('@') || !email.value.includes('.')) {
        return 'Please enter a valid email address.';
    }
    if (password.value.length < 8) {
        return 'Password must be at least 8 characters long.';
    }
    return null;
}

async function join() {
    const validationError = validateInput();
    if (validationError) {
        errorMessage.value = validationError;
        return;
    }

    const result = await createAccount(email.value, password.value, fname.value, lname.value, userName.value);
    if (result.success) {
        localStorage.setItem('email', email.value);
        localStorage.setItem('username', userName.value);
        localStorage.setItem('fname', fname.value);
        localStorage.setItem('lname', lname.value);
        localStorage.setItem('token', result.data.token)
        router.push({ name: 'main' });
    } else {
        errorMessage.value = result.message;
    }
}

async function createAccount(email, password, firstName, lastName, userName) {
    const response = await fetch('https://hap-app-api.azurewebsites.net/user', {
    // const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName, userName }),
    });

    if (response.status === 201) {
        const data = await response.json();
        console.log('Account Created:', data);
        return { success: true, data };
    } else if (response.status === 400) {
        return { success: false, message: 'Double-check your input fields.' };
    } else if (response.status === 500) {
        return { success: false, message: 'We\'re having issues with our servers, try again later!' };
    } else {
        return { success: false, message: 'An unexpected error occurred.' };
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
            <input type="text" required v-model="fname" placeholder="First Name">
            <input type="text" required v-model="lname" placeholder="Last Name">
            <input type="text" required v-model="userName" placeholder="Username">
            <input type="email" required v-model="email" placeholder="Email">
            <input type="password" required v-model="password" placeholder="Password">

            <button class="button" @click="join">Join</button>
            <p class="error" v-if="errorMessage">⚠️ {{ errorMessage }}</p>
        </section>
    </main>
</template>

<style scoped>
:deep(a) {
    color: var(--lapis-lazuli);
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
