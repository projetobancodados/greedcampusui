<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <form @submit.prevent="logUser">
        <div class="form-group">
          <label for="Username">Username</label>
          <input type="text" v-model="formData.Username" required />
        </div>
        <div class="form-group">
          <label for="Password">Password</label>
          <input type="password" v-model="formData.Password" required />
        </div>
        <button type="submit" class="btn submit-btn">Play!</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../../stores/auth';
import { logUserAPI } from '../../api';
import router from '../../router';
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        Username: '',
        Password: '',
      },
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async logUser() {
      try {

        const response = await logUserAPI(this.formData);
        if(!response.ok) {
          throw new Error('Failed to login');
        }

        const data = await response.json();
        const authStore = useAuthStore();
        authStore.login(data.access_token);
        // this.close();
        router.push('/home');

      } catch (error) {
        alert('Error: ' + error.message);
      }
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  background-color: #61dafb;
  border: none;
  padding: 10px 20px;
  color: #20232a;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #20232a;
  color: #61dafb;
}
</style>
