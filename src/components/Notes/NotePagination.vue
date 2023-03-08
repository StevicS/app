<template>
	<div class="pagination" v-if="storeNotes.notesLoaded">
		<span class="pagination__page">Page {{ currentPage }}</span>
		<div class="pagination__links-wrap">
			<RouterLink class="pagination__btn" v-if="previousPage" :to="{ name: 'notes', query: { page: previousPage } }">Previous</RouterLink>
			<RouterLink class="pagination__btn" v-if="nextPage" :to="{ name: 'notes', query: { page: nextPage } }">Next</RouterLink>
		</div>
	</div>
</template>

<script setup>
import { useStoreNotes } from '@/stores/storeNotes';
import { defineProps } from 'vue';

const props = defineProps({
	currentPage: {
		type: Number,
	},
	previousPage: {
		type: Number,
	},
	nextPage: {
		type: Number,
	},
});

const storeNotes = useStoreNotes();
</script>

<style scoped>
.pagination {
	display: flex;
	justify-content: space-between;
	padding-bottom: 60px;
	max-width: 1000px;
	width: 100%;
	margin: 0 auto;
}

.pagination__page {
	font-size: 20px;
}

.pagination__btn {
	margin-left: 18px;
	font-size: 20px;
	transition: color 0.2s ease;
}

.pagination__btn:hover {
	color: var(--orange);
}
</style>
