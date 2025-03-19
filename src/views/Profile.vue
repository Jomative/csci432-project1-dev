<script setup>
import { useUserStore } from '@/stores/user';
import { server_url } from '@/util';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const user = ref({});
const error = ref(null);
const isModalOpen = ref(false);

// const token = localStorage.getItem("token");
const token = userStore.token;
const fetchUserProfile = async () => {
    if (!token) {
        error.value = "Unauthorized: No token found.";
        return;
    }

    try {
        const response = await fetch(server_url + '/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('User data:', data); // Log the response data
            user.value = {
                ...data,
                fname: data.firstName,
                lname: data.lastName
            };
        } else if (response.status === 401) {
            error.value = "Unauthorized: Invalid token.";
        } else {
            error.value = "Failed to fetch user data.";
        }
    } catch (err) {
        error.value = "An error occurred while fetching data.";
        console.error(err);
    }
};

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const saveChanges = async () => {
    try {
        const payload = {
            firstName: user.value.fname,
            lastName: user.value.lname,
            userName: user.value.userName,
            email: user.value.email
        };
        console.log('Payload:', payload); // Log the payload

        const response = await fetch('https://hap-app-api.azurewebsites.net/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const updatedUser = await response.json();
            user.value = {
                ...updatedUser,
                fname: updatedUser.firstName,
                lname: updatedUser.lastName
            };
            // localStorage.setItem('fname', updatedUser.firstName);
            // localStorage.setItem('lname', updatedUser.lastName);
            userStore.setUser(userStore.token, updatedUser.firstName, updatedUser.lastName, updatedUser.email, updatedUser.userName);
            window.updateMainUsername();
            closeModal();
        } else {
            const errorData = await response.json();
            error.value = `Failed to update user data: ${errorData.message}`;
            console.error('Update failed:', errorData);
        }
    } catch (err) {
        error.value = "An error occurred while updating data.";
        console.error(err);
    }
};

onMounted(fetchUserProfile);
</script>

<template>
    <div class="profile-container">
        <h2>User Profile</h2>
        
        <div v-if="error" class="error-message">
            <p>{{ error }}</p>
        </div>

        <div v-else-if="user">
            <p><strong>Username:</strong> {{ userStore.userName }}</p>
            <p><strong>First Name:</strong> {{ userStore.firstName }}</p>
            <p><strong>Last Name:</strong> {{ userStore.lastName }}</p>
            <p><strong>Email:</strong> {{ userStore.email }}</p>
            <button @click="openModal" class="edit-button">Edit</button>
        </div>

        <button @click="router.back()" class="back-button">Go Back</button>

        <div v-if="isModalOpen" class="modal" @click.self="closeModal">
            <div class="modal-content">
                <button class="close-button" @click="closeModal">X</button>
                <h3>Edit Profile</h3>
                <label>
                    Username:
                    <input type="text" v-model="user.userName" />
                </label>
                <label>
                    First Name:
                    <input type="text" v-model="user.fname" />
                </label>
                <label>
                    Last Name:
                    <input type="text" v-model="user.lname" />
                </label>
                <label>
                    Email:
                    <input type="email" v-model="user.email" />
                </label>
                <div class="modal-actions">
                    <button @click="saveChanges">Save</button>
                    <button @click="closeModal">Cancel</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-container {
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.error-message {
    color: red;
    font-weight: bold;
}

.back-button, .edit-button {
    margin-top: 10px;
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.back-button:hover, .edit-button:hover {
    background: #0056b3;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.close-button {
    align-self: flex-end;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;
}

.modal-actions button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.modal-actions button:first-child {
    background: #28a745;
    color: white;
}

.modal-actions button:last-child {
    background: #dc3545;
    color: white;
}

.modal-actions button:first-child:hover {
    background: #218838;
}

.modal-actions button:last-child:hover {
    background: #c82333;
}
</style>
