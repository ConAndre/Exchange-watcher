import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Search.vue')
  },
  {
    path: '/items',
    name: 'Items',
    component: () => import(/* webpackChunkName: "items" */ '@/views/Items.vue')
  },
  {
    path: '/item/:id',
    name: 'ItemView',
    component: () => import(/* webpackChunkName: "items" */ '@/views/Items.vue'),
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
