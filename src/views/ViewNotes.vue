<template>
	<AddEditNote :textValue="textValue" :categoryValue="categoryValue" @submitNote="submitNoteValue" @update:textValue="handleTextValueUpdate" @update:categoryValue="handleCategoryValueUpdate">
		<template #button>
			<button class="textarea__submit-btn" type="submit">Add note</button>
		</template>
	</AddEditNote>
	<div class="loading">
		<h2 v-if="!storeNotes.notesLoaded" class="loading-title">Loading...</h2>
	</div>
	<Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
</template>

<script setup>
import { ref } from 'vue';
import AddEditNote from '../components/Notes/AddEditNote.vue';
import Note from '../components/Notes/Note.vue';
import { useStoreNotes } from '@/stores/storeNotes';

// store
const storeNotes = useStoreNotes();

// mounted
// onMounted(() => {
// 	storedNotes.init();
// });

const textValue = ref('');
let categoryValue = ref('Racuni');

const handleTextValueUpdate = (newValue) => {
	textValue.value = newValue;
};

const handleCategoryValueUpdate = (newValue) => {
	categoryValue.value = newValue;
};

// methods
// const addNote = () => {
// 	storeNotes.addNote(newNote.value);

// };

const submitNoteValue = (formNote) => {
	// if (textValue.value.trim() === '') {
	// 	return;
	// }
	storeNotes.addNote(textValue.value, categoryValue.value);
	// const user = {
	// 	id: 'id' + new Date().getTime(),
	// 	content: textValue.value,
	// 	category: categoryValue.value,
	// };
	// storeNotes.notes.push(user);
	formNote.value.reset();
};
</script>

<style>
.textarea__submit-btn {
	display: block;
	margin-left: auto;
	font-family: inherit;
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 12px;
	font-size: 22px;
	color: #695c79;
	cursor: pointer;
	transition: 0.3s ease;
	transition-property: color, background-color;
}

.textarea__submit-btn:hover {
	color: #f39c12;
	background-color: #695c79;
}

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
