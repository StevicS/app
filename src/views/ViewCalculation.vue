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
	const categories = [];
	const contents = [];

	storeNotes.notes.map((note) => {
		const { category, content } = note;
		categories.push(category);
		contents.push(content);
	});

	console.log(categories, contents);
});
</script>
