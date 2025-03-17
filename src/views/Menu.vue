<script setup>
</script>
<template>
    <div class="menu">
        <ul>
            <li>
                <RouterLink to="/main">
                    <div class="flex align-center">
                        <div class="icon">menu</div>
                        <span class="menu-item">Home</span>
                    </div>
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/settings">
                    <div class="flex align-center">
                        <div class="icon">settings</div>
                        <span class="menu-item">Settings</span>
                    </div>
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/usersearch">
                    <div class="flex align-center">
                        <div class="icon">search</div>
                        <span class="menu-item">Search User</span>
                    </div>
                </RouterLink>
            </li>
            
        </ul>
    </div>
</template>
<style scoped></style>