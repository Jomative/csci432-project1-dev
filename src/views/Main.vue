<script setup>
import Header from '../components/Header.vue'
import Dropdown from '@/components/Dropdown.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();
const username = ref(userStore.userName);


window.updateMainUsername = ()=>{
    // username.value = localStorage.getItem("fname");
    username.value = userStore.firstName;
};

async function signOut() {
    // const token = localStorage.getItem("token")
    const token = userStore.token;

    const url = 'https://hap-app-api.azurewebsites.net/user/logout'

    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            // localStorage.removeItem('email');
            // localStorage.removeItem('username');
            // localStorage.removeItem('token');
            userStore.$reset();

            router.push({
                name: 'home'
            })
        }
    } else {
        console.log("HTTP-Error: " + response.status)
    }

    // Reset username display
    // username.value = 'Guest';

    // Redirect to home page
    router.push({ name: 'home' });
}


</script>

<template>
    <Header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
        </nav>
        <nav>
            <a href="#" @click.prevent="signOut">Sign Out</a>
        </nav>
        <Dropdown></Dropdown>
    </Header>
    <main class="padding-block-700" id="mainTest">
        <section class="container center">
            <h1 class="fs-secondary-heading">Welcome, {{ username }}!</h1>
            
        </section>
        <RouterView name="mainHomeCont"></RouterView>
    </main>
</template>

<style scoped>
:deep(a) {
    text-decoration: none;
    color: var(--lapis-lazuli);
}

a:hover {
    cursor: pointer;
}

h1 {
    border-bottom: solid 5px gray;
    padding: 10px;
    border-radius: 5px;
}
/* #mainTest{
    display:flex;
    flex-direction: column;
    align-items: center;
} */
.error {
    color: crimson;
    font-weight: bold;
    margin-top: 10px;
}

#msgCont {
    display: none;
    /* visibility: hidden; */
    /* border: solid 3px black; */
    position: absolute;
    top: 50%;
    right: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

#msgCont input[type="text"] {
    width: 300px;
    padding: 10px;
    border: 2px solid var(--lapis-lazuli);
    border-radius: 5px;
    font-size: 1.2em;
    transition: border-color 0.3s;
}

#msgCont input[type="text"]:focus {
    border-color: var(--crimson);
    outline: none;
}

#msgCont button {
    padding: 10px 20px;
    background-color: var(--lapis-lazuli);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color 0.3s;
}

#msgCont button:hover {
    background-color: var(--crimson);
}

#msgCont>* {
    font-size: 1.5em;
}


</style>
