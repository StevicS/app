<template>
	<div class="main">
		<form action="" @submit.prevent="onSubmit" ref="formNote">
			<div class="select">
				<select :value="props.categoryValue" @input="$emit('update:categoryValue', $event.target.value)">
					<option value="Bills" selected>Bills</option>
					<option value="Food">Food</option>
					<option value="Fuel">Fuel</option>
					<option value="Restoraunts">Restoraunts</option>
					<option value="Shopping">Shopping</option>
					<option value="Car expanses">Car expanses</option>
					<option value="Other">Other</option>
				</select>
			</div>

			<div class="textarea">
				<div class="textarea__wrap">
					<textarea :value="props.textValue" @input="$emit('update:textValue', $event.target.value)" class="textarea__field" name="" id="" cols="30" rows="10"></textarea>
					<slot name="button" />
				</div>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';
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

const emitText = () => {
	emit('update:textValue', text.value);
};

const emitCategory = () => {
	emit('update:categoryValue', number.value);
};
const emit = defineEmits(['submitNote', 'update:textValue', 'update:categoryValue']);

const onSubmit = () => {
	emit('submitNote', formNote);
};
</script>

<style scoped>
:root {
	--background-gradient: linear-gradient(30deg, #f39c12 30%, #f1c40f);
	--gray: #34495e;
	--darkgray: #2c3e50;
}

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
	width: 100%;
}

.textarea__wrap {
	width: 100%;
	max-width: 880px;
	margin: 0 auto;
}

.textarea__field {
	width: 100%;
	display: block;
	box-shadow: 5px 10px 15px rgba(172, 166, 166, 0.8);
	outline: none;
	border: none;
	padding: 10px;
	font-size: 22px;
	font-weight: 400;
	font-family: inherit;
	color: #695c79;
	margin-bottom: 30px;
}
</style>
