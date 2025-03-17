<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();
    function loadMain(){
        router.push('/main')
    }

</script>
<template>
    <div @click="loadMain()">
        <img src="/cj.png" alt="CoderJory">
    </div>
</template>
<style>
img{
    max-width: 50px;
    margin: 10px;
}
</style>