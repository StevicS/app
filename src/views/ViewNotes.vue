<template>
	<AddEditNote :textValue="textValue" :categoryValue="categoryValue" @submitNote="submitNoteValue" @update:textValue="handleTextValueUpdate" @update:categoryValue="handleCategoryValueUpdate">
		<template #button>
			<button class="textarea__submit-btn" type="submit">Add note</button>
		</template>
	</AddEditNote>
	<Note v-for="note in storedNotes.notes" :key="note.id" :note="note" />
</template>

<script setup>
import { ref } from 'vue';
import AddEditNote from '../components/Notes/AddEditNote.vue';
import Note from '../components/Notes/Note.vue';
import { useStoreNotes } from '@/stores/storeNotes';

// store
const storedNotes = useStoreNotes();

const textValue = ref('');
let categoryValue = ref('Racuni');

const handleTextValueUpdate = (newValue) => {
	textValue.value = newValue;
};

const handleCategoryValueUpdate = (newValue) => {
	categoryValue.value = newValue;
};

const submitNoteValue = (formNote) => {
	const user = {
		id: 'id' + new Date().getTime(),
		content: textValue.value,
		category: categoryValue.value,
	};

	storedNotes.notes.push(user);

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
}
</style>
