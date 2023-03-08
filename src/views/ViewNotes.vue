<template>
	<AddEditNote :textValue="textValue" :categoryValue="categoryValue" @submitNote="submitNoteValue" @update:textValue="handleTextValueUpdate" @update:categoryValue="handleCategoryValueUpdate">
		<template #button>
			<button class="input__submit-btn" type="submit">Dodaj</button>
		</template>
	</AddEditNote>
	<NoteLoading />
	<Note v-for="note in displayStoreNotes" :key="note.id" :note="note" />
	<NotePagination :currentPage="currentPage" :previousPage="previousPage" :nextPage="nextPage" />
</template>

<script setup>
import { ref, computed } from 'vue';
import AddEditNote from '../components/Notes/AddEditNote.vue';
import Note from '../components/Notes/Note.vue';
import NotePagination from '../components/Notes/NotePagination.vue';
import NoteLoading from '../components/Notes/NoteLoading.vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { useRoute } from 'vue-router';

// store
const storeNotes = useStoreNotes();

const route = useRoute();

const currentPage = computed(() => {
	return Number.parseInt(route.query.page || '1');
});

const previousPage = computed(() => {
	const previousPage = currentPage.value - 1;
	const firstPage = 1;
	return previousPage >= firstPage ? previousPage : undefined;
});

const nextPage = computed(() => {
	const nextPage = currentPage.value + 1;
	const maxPage = Math.ceil(storeNotes.notes.length / 5);
	return nextPage <= maxPage ? nextPage : undefined;
});

const displayStoreNotes = computed(() => {
	const pageNumber = currentPage.value;
	const firstJob = (pageNumber - 1) * 5;
	const lastJob = pageNumber * 5;
	return storeNotes.notes.slice(firstJob, lastJob);
});

const textValue = ref('');
let categoryValue = ref('Racuni');

const handleTextValueUpdate = (newValue) => {
	textValue.value = newValue;
};

const handleCategoryValueUpdate = (newValue) => {
	categoryValue.value = newValue;
};

const submitNoteValue = () => {
	if (textValue.value.trim() === '') {
		return;
	}
	storeNotes.addNote(textValue.value, categoryValue.value);
	textValue.value = '';
};
</script>

<style>
.input__submit-btn {
	display: block;
	margin-left: auto;
	font-family: inherit;
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 6px;
	font-size: 22px;
	color: #695c79;
	cursor: pointer;
	transition: 0.3s ease;
	transition-property: color, background-color;
}

.input__submit-btn:hover {
	color: var(--orange);
	background-color: #695c79;
}
</style>
