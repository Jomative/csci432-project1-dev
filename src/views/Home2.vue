<script setup>
    // import { RouterView } from 'vue-router';
</script>
<template>
    <div class="view">
        <header>
            <h1 class="secondary-heading"></h1>
        </header>
        <main class="contHeight">
            <!-- <h1>(Where router views used to be)</h1> -->
            <RouterView name="leftSidebar" class="grid-panel"></RouterView>
            <RouterView name="focus" class="grid-panel vline"></RouterView>
            <RouterView name="rightSidebar" class="grid-panel vline"></RouterView>
        </main>

        <!-- <footer>
            <h1 class="secondary-heading">Footer</h1>
        </footer> -->
    </div>
</template>
<style scoped>
.view{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    height: 100%;
}

.grid-panel {
    padding: var(--size-300);
    margin: var(--size-300);
}

header, footer{
    margin: 0 auto;
}
@media (min-width: 50em){
    main{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
    }
}
.vline{
    border-left: 2px lightgray solid;
    
}
</style>