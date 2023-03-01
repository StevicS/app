<template>
	<div class="main">
		<div class="main__title-wrap">
			<h1 class="main__title-wrap" v-if="editTitle">{{ editTitle }}</h1>
		</div>
		<form action="" @submit.prevent="onSubmit" ref="formNote">
			<div class="select">
				<select class="select__element" :value="props.categoryValue" @input="emitCategory">
					<option value="Racuni" selected>Racuni</option>
					<option value="Hrana">Hrana</option>
					<option value="Gorivo">Gorivo</option>
					<option value="Restorani">Restorani</option>
					<option value="Soping">Soping</option>
					<option value="Auto">Auto</option>
					<option value="Drugo">Drugo</option>
				</select>
			</div>
			<div class="input">
				<div class="input__wrap">
					<label for="userInput"></label>
					<input :value="props.textValue" @input="emitText" class="input__field" v-autofocus name="" id="userInput" type="number" />
					<div class="input__buttons-wrap">
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
	editTitle: {
		type: String,
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

<style scoped>
.main {
	margin: 0 auto;
	max-width: 1100px;
	width: 100%;
}

.main__title-wrap {
	text-align: center;
	margin-bottom: 28px;
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
	color: var(--orange);
}

.select__element {
	display: block;
	appearance: none;
	outline: 0;
	border: 0;
	box-shadow: none;
	flex: 1;
	padding: 0 14px;
	color: #fff;
	cursor: pointer;
	background-color: #617385;
	font: inherit;
}

.input {
	max-width: 530px;
	width: 100%;
	margin: 0 auto 40px;
}

.input__wrap {
	display: flex;
	align-items: center;
}

.input__field {
	width: 60%;
	display: block;
	box-shadow: 5px 10px 15px rgba(172, 166, 166, 0.8);
	outline: none;
	border: none;
	border-radius: 6px;
	padding: 10px;
	font-size: 22px;
	font-weight: 400;
	font-family: inherit;
	color: #695c79;
	margin-right: 16px;
}

.input__buttons-wrap {
	width: 40%;
}

@media only screen and (max-width: 768px) {
	.input__wrap {
		flex-wrap: wrap;
	}
	.input__buttons-wrap {
		width: 100%;
		text-align: right;
	}

	.input__submit-btn {
		margin-left: 0;
	}
}
</style>
