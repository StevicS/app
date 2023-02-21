<template>
	<div class="box">
		<div class="auth-buttons">
			<div class="auth-buttons__wrap">
				<button class="auth-buttons__btn" :class="{ 'is-active': !register }" @click="register = false">Login</button>
				<button class="auth-buttons__btn" :class="{ 'is-active': register }" @click="register = true">Register</button>
			</div>
		</div>
		<form @submit.prevent="onSubmit">
			<div class="input-box">
				<input v-model="credentials.email" type="email" name="" required />
				<label for="">Email</label>
			</div>
			<div class="input-box">
				<input v-model="credentials.password" type="password" name="" required />
				<label for="">Password</label>
			</div>
			<div class="auth-buttons__wrap">
				<button type="submit">{{ formTitle }}</button>
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
h1 {
	color: white;
	margin: 0;
	padding: 30px 0;
	text-align: center;
}

.box {
	background: rgba(#41394b, 0.8);
	width: 600px;
	height: 320px;
	border-radius: 5px;
	padding: 40px;
	box-sizing: border-box;
	box-shadow: 5px 10px 15px rgba(0, 0, 0, 0.8);
	margin: 80px auto 30px;
}

.auth-buttons {
	text-align: center;
}

.auth-buttons__wrap {
	text-align: center;
}

.auth-buttons__btn {
	border: none;
	outline: none;
	background: transparent;
	font-family: 'Share Tech', sans-serif;
	cursor: pointer;
	font-size: 20px;
	color: aliceblue;
}

.input-box {
	position: relative;
}

.input-box input {
	border-style: none;
	background: transparent;
	border-bottom: 1px solid white;
	width: 100%;
	position: relative;
	outline: none;
	padding: 10px 0;
	color: white;
	font-size: 18px;
	margin-bottom: 30px;
}

.input-box label {
	color: white;
	position: absolute;
	padding: 10px 0;
	top: 0;
	left: 0;
	pointer-events: none;
	transition: 0.5s;
}

.input-box input:focus ~ label,
.input-box input:valid ~ label {
	color: rgb(57, 255, 20);
	font-size: 16px;
	top: -20px;
	transition: 0.5s;
}

.box button[type='submit'] {
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

.box button[type='submit']:hover {
	background: rgb(57, 255, 20);
	border: 1px solid rgb(57, 255, 20);
	transition: 0.3s;
	color: #000;
}

.is-active {
	color: rgb(57, 255, 20);
}
</style>
