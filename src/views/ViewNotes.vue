<template>
	<div class="main">
		<div class="select">
			<select>
				<option value="1">Pure CSS Select</option>
				<option value="2">No JS</option>
				<option value="3">Nice!</option>
			</select>
		</div>

		<div class="textarea">
			<textarea class="textarea__field" name="" id="" cols="30" rows="10"></textarea>
			<button class="textarea__submit-btn">add note</button>
		</div>
	</div>
</template>

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
	display: grid;
	place-items: center;
}

.textarea {
	width: 100%;
}

.textarea__field {
	width: 100%;
	max-width: 880px;
	margin: 0 auto;
	display: block;
}

.textarea__submit-btn {
	display: block;
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

/* Custom Select wrapper */
.select {
	position: relative;
	display: flex;
	width: 20em;
	height: 3em;
	border-radius: 0.25em;
	overflow: hidden;
	margin-bottom: 40px;
}
/* Arrow */
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
/* Transition */
.select:hover::after {
	color: #f39c12;
}
</style>
