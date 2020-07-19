import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home.vue'

Vue.use(VueRouter)

const routes = [{
	path: '/',
	component: home,
	children: [{
		path: 'hotpage',
		name: 'hotpage',
		component: () => import('../components/hotpage.vue')
	}],
	redirect: '/hotpage'
}, {
	path: '/write',
	name: 'write',
	component: () => import('../components/writepage.vue')
}]

const router = new VueRouter({
	routes
})

export default router
