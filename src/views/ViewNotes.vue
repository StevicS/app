<template>
	<AddEditNote :textValue="textValue" :categoryValue="categoryValue" @submitNote="submitNoteValue" @update:textValue="handleTextValueUpdate" @update:categoryValue="handleCategoryValueUpdate">
		<template #button>
			<button class="input__submit-btn" type="submit">Add note</button>
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
