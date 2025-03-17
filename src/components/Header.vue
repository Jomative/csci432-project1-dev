<script setup>
    import { RouterLink } from 'vue-router';
    import Logo from './Logo.vue'
</script>
<template>
    <header>
        <div class="container">
            <Logo/>
            <slot></slot>
        </div>
    </header>
</template>
<style scoped>
header{

    background-color: rgb(225, 225, 225);
    /* background-color: var(--tea-green); */
}
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

:slotted(*){
    font-size: var(--fs-600);
    /* font-weight: 500; */
    font-weight: var(--fw-bold);
    /* maybe use classes for this instead(theyre already in main.css) */
}
</style>