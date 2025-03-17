<script setup>
let props = defineProps({
    senderName: String,
    updatedAt: String,
    text: String
});
</script>

<template>
    <div class="message">
        <strong id="sendNamai">{{ senderName }}</strong>
        <small id="dateU">{{ new Date(updatedAt).toLocaleDateString() }}</small>
        <p id="msgcontent">"{{ text }}"</p>
    </div>
</template>

<style scoped>
.message {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 3px solid gray;
    border-radius: 10px;
    margin: 10px;
    /* border-bottom: 3px solid gray;
    border-left: 3px solid gray;
    border-top: 0px; */
    width: 200px;
    height: auto;
}
#sendNamai {
    font-weight: bold;
    color: rgb(122, 226, 230);
    margin-bottom: 5px;
}
#dateU{
    font-size: 0.8em;
    color: gray;
    margin-bottom: 10px;
}
#msgcontent{
    font-weight: bold;
}
</style>