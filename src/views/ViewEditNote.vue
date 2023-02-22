<template>
	<AddEditNote v-model="noteContent" />
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

// note
const noteContent = ref('');
noteContent.value = storedNotes.getNoteContent(route.params.id);
// storedNotes.categoryValue = storedNotes.getNoteCategory(route.params.id);
</script>
