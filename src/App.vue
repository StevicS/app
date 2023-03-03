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

const storeAuth = useStoreAuth();

onMounted(() => {
	storeAuth.init();
});
</script>
