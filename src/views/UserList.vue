<template>
    <div>
        <input v-model="query" placeholder="Search users..." @input="() => searchUsers(query, 0, 10)" />
        <ul>
            <li v-for="user in users" :key="user._id">
                <RouterLink :to="`/user/${user._id}?name=${user.userName}`">
                    {{ user.firstName }} {{ user.lastName }}
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const query = ref('');
const users = ref([]);

async function searchUsers(query, page = 0, limit = 10, sortBy = "userName:asc") {
    const serverUrl = "https://hap-app-api.azurewebsites.net";
    const endpoint = "/users";
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!token) {
        console.error("Please login.");
        return;
    }

    const url = new URL(`${serverUrl}${endpoint}`);
    url.searchParams.set("search", `userName|firstName|lastName:${query}`);
    url.searchParams.set("sortBy", sortBy);
    url.searchParams.set("limit", limit);
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
        return data;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}

// Example usage:
searchUsers("joe", 0, 10);
</script>
