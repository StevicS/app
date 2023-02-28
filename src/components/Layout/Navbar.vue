<template>
	<header class="header">
		<div class="header__wrap">
			<RouterLink to="/" class="header__logo">expanses track</RouterLink>
			<nav class="nav">
				<div class="nav__wrap">
					<ul class="nav__list">
						<li class="nav__item"><RouterLink to="/" active-class="is-active" class="nav__link">notes</RouterLink></li>
						<li class="nav__item"><RouterLink to="/calc" active-class="is-active" class="nav__link">expanses</RouterLink></li>
					</ul>
					<button v-if="storeAuth.user.id" @click="logOut" class="nav__logout">logout - {{ storeAuth.user.email }}</button>
				</div>
			</nav>
		</div>
	</header>
</template>

<script setup>
import { useStoreAuth } from '@/stores/storeAuth';

// store
const storeAuth = useStoreAuth();

// logout user
const logOut = () => {
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
	/* position: absolute;
	top: 0;
	left: 0;
	right: 0; */
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
.is-active {
	color: #f39c12;
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
	/* .nav {
		position: absolute;
		top: 80px;
		top: 63px;
		left: 0%;
		width: 100%;
		z-index: 1;
		padding: 20px;
		background-color: #44495f;
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
	} */
}
</style>
