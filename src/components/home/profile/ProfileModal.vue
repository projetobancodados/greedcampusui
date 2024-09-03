<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <div v-if="data">
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
          
          <div class="form-group">
            <label for="avatar">Upload Avatar</label>
            <input type="file" id="avatar" @change="handleFileChange" accept="image/*" />
          </div>
          <div v-if="previewUrl" class="image-preview">
            <img :src="previewUrl" alt="Image Preview" class="avatar-preview" />
          </div>

          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="formData.Username" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="formData.Email" required />
          </div>
          <div class="form-group">
            <label for="password" >Password</label>
            <input type="password" id="password" v-model="formData.Password" required />
          </div>
          <button type="submit" class="btn submit-btn">Update</button>
        </form>
        <button @click="handleDeleteAccount" class="btn delete-account-btn">Delete Account</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { arrayBufferToBinaryStr } from '@/utils';
import { deleteUserAPI } from '@/api';
import { useAuthStore } from '@/stores/auth';
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {

    const formData = ref(props.data);
    const avatarFile = ref(null);
    const previewUrl = ref(null);
    const authStore = useAuthStore();

    watch(() => props.data, (newData) => {
      Object.assign(formData, newData);
    });

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        avatarFile.value = file;
        previewUrl.value = URL.createObjectURL(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          formData.value.Avatar = arrayBufferToBinaryStr(e.target.result);
          // console.log(formData.value);
        };
        reader.readAsArrayBuffer(file);
      }
    };

    const handleDeleteAccount = async () => {
      const hunter_id = formData.value.Hunter_Id;
      if (hunter_id) {
        // console.log('deleting user with id ', hunter_id);
        try {
          const response = await deleteUserAPI(hunter_id);
          const data = await response.json();
          if (data.msg) {
            alert(data.msg + ' Sad to see you go!');
          }
          authStore.logout();
          window.location.reload();
        } catch (error) {
          console.log(error);
        } 
      }
    };

    const handleSubmit = async () => {
      try {

        let formDataToSend = {
          Username: formData.value.Username,
          Email: formData.value.Email,
          Password: formData.value.Password,
          Avatar: formData.value.Avatar
        };
        // const formDataToSend = new FormData();
        // formDataToSend.append('Username', formData.value.Username);
        // formDataToSend.append('Email', formData.value.Email);
        // formDataToSend.append('Password', formData.value.Password);
        // formDataToSend.append('Avatar', formData.value.Avatar);

        // console.log(formDataToSend, JSON.stringify(formDataToSend));
        const response = await fetch(`${process.env.VUE_APP_API_URL}/hunter/update/${formData.value['Hunter_Id']}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataToSend),
        });

        if (!response.ok) {
          throw new Error('Failed to update data.');
        }

        const updatedData = await response.json();
        // console.log(updatedData);
        alert('Data updated successfully!');
        emit('update', updatedData);
        emit('close');
      } catch (error) {
        alert('Error: ' + error.message);
      }
    };

    return {
      formData,
      previewUrl,
      handleSubmit,
      handleDeleteAccount,
      handleFileChange,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
}
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

input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

label {
  display: block;
  margin-bottom: 5px;
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

.delete-account-btn {
  background-color: #bf2121;
  border: none;
  padding: 10px 20px;
  color: #20232a;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-account-btn:hover {
  background-color: #20232a;
  color: #61dafb;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 10px;
}
</style>
