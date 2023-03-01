<template>
	<div class="modal">
		<div class="modal__background"></div>
		<div class="modal__card" ref="closeModalRef">
			<div class="modal__card-header">
				<p class="modal__card-title">Delete note?</p>
				<button class="modal__btn-close" aria-label="close" @click="closeModal"></button>
			</div>
			<div class="modal__card-body">
				<p>Are you sure you want to delete this note?</p>
			</div>
			<div class="modal__card-footer">
				<button class="modal__card-footer-btn" @click="$emit('update:modelValue', (deleteNote = false))">Cancel</button>
				<button class="modal__card-footer-btn modal__card-footer-btn--color" @click="storeNotes.deleteNote(noteId)">Delete</button>
			</div>
		</div>
	</div>
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
const emit = defineEmits(['update:modelValue']);

const closeModal = () => {
	emit('update:modelValue', false);
};
</script>

<style scoped>
.modal {
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
	position: fixed;
	z-index: 40;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
}
.modal__background {
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	background-color: rgba(0, 0, 0, 0.5);
}
.modal__card {
	display: flex;
	flex-direction: column;
	max-height: calc(100vh - 40px);
	overflow: hidden;
	-ms-overflow-y: visible;
	max-width: 440px;
	width: 100%;
}
.modal__card-header {
	border-bottom: 1px solid #dbdbdb;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
}
.modal__card-title {
	color: #363636;
	flex-grow: 1;
	flex-shrink: 0;
	font-size: 1.5rem;
	line-height: 1;
}
.modal__btn-close {
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
	height: 24px;
	outline: 0;
	position: relative;
	vertical-align: top;
	width: 24px;
	position: relative;
}
.modal__btn-close::before {
	position: absolute;
	content: 'x';
	font-size: 15px;
	top: 2px;
	right: 8px;
	color: #363636;
}
.modal__card-body {
	-webkit-overflow-scrolling: touch;
	background-color: #fff;
	flex-grow: 1;
	flex-shrink: 1;
	overflow: auto;
	padding: 20px;
}
.modal__card-body p {
	color: #363636;
	font-size: 22px;
}
.modal__card-footer {
	border-bottom-left-radius: 6px;
	border-bottom-right-radius: 6px;
	border-top: 1px solid #dbdbdb;
	justify-content: flex-end !important;
}
.modal__card-footer,
.modal__card-header {
	align-items: center;
	background-color: #f5f5f5;
	display: flex;
	flex-shrink: 0;
	justify-content: flex-start;
	padding: 20px;
	position: relative;
}
.modal__card-footer-btn {
	margin-right: 15px;
	border: 1px solid #363636;
	outline: none;
	font-family: inherit;
	border-radius: 12px;
	padding: 8px;
	cursor: pointer;
}
.modal__card-footer-btn:hover {
	opacity: 0.6;
}
.modal__card-footer-btn--color {
	background-color: rgb(223, 39, 39);
}

@media only screen and (max-width: 768px) {
	.modal {
		padding: 16px;
	}
	.modal__card {
		max-width: 340px;
		width: 100%;
	}
	.modal__card-body {
		padding: 16px 8px;
	}
}
</style>
