<template>
	<AddEditNote :textValue="noteContent" :categoryValue="category" @update:textValue="noteContent = $event" @update:categoryValue="category = $event" editTitle="Edit Note">
		<template #button>
			<button @click="$router.back()" class="textarea__submit-btn button-cancel">Cancel</button>
			<button @click="handleSaveClicked" class="textarea__submit-btn button-save">Save note</button>
		</template>
	</AddEditNote>
</template>

<script setup>
import AddEditNote from '../components/Notes/AddEditNote.vue';
import { ref } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { useRoute, useRouter } from 'vue-router';

// router
const route = useRoute();
const router = useRouter();

// store
const storedNotes = useStoreNotes();

const category = ref('');
category.value = storedNotes.getNoteCategory(route.params.id);

// note text
const noteContent = ref('');
noteContent.value = storedNotes.getNoteContent(route.params.id);

// save clicked
const handleSaveClicked = () => {
	storedNotes.upadateNote(route.params.id, category.value, noteContent.value);
	router.push('/');
};
</script>

<style scoped>
.textarea__submit-btn {
	display: inline;
}
.button-cancel {
	margin-right: 20px;
}
</style>
