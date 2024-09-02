import { useAuthStore } from '../stores/auth';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('../components/welcome/WelcomePage.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isLoggedIn()) {
        next('/home');
      } else {
        next();
      }
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/home/HomePage.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.isLoggedIn()) {
        next('/');
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
