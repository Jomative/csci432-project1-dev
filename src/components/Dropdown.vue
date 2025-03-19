<script setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const isOpen = ref(false);
const selected = ref('Select an option');
const options = ref(['Delete Account', 'Profile']);
const token = userStore.token;
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
    selected.value = option;
    console.log(selected.value)
    if(selected.value == 'Delete Account'){
        if(confirm("Do you actually want to delete this account?")){
            deleteAccount();
            router.push({ name: 'home' });

        }
    }
    if(selected.value == 'Profile'){
        // hmm but isnt Eric doing all this stuff with just index.js and router stuff?
        // router.push('/main/profile');
        router.push({name:"profile"});
    }
    isOpen.value = false;
    // if (selected.value == 'Send Message?') {
    //     const msgCont = document.getElementById('msgCont');
    //     if (msgCont) {
    //         const isVisible = msgCont.style.display === 'block';
    //         msgCont.style.display = isVisible ? 'none' : 'block';
    //         const children = msgCont.children;
    //         for (let i = 0; i < children.length; i++) {
    //             children[i].style.display = isVisible ? 'none' : 'block';
    //         }
    //     }
    // }
};
async function deleteAccount(){
    const response = await fetch('https://hap-app-api.azurewebsites.net/user', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
		if (response.status === 200) {
            // localStorage.removeItem('email');
            // localStorage.removeItem('username');
            // localStorage.removeItem('token');
            userStore.$reset();

		}
	} else {
		console.log("HTTP-Error: " + response.status)
	}
    const result = await response.json();
    console.log('Account deleted:', result);
}


</script>
<template>
    <div class="dropdown">
        <!-- <button @click="toggleDropdown" class="icon">settings{{ selected }}</button> -->
        <button @click="toggleDropdown" class="icon">settings</button>
        <ul v-if="isOpen">
            <li v-for="option in options" :key="option" @click="selectOption(option)">
                <p class="d-menuicon">add</p>
                <p>{{ option }}</p>
            </li>
        </ul>
    </div>
</template>



<style scoped>
.icon{
    font-family: "Material Icons Outlined";
    margin-right:var(--size-200); /*pushes menu items to the right a bit*/ 
    font-size:20px;
    position:relative;
    color:var(--clr-neutral-900);
    border-radius: 20%;
} 

.dropdown {
    position: relative;
    display: inline-block;
    font-size: small;
}

.dropdown button {
    background-color: var(--verdigris);
    color: white;
    padding: 6px;
    padding-left: 10px;
    padding-right: 10px;
    border: none;
    cursor: pointer;
}

.dropdown ul {
    position: absolute;
    background-color: white;
    border: 1px solid var(--verdigris);
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

.dropdown li {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    /* justify-content: space-between; */
    padding: 10px;
    cursor: pointer;
}

.dropdown li:hover {
    background-color: azure;
}
</style>

