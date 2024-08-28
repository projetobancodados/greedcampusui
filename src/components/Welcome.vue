<template>

  <div class="welcome-container">
    <h1>Welcome to GREED CAMPUS</h1>
    <div class="button-container">
      <router-link to="/play" class="btn">Play</router-link>
      <button @click="openRegisterForm" class="btn">Register</button>
      <!-- <router-link to="/register" class="btn">Register</router-link> -->
    </div>

    <Register 
      :visible="showRegisterForm"
      @close="closeRegisterForm"
    />
  </div>

</template>

<script>

import Register from './Register.vue'

export default {
  name: 'Welcome',
  components: {
    Register
  },

  data() {
    return {
      showRegisterForm: false,
    };
  },
  methods: {
    openRegisterForm() {
      this.showRegisterForm = true;
    },
    closeRegisterForm() {
      this.showRegisterForm = false;
    },
  },
};
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: white;
  color: #282c34;
}

h1 {
  margin-bottom: 20px;
  font-size: 3em;
}

.button-container {
  display: flex;
  gap: 20px;
}

.btn {
  padding: 15px 30px;
  font-size: 1.5em;
  color: #61dafb;
  background-color: #20232a;
  border: 2px solid #61dafb;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #61dafb;
  color: #20232a;
}

</style>

