<template>
	<div class="loading">
		<h2 v-if="!storeNotes.notesLoaded" class="loading-title">Loading...</h2>
	</div>
</template>

<script setup>
import { useStoreNotes } from '@/stores/storeNotes';

// store
const storeNotes = useStoreNotes();
</script>

<style scoped>
.loading {
	max-width: 1400px;
	width: 100%;
	margin: 0 auto;
	text-align: center;
}

.loading-title {
	font-size: 40px;
}
</style>
