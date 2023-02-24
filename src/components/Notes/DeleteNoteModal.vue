<template>
	<Teleport to="body">
		<div class="modal is-active p-4">
			<div class="modal-background"></div>
			<div class="modal-card" ref="closeModalRef">
				<header class="modal-card-head">
					<p class="modal-card-title">Delete note?</p>
					<button class="delete" aria-label="close" @click="$emit('update:modelValue', (deleteNote = false))"></button>
				</header>
				<section class="modal-card-body">
					<p>Are you sure you want to delete this note?</p>
				</section>
				<footer class="modal-card-foot is-justify-content-flex-end">
					<button class="button" @click="$emit('update:modelValue', (deleteNote = false))">Cancel</button>
					<button class="button is-danger" @click="storeNotes.deleteNote(noteId)">Delete</button>
				</footer>
			</div>
		</div>
	</Teleport>
</template>

<script setup>
import { useStoreNotes } from '@/stores/storeNotes';

// store
const storeNotes = useStoreNotes();

const props = defineProps({
	modalValue: {
		type: String,
	},
	noteId: {
		type: String,
	},
});

//emits
const emits = defineEmits(['update:modelValue']);
</script>

<style scoped>
.modal {
	align-items: center;
	display: none;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
	position: fixed;
	z-index: 40;
}

.modal.is-active {
	display: flex;
}
.modal-background {
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
}

.modal-card {
	display: flex;
	flex-direction: column;
	max-height: calc(100vh - 40px);
	overflow: hidden;
	-ms-overflow-y: visible;
}

.modal-card-head {
	border-bottom: 1px solid #dbdbdb;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
}

.modal-card-title {
	color: #363636;
	flex-grow: 1;
	flex-shrink: 0;
	font-size: 1.5rem;
	line-height: 1;
}

.delete {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-moz-appearance: none;
	-webkit-appearance: none;
	background-color: rgba(10, 10, 10, 0.2);
	border: none;
	border-radius: 9999px;
	cursor: pointer;
	pointer-events: auto;
	display: inline-block;
	flex-grow: 0;
	flex-shrink: 0;
	font-size: 0;
	height: 20px;
	max-height: 20px;
	max-width: 20px;
	min-height: 20px;
	min-width: 20px;
	outline: 0;
	position: relative;
	vertical-align: top;
	width: 20px;
}

.modal-card-body {
	-webkit-overflow-scrolling: touch;
	background-color: #fff;
	flex-grow: 1;
	flex-shrink: 1;
	overflow: auto;
	padding: 20px;
}

.is-justify-content-flex-end {
	justify-content: flex-end !important;
}

.modal-card-foot {
	border-bottom-left-radius: 6px;
	border-bottom-right-radius: 6px;
	border-top: 1px solid #dbdbdb;
}

.modal-card-foot,
.modal-card-head {
	align-items: center;
	background-color: #f5f5f5;
	display: flex;
	flex-shrink: 0;
	justify-content: flex-start;
	padding: 20px;
	position: relative;
}
</style>
