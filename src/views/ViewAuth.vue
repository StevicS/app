<template>
	<div class="auth-page">
		<div class="auth-page__buttons">
			<div class="auth-page__buttons-wrap">
				<button class="auth-page__button" :class="{ 'is-active': !register }" @click="register = false">Login</button>
				<button class="auth-page__button" :class="{ 'is-active': register }" @click="register = true">Register</button>
			</div>
		</div>
		<form class="auth-page__form" @submit.prevent="onSubmit">
			<div class="auth-page__input-wrap">
				<input class="auth-page__input" v-model="credentials.email" type="email" required id="loginEmail" />
				<label class="auth-page__label" for="loginEmail">Email</label>
			</div>
			<div class="auth-page__input-wrap">
				<input class="auth-page__input" v-model="credentials.password" type="password" required id="loginPassword" />
				<label class="auth-page__label" for="loginPassword">Password</label>
			</div>
			<div class="auth-page__buttons-wrap">
				<button class="auth-page__btn-submit" type="submit">{{ formTitle }}</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth';

// store
const storeAuth = useStoreAuth();

// register-login
const register = ref(false);

// form btn title
const formTitle = computed(() => {
	return register.value ? 'Register' : 'Login';
});

// credentials
const credentials = reactive({
	email: '',
	password: '',
});

// submit
const onSubmit = () => {
	if (!credentials.email || !credentials.password) {
		alert('Please enter an email and password');
	} else {
		if (register.value) {
			storeAuth.registerUser(credentials);
		} else {
			storeAuth.loginUser(credentials);
		}
	}
};
</script>

<style scoped>
.auth-page {
	background: rgba(#41394b, 0.8);
	max-width: 600px;
	width: 100%;
	min-height: 320px;
	border-radius: 6px;
	padding: 40px;
	box-sizing: border-box;
	box-shadow: 5px 10px 15px rgba(0, 0, 0, 0.8);
	margin: 80px auto 30px;
}

.auth-page__buttons-wrap {
	text-align: center;
	margin-bottom: 10px;
}

.auth-page__button {
	border: none;
	outline: none;
	background: transparent;
	font-family: 'Share Tech', sans-serif;
	cursor: pointer;
	font-size: 20px;
	color: aliceblue;
}

.auth-page__input-wrap {
	position: relative;
	font: inherit;
}

.auth-page__input {
	border-style: none;
	background: transparent;
	border-bottom: 1px solid white;
	width: 100%;
	position: relative;
	outline: none;
	padding: 10px 0;
	color: white;
	font-size: 22px;
	margin-bottom: 30px;
	font-family: 'Share Tech', sans-serif;
}

.auth-page__input:-webkit-autofill,
.auth-page__input:-webkit-autofill:hover,
.auth-page__input:-webkit-autofill:focus {
	transition: background-color 5000s ease-in-out 0s;
	-webkit-text-fill-color: #fff !important;
}

.auth-page__label {
	color: white;
	position: absolute;
	padding: 10px 0;
	top: 0;
	left: 0;
	pointer-events: none;
	transition: 0.5s;
	font-size: 18px;
}

.auth-page__input:focus ~ label,
.auth-page__input:valid ~ label {
	color: rgb(57, 255, 20);
	font-size: 16px;
	top: -20px;
	transition: 0.5s;
}

.auth-page__btn-submit {
	background: transparent;
	color: white;
	border-spacing: none;
	border: 1px solid white;
	padding: 10px 20px;
	font-size: 16px;
	border-radius: 12px;
	outline: none;
	cursor: pointer;
	transition: 0.3s;
	font-family: 'Share Tech', sans-serif;
}

.auth-page__btn-submit:hover {
	background: rgb(57, 255, 20);
	border: 1px solid rgb(57, 255, 20);
	transition: 0.3s;
	color: #000;
}

.is-active {
	color: rgb(57, 255, 20);
}

@media only screen and (max-width: 768px) {
	.auth-page {
		padding: 40px 20px;
	}
}
</style>
