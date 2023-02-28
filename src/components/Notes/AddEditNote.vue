<template>
	<div class="main">
		<form action="" @submit.prevent="onSubmit" ref="formNote">
			<div class="select">
				<select :value="props.categoryValue" @input="emitCategory">
					<option value="Racuni" selected>Racuni</option>
					<option value="Hrana">Hrana</option>
					<option value="Gorivo">Gorivo</option>
					<option value="Restorani">Restorani</option>
					<option value="Soping">Soping</option>
					<option value="Auto">Auto</option>
					<option value="Drugo">Drugo</option>
				</select>
			</div>

			<div class="textarea">
				<div class="textarea__wrap">
					<input :value="props.textValue" @input="emitText" class="textarea__field" v-autofocus name="" id="" type="number" />
					<div class="textarea__buttons-wrap">
						<slot name="button" />
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAutoFocus';
// props
const props = defineProps({
	textValue: {
		type: String,
		required: true,
	},
	categoryValue: {
		type: String,
		required: true,
	},
});

const formNote = ref(null);

// emits

const emitCategory = (event) => {
	emit('update:categoryValue', event.target.value);
};

const emitText = (event) => {
	emit('update:textValue', event.target.value);
};

const emit = defineEmits(['submitNote', 'update:textValue', 'update:categoryValue']);

const onSubmit = () => {
	emit('submitNote', formNote);
};
</script>

<style setup>
/* :root {
	--background-gradient: linear-gradient(30deg, #f39c12 30%, #f1c40f);
	--gray: #34495e;
	--darkgray: #2c3e50;
} */

.main {
	margin: 0 auto;
	max-width: 1100px;
	width: 100%;
}

select {
	/* Reset Select */
	display: block;
	appearance: none;
	outline: 0;
	border: 0;
	box-shadow: none;
	/* Personalize */
	flex: 1;
	padding: 0 1em;
	color: #fff;
	background-color: var(--darkgray);
	background-image: none;
	cursor: pointer;
	background-color: #617385;
}

.select {
	position: relative;
	display: flex;
	margin: 0 auto;
	width: 20em;
	height: 3em;
	border-radius: 0.25em;
	overflow: hidden;
	margin-bottom: 40px;
}

.select::after {
	content: '\25BC';
	position: absolute;
	top: 0;
	right: 0;
	padding: 1em;
	background-color: #34495e;
	transition: 0.25s all ease;
	pointer-events: none;
}

.select:hover::after {
	color: #f39c12;
}

.textarea {
	max-width: 530px;
	width: 100%;
	margin: 0 auto 40px;
}

.textarea__wrap {
	display: flex;
	align-items: center;
}

.textarea__field {
	width: 60%;
	display: block;
	box-shadow: 5px 10px 15px rgba(172, 166, 166, 0.8);
	outline: none;
	border: none;
	padding: 10px;
	font-size: 22px;
	font-weight: 400;
	font-family: inherit;
	color: #695c79;
	margin-right: 16px;
}

.textarea__buttons-wrap {
	width: 40%;
}
</style>
