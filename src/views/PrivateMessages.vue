<script setup>
import { server_url } from '@/util';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    userId:{
        type:String,
        required:true
    }
})
console.log(props.userId);

const route = useRoute();

const message = ref();

const msgs = ref([
    "msg1", "sjnfe"
]);

async function getMessages(){
    const url = server_url + '/messages/' + props.userId;
    const token = localStorage.getItem("token");

    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization:`Bearer ${token}`
        }
    });
    if(res.ok){
        const data = await res.json();
        console.log("all good", data)
        msgs.value = data;
    } else {
        console.log("erraa", res.status)
    }
}
getMessages();

async function sendPM(){
    const url = server_url + '/message/' + props.userId;
    const token = localStorage.getItem("token");

    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({

            text:message.value
        })
    });
    if(res.ok){
        const data = await res.json();
        console.log("all good", data)
        msgs.value.splice(0,0,data);
        message.value = "";
    } else {
        console.log("erraa", res.status)
    }
}

</script>
<template>
    <div id="cont grid-panel">
        <h1>Now chatting with <span id="usname">{{ route.query.name }}</span></h1>
        <br>
        <div id="msgContainer">
            <input type="text" v-model="message" placeholder="Enter your message" maxlength="280">
            <button @click="sendPM()">Send Message</button>
        </div>
        <br>
        <div id="msgCont" class="msgCont2">
            <h1 v-for="msg in msgs" :me="msg.senderId != props.userId">
                <h2 id="senderName">{{ msg.senderName }}</h2>
                <h1 id="message">{{ msg.text }}</h1>
            </h1>
        </div>
    </div>
</template>
<style scoped>
#cont{
    font-weight: 600;
}
#usname{
    font-weight: 800;
    color:royalblue;
}
#msgCont{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:start;
    height:calc(100% - 67px);
}
.msgCont2{
    overflow-y:scroll;
    /* margin-bottom:200px; */
}
#msgCont > *{
    padding:10px 20px;
    background-color: hsl(0, 0%, 92%);
    border:solid 2px gray;
    border-radius: 10px;
    margin-block:5px;
}
#msgCont > *[me=true]{
    align-self: flex-end;
}
#senderName{
    font-weight: 700;
    color:royalblue;
    text-decoration: underline;
}
</style>