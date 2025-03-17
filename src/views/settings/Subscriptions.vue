<!-- check Eric css for .menu -->
<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();
</script>

<template>
    <div class="menu">
        <div class="flex align-center" @click="router.back()">
            <div class="icon backbtn">chevron_left</div>
            <span class="menu-section">My subs</span>
        </div>
    </div>
</template>
<style scoped></style>