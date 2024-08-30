import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('access_token') || null,
  }),
  actions: {
    login(token) {
      this.accessToken = token;
      localStorage.setItem('access_token', token);
    },
    logout() {
      this.accessToken = null;
      localStorage.removeItem('access_token');
    },
    isLoggedIn() {
      return !!this.accessToken;
    },
  },
});