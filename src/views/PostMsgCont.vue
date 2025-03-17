<script setup>
import { ref } from 'vue';

const message = ref('');
const errorMessage = ref('');

async function postMessage() {
    const token = localStorage.getItem("token");

    if (!token) {
        errorMessage.value = 'Unauthorized: Please log in.';
        return;
    }

    if (!message.value.trim()) {
        errorMessage.value = 'Message cannot be empty.';
        return;
    }

    const url = 'https://hap-app-api.azurewebsites.net/message';

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: message.value }) // Fixed property name
    };

    try {
        let response = await fetch(url, options);

        if (response.ok) {
            if (response.status === 201) {
                message.value = '';
                errorMessage.value = ''; // Reset error on success
                console.log('Message posted successfully');
            }
        } else if (response.status === 400) {
            errorMessage.value = 'Invalid message format.';
        } else if (response.status === 401) {
            errorMessage.value = 'Unauthorized: Please log in.';
        } else {
            errorMessage.value = 'An unexpected error occurred. Please try again.';
        }
    } catch (err) {
        errorMessage.value = 'Network error: Please check your connection.';
        console.error(err);
    }
}
</script>
<template>
    <div id="msgContainer">
                <input type="text" v-model="message" placeholder="Enter your message" maxlength="280">
                <button @click="postMessage">Send Message</button>
                <p class="error" v-if="errorMessage">⚠️ {{ errorMessage }}</p>
    </div>
</template>
<style scoped>
.error {
    color: crimson;
    font-weight: bold;
    margin-top: 10px;
}

#msgContainer {
    display: none;
    /* visibility: hidden; */
    /* border: solid 3px black; */
    /* position: absolute; */
    /* top: 50%; */
    /* right: 100px ; */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

#msgContainer input[type="text"] {
    width: 300px;
    padding: 10px;
    border: 2px solid var(--lapis-lazuli);
    border-radius: 5px;
    font-size: 1.2em;
    transition: border-color 0.3s;
}

#msgContainer input[type="text"]:focus {
    border-color: var(--crimson);
    outline: none;
}

#msgContainer button {
    padding: 10px 20px;
    background-color: var(--lapis-lazuli);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color 0.3s;
}

#msgContainerainer button:hover {
    background-color: var(--crimson);
}

#msgContainer>* {
    font-size: 1.5em;
}
</style>