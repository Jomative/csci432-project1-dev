// PrivateMessages.vue - Displays private messages and allows sending new ones
<template>
  <div>
    <h2>Messages with {{ route.query.name }}</h2>
    <div v-for="msg in messages" :key="msg._id">
      <Message :senderName="msg.senderName" :updatedAt="msg.updatedAt" :text="msg.text" />
    </div>
    <input v-model="newMessage" placeholder="Type a message..." />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Message from './Message.vue';

const route = useRoute();
const messages = ref([]);
const newMessage = ref('');

const fetchMessages = async () => {
  const token = localStorage.getItem("token");
  const url = `https://hap-app-api.azurewebsites.net/messages/${route.params.userId}`;

  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      messages.value = await response.json();
    } else {
      console.error('Failed to fetch messages:', response.statusText);
    }
  } catch (err) {
    console.error('Network error:', err);
  }
};

const sendMessage = async () => {
  const token = localStorage.getItem("token");
  const url = `https://hap-app-api.azurewebsites.net/message/${route.params.userId}`;

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text: newMessage.value })
    });

    if (response.ok) {
      newMessage.value = '';
      fetchMessages();
    } else {
      console.error('Failed to send message:', response.statusText);
    }
  } catch (err) {
    console.error('Network error:', err);
  }
};

onMounted(fetchMessages);
</script>
