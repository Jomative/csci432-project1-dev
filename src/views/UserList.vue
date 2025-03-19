<template>
    <div class="cont">
        <input v-model="query" placeholder="Search users..." @input="() => searchUsers(query, 0, 10)" />
        <ul>
            <li class="userLiItem" v-for="user in users" :key="user._id">
                <RouterLink class="userItem" :to="`/user/${user._id}?name=${user.userName}`">
                    {{ user.firstName }} {{ user.lastName }}
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const userStore = useUserStore();
const query = ref('');
const users = ref([]);

async function searchUsers(query, page = 0, limit = 10, sortBy = "userName:asc") {
    const serverUrl = "https://hap-app-api.azurewebsites.net";
    const endpoint = "/users";
    // const token = localStorage.getItem("token"); // Retrieve token from local storage
    const token = userStore.token;

    if (!token) {
        console.error("Please login.");
        return;
    }

    const url = new URL(`${serverUrl}${endpoint}`);
    url.searchParams.set("search", `userName|firstName|lastName:${query}`);
    url.searchParams.set("sortBy", sortBy);
    // url.searchParams.set("limit", li mit);
    url.searchParams.set("skip", limit * page);

    try {
        const response = await fetch(url.href, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching users: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        users.value = data;
        return data;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}

// Show all by default:
searchUsers("", 0, 10);
</script>

<style scoped>
div.cont{
    overflow-y:scroll;
    overflow-x:hidden;
    /* margin-bottom:220px; */
}
.userItem{
    margin-left: 5px;
}
.userLiItem{
    margin-left: 20px;
}
</style>
