import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../components/Welcome.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('../components/Play.vue'), // Lazy loading the component
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue'), // Lazy loading the component
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
