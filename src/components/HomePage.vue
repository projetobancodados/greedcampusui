<template>
  <div class="home-container">
    <h1>Welcome to the Home Page</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  name: 'HomePage',
  setup() {
    const authStore = useAuthStore();

    function logout() {
      authStore.logout();
      window.location.href = '/'; // Redirect to the welcome page
    }

    return { logout };
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}
</style>
