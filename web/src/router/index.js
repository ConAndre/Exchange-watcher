import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/watch',
    name: 'Watch',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Watch.vue')
  },
  {
    path: '/items',
    name: 'Items',
    component: () => import(/* webpackChunkName: "items" */ '@/views/Items.vue')
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
