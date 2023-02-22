<template>
	<AddEditNote v-model="newTextNote" @submitNote="submitNoteValue">
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

// const notes = ref([
// 	{
// 		id: 'id1',
// 		content: 'potrosnja goriva 6000din ',
// 		category: 'fuel',
// 	},
// 	{
// 		id: 'id2',
// 		content: '22000din ',
// 		category: 'bills',
// 	},
// ]);

const newTextNote = ref('');
let newCategoryNote = ref('');

const submitNoteValue = (category) => {
	newCategoryNote = category;

	const user = {
		id: 'id3',
		content: newTextNote,
		category: newCategoryNote,
	};

	storedNotes.notes.push(user);
};
</script>

<style scoped>
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
