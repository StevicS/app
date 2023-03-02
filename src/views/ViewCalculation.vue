<template>
	<section class="expanses">
		<div class="expanses__wrap">
			<h1 class="expanses__title">ZBIR TROSKOVA PO KATEGORIJI</h1>
			<ul class="expanses__list">
				<li class="expanses__item" v-for="(categoryCount, category) in categoryCounts" :key="category">
					<p class="expanses__text">{{ category }}</p>
					<p class="expanses__text">Ukupno: {{ categoryCount.total }}din</p>
				</li>
			</ul>
			<p class="expanses__total">SVI TROSKOVI ZAJEDNO {{ totalCategoryCount }}din</p>
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
</script>

<style scoped>
.expanses {
	padding: 0 40px;
}
.expanses__title {
	font-size: 32px;
	margin-bottom: 8px;
}
.expanses__list {
	margin-bottom: 40px;
}
.expanses__text {
	font-size: 20px;
}
.expanses__total {
	font-size: 28px;
}

@media only screen and (max-width: 1024px) {
	.expanses__title {
		font-size: 28px;
	}
	.expanses__text {
		font-size: 16px;
	}
	.expanses__total {
		font-size: 22px;
	}
}

@media only screen and (max-width: 768px) {
	.expanses {
		padding: 0;
	}
	.expanses__title {
		font-size: 24px;
	}
	.expanses__text {
		font-size: 16px;
	}
	.expanses__total {
		font-size: 20px;
	}
}
</style>
