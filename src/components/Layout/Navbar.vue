<template>
	<header class="header">
		<div class="header__wrap">
			<RouterLink to="/" class="header__logo">expanse track</RouterLink>
			<nav class="nav" :class="{ 'nav--active': showMobile }">
				<div class="nav__wrap">
					<ul class="nav__list">
						<li class="nav__item" @click="showMobile = !showMobile"><RouterLink to="/" active-class="nav__link--active" class="nav__link">notes</RouterLink></li>
						<li class="nav__item" @click="showMobile = !showMobile"><RouterLink to="/calc" active-class="nav__link--active" class="nav__link">expanses</RouterLink></li>
					</ul>
					<button v-if="storeAuth.user.id" @click="logOut" class="nav__logout">logout - {{ storeAuth.user.email }}</button>
				</div>
			</nav>
			<button class="header__hamburger-menu" :class="{ active: showMobile }" @click="showMobile = !showMobile">
				<span class="header__hamburger-span"></span>
				<span class="header__hamburger-span"></span>
				<span class="header__hamburger-span"></span>
			</button>
		</div>
	</header>
</template>

<script setup>
import { ref } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth';

// store
const storeAuth = useStoreAuth();

let showMobile = ref(false);

// logout user
const logOut = () => {
	showMobile.value = false;
	storeAuth.logOutUser();
};
</script>

<style scoped>
.header {
	width: 100%;
	height: 80px;
	display: flex;
	align-items: center;
	box-shadow: 5px 10px 15px rgba(172, 166, 166, 0.8);
	position: relative;
}
.header__wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: 1400px;
	width: 100%;
	margin: 0 auto;
	padding: 0 20px;
}
.header__logo {
	text-decoration: none;
	color: var(--color-text);
	font-size: 38px;
	text-transform: uppercase;
}
.nav__wrap,
.nav__list {
	display: flex;
	align-items: center;
}
.nav__item {
	text-decoration: none;
	list-style: none;
	margin-right: 18px;
	cursor: pointer;
	font-size: 20px;
	text-transform: uppercase;
}
.nav__logout {
	background-color: transparent;
	border: none;
	outline: none;
	color: var(--color-text);
	font: inherit;
	cursor: pointer;
	font-size: 18px;
	border-radius: 20px;
	border: 1px solid #b3bada;
	padding: 4px 10px;
	cursor: pointer;
}
.nav__link--active {
	color: var(--orange);
}
.header__hamburger-menu {
	display: none;
}

@media only screen and (max-width: 1024px) {
	.header__logo {
		font-size: 28px;
	}
	.nav__link {
		font-size: 18px;
	}
}

@media only screen and (max-width: 768px) {
	.header__logo {
		font-size: 28px;
	}
	.nav {
		position: absolute;
		top: 80px;
		top: 62px;
		left: -100%;
		width: 100%;
		z-index: 1;
		padding: 20px 20px 30px;
		background-image: linear-gradient(15deg, #b3bada 0%, #140f1a 100%);
		transition: left 0.3s ease;
	}
	.nav--active {
		left: 0%;
	}
	.nav__wrap {
		flex-direction: column;
		align-items: flex-start;
	}
	.nav__list {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		padding: 0;
	}
	.nav__item {
		margin-bottom: 8px;
	}
	.nav__link {
		font-size: 18px;
	}
	.header__hamburger-menu {
		display: inline-block;
		cursor: pointer;
		background-color: transparent;
		border: none;
		padding-top: 8px;
		margin: 0;
	}
	.header__hamburger-span {
		display: block;
		width: 30px;
		height: 4px;
		margin-bottom: 5px;
		position: relative;
		background: var(--color-text);
		border-radius: 3px;
		z-index: 1;
	}
	.header__hamburger-menu.active {
		padding-top: 0;
	}
	.header__hamburger-menu.active .header__hamburger-span:first-child {
		transform: rotate(45deg);
		top: 11px;
		left: 6px;
		background-color: var(--orange);
	}
	.header__hamburger-menu.active .header__hamburger-span:nth-child(2) {
		width: 0;
		opacity: 0;
	}
	.header__hamburger-menu.active .header__hamburger-span:last-child {
		transform: rotate(-45deg);
		top: -2px;
		left: 6px;
		background-color: var(--orange);
	}
}
</style>
