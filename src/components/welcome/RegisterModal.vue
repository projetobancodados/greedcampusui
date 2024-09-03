<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" v-model="formData.username" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="formData.email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="formData.password" required />
        </div>
        <button type="submit" class="btn submit-btn">Create Account</button>
      </form>
    </div>
  </div>
</template>

<script>
import { registerUserAPI } from '../../api';
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
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async registerUser() {
      try {
        const response = await registerUserAPI(this.formData);
        const data = await response.json();
        alert(data.msg);
        this.close();
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
