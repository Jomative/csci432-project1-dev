<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { server_url } from '@/util';
import Message from './Message.vue';

const msgs = ref([]);
const loading = ref(false);
const lastMessageDate = ref(null);  // Oldest message timestamp for `before`
const firstMessageDate = ref(null); // Newest message timestamp for `after`

// Fetch messages from the API
async function loadMessages(before = null, after = null, prepend = false) {
    if (loading.value) return;
    loading.value = true;

    let url = `${server_url}/messages?limit=10`;
    if (before) url += `&before=${before}`;
    if (after) url += `&after=${after}`;

    let token = localStorage.getItem("token");
    let response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    if (response.status == 200) {
        let data = await response.json();

        if (data.length > 0) {
            if (prepend) {
                // Prepend for new messages at the top
                msgs.value = [...data, ...msgs.value];
            } else {
                // Append for older messages at the bottom
                msgs.value = [...msgs.value, ...data];
            }

            // Update timestamps
            lastMessageDate.value = data[data.length - 1].updatedAt; // Oldest message timestamp
            firstMessageDate.value = data[0].updatedAt; // Newest message timestamp
        }
    } else {
        alert("An error occurred: " + response.status);
    }
    loading.value = false;
}

// Scroll Event Listener
function handleScroll(event) {
    let element = event.target;

    // Check if user scrolled to top (load newer messages)
    if (element.scrollTop === 0) {
        loadMessages(null, firstMessageDate.value, true);
    }

    // Check if user scrolled to bottom (load older messages)
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        loadMessages(lastMessageDate.value, null, false);
    }
}

// Set up scroll event listener
import { nextTick } from 'vue';

onMounted(async () => {
    await loadMessages(); // Initial fetch
    await nextTick();
    let mainCont = document.getElementById('mainCont');
    if (mainCont) {
        mainCont.addEventListener('scroll', handleScroll);
    }
});

// Cleanup listener when unmounting
onUnmounted(() => {
    let mainCont = document.getElementById('mainCont');
    if (mainCont) {
        mainCont.removeEventListener('scroll', handleScroll);
    }
});
</script>

<template>
    <div class="flex justify-center">
        <div id="mainCont">
            <Message v-for="msg in msgs" :key="msg.id" :text="msg.text" :senderName="msg.senderName" :updatedAt="msg.updatedAt" />
        </div>
    </div>
</template>

<style scoped>
#mainCont {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 550px;
}
</style>

<!-- <script setup>
import { ref, onMounted } from 'vue';
import { server_url } from '@/util';
import Message from './Message.vue';

let msgs = ref([]);
let page = ref(1);
let loading = ref(false);

async function loadMessages() {
    if (loading.value) return;
    loading.value = true;
    let url = `${server_url}/messages?limit=10&page=${page.value}`;
    let token = localStorage.getItem("token");
    let response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.status == 200) {
        let data = await response.json();
        msgs.value = [...msgs.value, ...data];
        page.value++;
        console.log(data);
    } else {
        alert("An error has occurred: " + response.status);
    }
    loading.value = false;
}

function handleScroll(event) {
    let element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        loadMessages();
    }
}

onMounted(() => {
    loadMessages();
    let mainCont = document.getElementById('mainCont');
    mainCont.addEventListener('scroll', handleScroll);
});
</script>

<template>
    <div class="flex justify-center">
        <div id="mainCont">
            <Message v-for="msg in msgs" :key="msg.id" :text="msg.text" :senderName="msg.senderName" :updatedAt="msg.updatedAt"/>
        </div>
    </div>
</template>

<style scoped>
#mainCont {
    display: flex;
    flex-direction: column;
    overflow: scroll;
    height: 550px;
}
</style> -->