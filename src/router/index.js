import { createRouter, createWebHashHistory } from 'vue-router';
import { useStoreAuth } from '@/stores/storeAuth';
import ViewNotes from '@/views/ViewNotes.vue';
import ViewAuth from '@/views/ViewAuth.vue';
import ViewEditNote from '@/views/ViewEditNote.vue';
import ViewCalculation from '@/views/ViewCalculation.vue';

const routes = [
	{
		path: '/',
		name: 'notes',
		component: ViewNotes,
	},
	{
		path: '/calc',
		name: 'calculation',
		component: ViewCalculation,
	},
	{
		path: '/editNote/:id',
		name: 'edit-note',
		component: ViewEditNote,
	},
	{
		path: '/auth',
		name: 'auth',
		component: ViewAuth,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior() {
		return {
			top: 0,
			left: 0,
			behavior: 'smooth',
		};
	},
});

router.beforeEach(async (to, from) => {
	const storeAuth = useStoreAuth();
	if (!storeAuth.user.id && to.name !== 'auth') {
		return {
			name: 'auth',
		};
	}

	if (storeAuth.user.id && to.name === 'auth') {
		return false;
	}
});

export default router;
