<template>
	<div class="blog-card spring-fever">
		<div class="title-content">
			<h3>
				{{ note.category }}
			</h3>
			<div class="intro">
				<p>{{ note.content }}</p>
			</div>
		</div>
		<div class="blog-card__buttons">
			<RouterLink :to="`/editNote/${note.id}`" class="blog-card__btn">edit</RouterLink>
			<button class="blog-card__btn" @click="storeNotes.deleteNote(note.id)">delete</button>
		</div>
		<div class="utility-info">
			<ul class="utility-list">
				<li><span class="licon icon-dat"></span>{{ dateFormatted }}</li>
				<!-- <li><span class="licon icon-tag"></span><a href="#">Photos</a>, <a href="#">Nice</a></li> -->
			</ul>
		</div>
		<div class="gradient-overlay"></div>
		<div class="color-overlay"></div>
	</div>
	<!-- /.blog-card -->
</template>

<script setup>
import { computed } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { useDateFormat } from '@vueuse/core';

// store
const storeNotes = useStoreNotes();

// props
const props = defineProps({
	note: {
		type: Object,
		required: true,
	},
});

// date formated
const dateFormatted = computed(() => {
	let date = new Date();
	return useDateFormat(date, 'DD-MM-YYYY @HH:mm:ss').value;
});
</script>

<style scoped>
.blog-card {
	max-width: 550px;
	width: 100%;
	height: 400px;

	color: #fff;

	margin: 0 auto;
	overflow: hidden;
	border-radius: 0px;
	box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.5);
	text-align: center;
	transition: all 0.4s;
	background: url(https://unsplash.it/600/800?image=1051) center no-repeat;
	background-size: 100%;
	margin-bottom: 40px;
}
.blog-card a {
	color: #fff;
	text-decoration: none;
	transition: all 0.2s;
	font-family: inherit;
}
.blog-card .color-overlay {
	background: rgba(64, 84, 94, 0.5);
	width: 550px;
	height: 500px;
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
	transition: background 0.3s cubic-bezier(0.33, 0.66, 0.66, 1);
}
.blog-card .gradient-overlay {
	background-image: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.6) 21%);
	width: 550px;
	height: 500px;
	position: absolute;
	top: 350px;
	left: 0;
	z-index: 15;
}
.blog-card:hover {
	box-shadow: 0px 18px 20px -9px rgba(0, 10, 30, 0.75);
}
.blog-card:hover .card-info {
	opacity: 1;
	bottom: 100px;
}
.blog-card:hover .color-overlay {
	background: rgba(64, 64, 70, 0.8);
}
.blog-card:hover .title-content {
	margin-top: 70px;
}
.blog-card__btn {
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
.blog-card__btn:hover {
	color: #f39c12;
	transform: scale(1.1);
}
.title-content {
	text-align: center;
	margin: 100px 0 0 0;

	z-index: 20;
	width: 100%;
	top: 0;
	left: 0;
	transition: all 0.6s;
}

.blog-card:hover h3:after {
	animation: changeLetter 0.3s 1 linear;
	width: 80%;
}

.blog-card h3 {
	font-size: 1.9em;
	font-weight: 400;
	letter-spacing: 1px;

	margin-bottom: 0;
	display: inline-block;
	text-transform: capitalize;
}
.blog-card h3 a {
	text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
	transition: all 0.2s;
}
.blog-card h3 a:hover {
	text-shadow: 0px 8px 20px rgba(0, 0, 0, 0.95);
}
h3:after {
	content: ' ';
	display: block;
	width: 10%;
	height: 2px;
	margin: 20px auto;
	border: 0;
	background: #bda26b;
	transition: all 0.2s;
}

@keyframes changeLetter {
	0% {
		width: 10%;
	}
	100% {
		width: 80%;
	}
}

.intro {
	width: 270px;
	margin: 0 auto;
	color: #ddd;
	font-style: italic;
	line-height: 18px;
	margin-bottom: 20px;
}
.intro a {
	color: #ddd;
}
.intro a:hover {
	text-decoration: underline;
}
.card-info {
	box-sizing: border-box;
	padding: 0;
	width: 100%;
	position: absolute;
	bottom: -40px;
	left: 0;
	margin: 0 auto;
	padding: 0 50px;
	font-style: 16px;
	line-height: 24px;
	z-index: 20;
	opacity: 0;
	transition: bottom 0.64s, opacity 0.63s cubic-bezier(0.33, 0.66, 0.66, 1);
}

.card-info a {
	display: block;
	width: 100px;
	margin: 15px auto;
	background: #fff;
	color: #444;
	padding: 3px 10px;
	border-radius: 2px;
	font-size: 0.8em;
}
.card-info a:hover {
	background: #8e7c49;
	color: #fff;
}
.card-info a:hover span {
	filter: brightness(10);
	opacity: 1;
}
.utility-info {
	position: absolute;
	bottom: 0px;
	left: 0;
	z-index: 20;
	width: 100%;
	text-align: left;
}
.utility-info:after {
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
.utility-info a:hover {
	text-decoration: underline;
}
.utility-list {
	list-style-type: none;
	margin: 0 0 10px 20px;
	padding: 0;
	width: 100%;
}
.utility-list li {
	margin: 0 5px 0 0;
	padding: 3px 0 15px 0px;
	display: inline-block;

	font-size: 0.8em;
}

.licon {
	position: relative;
	width: 23px;
	height: 15px;
	display: inline-block;
	vertical-align: middle;
}
.licon:before {
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
.icon-white {
	filter: brightness(10);
}
.icon-black {
	filter: brightness(0);
	opacity: 0.6;
}
.icon-like:before {
	background-position: -183px -6px;
}
.icon-com:before {
	background-position: -63px -4px;
}
.icon-dat:before {
	background-position: -94px -7px;
}
.icon-tag:before {
	background-position: -33px -6px;
}

@media (max-width: 750px) {
	.utility-info {
		text-align: center;
	}
	.utility-info ul {
		width: 100%;
		margin: 0;
		box-sizing: border-box;
	}
	.utility-info li {
		width: 49%;
		display: inline-block;
		box-sizing: border-box;
		margin: 0;
	}
}

@media (max-width: 500px) {
	.utility-info li:last-of-type {
		width: 100%;
	}
	.card-info {
		display: none;
	}
	.blog-card:hover .title-content,
	.title-content {
		margin-top: 40px;
	}
	.blog-card {
		height: 300px;
	}
	.blog-card h3 {
		font-size: 1.3em;
	}
	.intro {
		font-size: 0.8em;
	}
}

/*  ================  */

/* ignore this bit :P */
#profile-badges:after {
	content: 'BRO';
	font-family: 'Lato', 'Lucida Grande', 'Lucida Sans Unicode', Tahoma, Sans-Serif;
	font-size: 13px;
	font-weight: 500;
	text-transform: uppercase;
	padding: 1px 4px 1px 4px;
	color: black !important;
	border-radius: 3px;
	position: relative;
	top: -2px;
	text-shadow: none !important;
	white-space: nowrap;
	letter-spacing: 0;
	background: #ffdd40;
}
.profile-header {
	background: #333 url(https://images.unsplash.com/photo-1435783099294-283725c37230?dpr=1&auto=compress,format&fit=crop&w=1376&h=635&q=80&cs=tinysrgb&crop=&bg=) top center no-repeat;
	background-size: cover;
	font-size: 3em;
	position: relative;
}
.profile-header:after {
	position: absolute;
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(23, 23, 31, 0.42);
	z-index: 0;
}
#profile-links a {
	font-family: 'Abril Fatface', serif;
	font-size: 1.2em;
}

.profile-links a[href*='nodws\.com']:before {
	content: '\2616';
	color: #0a45b5;
	padding-right: 3px;
}

.profile-links a[href*='twitter']:before {
	content: '\1f426';
	color: #08c;
}

.profile-links a[href*='dribbble']:before {
	content: '\26BE';
	color: #d055bf;
}
#following-this-user {
	pointer-events: none;
}
#follow-this-user {
	font-size: 1.2em;
	border-color: #359ef9;
}
#follow-this-user:after {
	content: '\1f448';
}
.links-and-stats {
	background: rgb(20, 20, 21);
}
.profile-name h1 {
	text-shadow: 0 6px 9px rgba(0, 0, 0, 0.48);
}
.profile-avatar {
	bottom: -10px;
	width: 150px;
	height: 150px;
	border: 0px solid #1e1e1e;
	background: rgba(2, 2, 2, 0.49);
	box-shadow: 0 19px 19px -10px rgba(0, 0, 0, 0.63);
}
.profile-username,
.upsell,
.profile-location,
.primary-pro {
	opacity: 0;
}
.upsell,
#pen-as-header-question {
	display: none;
}
.profile-nav-1 a {
	font-size: 1.2rem;
}
.profile-bio,
.profile-nav-1 a.active,
.profile-nav-1 a:hover {
	color: rgba(20, 20, 21, 0.59) !important;
	font-size: 1.2rem;
}
.meta .pen-title {
	font-family: 'Droid Serif', serif;
	text-align: center;
}
.pagination-button {
	background-color: #2f2f31;
	border-color: #2f2f31;
	transition: all 0.2s;
}
.pagination-button:hover {
	box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}
.single-project .stats,
.single-pen .stats {
	text-align: center;
	width: 100%;
}
.stats svg {
	fill: #bda26b;
}
.stats svg,
.loves .icon-heart {
	fill: rgba(47, 47, 49, 0) !important;
	stroke: #ba6 !important;
	stroke-width: 0.1em !important;
}
.loves .icon-heart {
	stroke-width: 0.5em !important;
}
.comments svg {
	stroke-width: 0.35em !important;
}
.single-stat.loves.loved-1 svg {
	stroke: #fff !important;
}

.single-pen:hover h3:after {
	width: 40%;
	transition: all 0.2s;
}
.pen-actions {
	border: 0px !important;
}
.meta {
	box-shadow: none !important;
}
</style>