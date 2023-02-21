<template>
	<Navbar />
	<div class="container">
		<RouterView />
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStoreAuth } from './stores/storeAuth';
import Navbar from './components/Layout/Navbar.vue';

// store
const storeAuth = useStoreAuth();

// mounted
onMounted(() => {
	storeAuth.init();
});
</script>

<style></style>
