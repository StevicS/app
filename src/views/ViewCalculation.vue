<template>
	<h4>{{ category }}</h4>
	<h4>{{ content }}</h4>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';

//store
const storeNotes = useStoreNotes();

onMounted(() => {
	const { category, content } = storeNotes.notes[0];
	console.log(category, content);
});
</script>
