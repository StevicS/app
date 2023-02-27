<template>
	<h1>ZBIR TROSKOVA PO KATEGORIJI</h1>
	<ul>
		<li v-for="(categoryCount, category) in categoryCounts" :key="category">
			<p>{{ category }}</p>
			<p>Ukupno: {{ categoryCount.total }}</p>
		</li>
	</ul>
	<p>SVI TROSKOVI ZAJEDNO {{ totalCategoryCount }}din</p>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';

let categoryArr = ref([]);
let contentArr = ref([]);

//store
const storeNotes = useStoreNotes();

onMounted(() => {
	// storeNotes.notes.forEach((note) => {
	// 	const { category, content } = note;
	// 	categoryArr.value.push(category);
	// 	contentArr.value.push(parseInt(content));
	// });
	// Get current month and year

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

<!-- <script setup>
import { onMounted, ref, computed } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';

let categoryArr = ref([]);
let contentArr = ref([]);

//store
const storeNotes = useStoreNotes();

onMounted(() => {
	// Get current month and year
	const today = new Date();
	const currentMonth = today.getMonth();
	const currentYear = today.getFullYear();

	storeNotes.notes.forEach((note) => {
		const { category, content, date } = note;
		// Get month and year from note date
		const noteMonth = new Date(date).getMonth();
		const noteYear = new Date(date).getFullYear();
		// Only add note if it's from the current month and year
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

<template>
	<div>
		<h4 v-for="category in Object.keys(categoryCounts)" :key="category">Categories: {{ category }}</h4>
		<ul>
			<li v-for="(categoryCount, category) in categoryCounts" :key="category">
				<p>Category: {{ category }}</p>
				<p>Contents: {{ categoryCount.total }}</p>
			</li>
		</ul>
		<p>Total: {{ totalCategoryCount }}</p>
	</div>
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
		const { category, content, created_at } = note;
		const noteDate = new Date(created_at);
		const currentDate = new Date();
		if (noteDate >= firstDayOfMonth(currentDate) && noteDate <= lastDayOfMonth(currentDate)) {
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



function firstDayOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}

function lastDayOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
</script> -->
