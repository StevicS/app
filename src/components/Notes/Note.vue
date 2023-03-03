<template>
	<div class="note-card" :style="{ 'background-image': noteBackground }">
		<div class="note-card__category-wrap">
			<h3 class="note-card__category-title">
				{{ note.category }}
			</h3>
			<div class="note-card__text-wrap">
				<p class="note-card__text">{{ note.content }}din</p>
			</div>
		</div>
		<div class="note-card__buttons">
			<RouterLink :to="`/editNote/${note.id}`" class="note-card__btn">edit</RouterLink>
			<button class="note-card__btn" @click="deleteNote = true">delete</button>
		</div>
		<div class="note-card__info">
			<ul class="note-card__list">
				<li class="note-card__item"><span class="note-card__item-icon note-card__item-icon--left"></span>{{ dateFormatted }}</li>
			</ul>
		</div>
		<div class="note-card__color-overlay"></div>
	</div>
	<DeleteNoteModal v-if="deleteNote" v-model="deleteNote" :noteId="note.id" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDateFormat } from '@vueuse/core';
import DeleteNoteModal from './DeleteNoteModal.vue';

const props = defineProps({
	note: {
		type: Object,
		required: true,
	},
});

const deleteNote = ref(false);

const backgrounds = {
	racuni: 'url(https://unsplash.it/600/800?image=100)',
	hrana: 'url(https://unsplash.it/600/800?image=102)',
	gorivo: 'url(https://unsplash.it/600/800?image=85)',
	restorani: 'url(https://unsplash.it/600/800?image=122)',
	soping: 'url(https://unsplash.it/600/800?image=103)',
	auto: 'url(https://unsplash.it/600/800?image=111)',
	drugo: 'url(https://unsplash.it/600/800?image=51)',
};

const noteBackground = computed(() => {
	return backgrounds[props.note.category.toLowerCase()];
});

const dateFormatted = computed(() => {
	let date = new Date(parseInt(props.note.date));
	return useDateFormat(date, 'DD-MM-YYYY @HH:mm:ss').value;
});
</script>

<style scoped>
.note-card {
	max-width: 550px;
	width: 100%;
	height: 340px;
	color: #fff;
	margin: 0 auto;
	overflow: hidden;
	border-radius: 6px;
	box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.5);
	text-align: center;
	transition: all 0.4s;
	background: url(https://unsplash.it/600/800?image=11) center no-repeat;
	background-size: 100%;
	margin-bottom: 40px;
}
.note-card:hover {
	box-shadow: 0px 18px 20px -9px rgba(0, 10, 30, 0.75);
}
.note-card:hover .note-card__color-overlay {
	background: rgba(64, 64, 70, 0.8);
}
.note-card:hover .note-card__category-wrap {
	margin-top: 70px;
}
.note-card__category-wrap {
	text-align: center;
	margin: 100px 0 0 0;
	z-index: 20;
	width: 100%;
	top: 0;
	left: 0;
	transition: all 0.6s;
}
.note-card:hover .note-card__category-title:after {
	animation: changeLetter 0.3s 1 linear;
	width: 80%;
}
.note-card__category-title {
	font-size: 28px;
	font-weight: 400;
	letter-spacing: 1px;
	margin-bottom: 0;
	display: inline-block;
	text-transform: capitalize;
}
.note-card__category-title:after {
	content: ' ';
	display: block;
	width: 10%;
	height: 2px;
	margin: 20px auto;
	border: 0;
	background: var(--orange);
	transition: all 0.2s;
}
.note-card__text-wrap {
	width: 270px;
	margin: 0 auto;
	color: #ddd;
	font-style: italic;
	line-height: 18px;
	margin-bottom: 20px;
}
.note-card__text {
	font-size: 20px;
}
.note-card__btn {
	z-index: 40;
	border: none;
	outline: 0;
	background: transparent;
	font-family: inherit;
	font-size: 18px;
	padding: 14px;
	color: #ddd;
	cursor: pointer;
	text-transform: capitalize;
	transition: 0.3s transform ease;
}
.note-card__btn:hover {
	color: var(--orange);
}
.note-card__info {
	position: absolute;
	bottom: 0px;
	left: 0;
	z-index: 20;
	width: 100%;
	text-align: left;
}
.note-card__info:after {
	content: ' ';
	background: url(https://rawcdn.githack.com/Nodws/NodPen/ffad95aa5244b4b09a3c7c1508a018959bbedb7e/postItem/licons.svg) center no-repeat;
	background-size: 30px auto;
	display: block;
	opacity: 0.4;
	position: absolute;
	bottom: 25px;
	right: 15px;
	width: 30px;
	height: 15px;
}
.note-card__list {
	list-style-type: none;
	margin: 0 0 10px 20px;
	padding: 0;
	width: 100%;
}
.note-card__item {
	margin: 0 5px 0 0;
	padding: 3px 0 15px 0px;
	display: inline-block;
	font-size: 14px;
}
.note-card__item-icon {
	position: relative;
	width: 23px;
	height: 15px;
	display: inline-block;
	vertical-align: middle;
}
.note-card__item-icon:before {
	content: '';
	background: url(https://rawcdn.githack.com/Nodws/NodPen/ffad95aa5244b4b09a3c7c1508a018959bbedb7e/postItem/licons.svg?) -2px -6px no-repeat;
	background-size: 250px;
	width: 26px;
	height: 20px;
	display: inline-block;
	vertical-align: middle;
	position: absolute;
	top: -3px;
	left: 0;
}
.note-card__item-icon--left:before {
	background-position: -94px -7px;
}
.note-card__color-overlay {
	background: rgba(64, 84, 94, 0.5);
	width: 550px;
	height: 500px;
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
	transition: background 0.3s cubic-bezier(0.33, 0.66, 0.66, 1);
}

@media (max-width: 750px) {
	.note-card__info {
		text-align: center;
	}
	.note-card__list {
		width: 100%;
		margin: 0;
		box-sizing: border-box;
	}
	.note-card__item {
		width: 49%;
		display: inline-block;
		box-sizing: border-box;
		margin: 0;
	}
}

@media (max-width: 500px) {
	.note-card__info li:last-of-type {
		width: 100%;
	}

	.note-card:hover .note-card__category-wrap,
	.note-card__category-wrap {
		margin-top: 40px;
	}
	.note-card {
		height: 300px;
	}
	.note-card__title {
		font-size: 22px;
	}
	.note-card__text {
		font-size: 16px;
	}
}

@keyframes changeLetter {
	0% {
		width: 10%;
	}
	100% {
		width: 80%;
	}
}
</style>
