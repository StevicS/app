<!-- <template>
	<section class="expenses">
		<div class="expenses__wrap">
			<h1 class="expenses__title">ZBIR TROSKOVA PO KATEGORIJI</h1>
			<div class="expenses__buttons-wrap">
				<button class="expenses__button" @click="sortByPrice">Sortiraj po ceni</button>
				<button class="expenses__button" @click="sortByTitle">Sortiraj po naslovu</button>
			</div>
			<ul class="expenses__list">
				<li class="expenses__item" v-for="(categoryCount, category) in categoryCounts" :key="category">
					<p class="expenses__text">{{ category }}</p>
					<p class="expenses__text">Ukupno: {{ categoryCount.total }}din</p>
				</li>
			</ul>
			<p class="expenses__total">SVI TROSKOVI ZAJEDNO {{ totalCategoryCount }}din</p>
		</div>
	</section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';

let categoryArr = ref([]);
let contentArr = ref([]);

//store
const storeNotes = useStoreNotes();

onMounted(() => {
	storeNotes.notes.forEach((note) => {
		const { category, content, date } = note;
		const intDate = parseInt(date);
		const currentDay = new Date(intDate);

		const currentMonth = currentDay.getMonth() + 1;
		const currentYear = currentDay.getFullYear();

		const noteMonth = new Date(currentDay).getMonth() + 1;
		const noteYear = new Date(currentDay).getFullYear();

		if (noteMonth === currentMonth && noteYear === currentYear) {
			categoryArr.value.push(category);
			contentArr.value.push(parseInt(content));
		}
	});
});

const categoryCounts = computed(() => {
	const counts = categoryArr.value.reduce((acc, category, index) => {
		if (!acc[category]) {
			acc[category] = { count: 0, total: 0 };
		}
		acc[category].count++;
		acc[category].total += contentArr.value[index];
		return acc;
	}, {});
	return Object.entries(counts).reduce((obj, [category, { count, total }]) => {
		obj[category] = { count, total };
		return obj;
	}, {});
});
const totalCategoryCount = computed(() => {
	return Object.values(categoryCounts.value).reduce((total, categoryCount) => {
		return total + categoryCount.total;
	}, 0);
});

const sortByPrice = () => {
	const categoryContentArr = Object.entries(categoryCounts.value).map(([category, { total }]) => ({ category, total }));
	categoryContentArr.sort((a, b) => b.total - a.total);
	categoryArr.value = categoryContentArr.map(({ category }) => category);
	contentArr.value = categoryContentArr.map(({ total }) => total);
};


</script> -->

<!-- verzija 2 -->

<template>
	<section class="expenses">
		<div class="expenses__wrap">
			<h1 class="expenses__title">ZBIR TROSKOVA PO KATEGORIJI</h1>
			<div class="expenses__buttons-wrap">
				<button class="expenses__button" @click="sortByPrice">Sortiraj po ceni</button>
				<button class="expenses__button" @click="sortByTitle">Sortiraj po naslovu</button>
			</div>
			<TransitionGroup class="expenses__list" name="list" tag="ul">
				<li class="expenses__item" v-for="(categoryCount, category) in categoryCounts" :key="category">
					<p class="expenses__text">{{ category }}</p>
					<p class="expenses__text">Ukupno: {{ categoryCount.total }}din</p>
				</li>
			</TransitionGroup>
			<p class="expenses__total">SVI TROSKOVI ZAJEDNO {{ totalCategoryCount }}din</p>
		</div>
	</section>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';

const storeNotes = useStoreNotes();

const expenses = ref([]);

onMounted(() => {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();

	expenses.value = storeNotes.notes
		.filter((note) => {
			const noteDate = new Date(parseInt(note.date));
			return noteDate.getMonth() + 1 === currentMonth && noteDate.getFullYear() === currentYear;
		})
		.map((note) => ({
			category: note.category,
			content: parseInt(note.content),
		}));
});

const categoryCounts = computed(() => {
	const counts = expenses.value.reduce((acc, expense) => {
		if (!acc[expense.category]) {
			acc[expense.category] = { count: 0, total: 0 };
		}
		acc[expense.category].count++;
		acc[expense.category].total += expense.content;
		return acc;
	}, {});
	return Object.entries(counts).reduce((obj, [category, { count, total }]) => {
		obj[category] = { count, total };
		return obj;
	}, {});
});

const totalCategoryCount = computed(() => {
	return Object.values(categoryCounts.value).reduce((total, categoryCount) => {
		return total + categoryCount.total;
	}, 0);
});

const sortByPrice = () => {
	const sorted = expenses.value.sort((a, b) => {
		return b.content - a.content;
	});
	expenses.value = sorted;
};

const sortByTitle = () => {
	const sorted = expenses.value.sort((a, b) => {
		return a.category.localeCompare(b.category);
	});
	expenses.value = sorted;
};
</script>

<style scoped>
.expenses {
	padding: 0 40px;
}
.expenses__title {
	font-size: 32px;
	margin-bottom: 8px;
}
.expenses__buttons-wrap {
	margin-bottom: 20px;
}
.expenses__button {
	border: none;
	outline: none;
	border-radius: 6px;
	padding: 10px;
	font: inherit;
	color: var(--color-text);
	background-color: rgb(189, 82, 199);
	margin-right: 14px;
	cursor: pointer;
	transition: opacity 0.3s ease;
}
.expenses__button:hover {
	opacity: 0.6;
}
.expenses__list {
	margin-bottom: 40px;
}
.expenses__text {
	font-size: 20px;
}
.expenses__total {
	font-size: 28px;
}
.list-move {
	transition: all 0.8s;
}

@media only screen and (max-width: 1024px) {
	.expenses__title {
		font-size: 28px;
	}
	.expenses__text {
		font-size: 16px;
	}
	.expenses__total {
		font-size: 22px;
	}
}

@media only screen and (max-width: 768px) {
	.expenses {
		padding: 0;
	}
	.expenses__title {
		font-size: 24px;
	}
	.expenses__text {
		font-size: 16px;
	}
	.expenses__total {
		font-size: 20px;
	}
}
</style>
