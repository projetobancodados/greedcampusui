<template>
  <div class="header-container">
    <div class="session-options">

      <div class="avatar" @click="toggleDropdown">
        <img :src="placeholderAvatar" alt="Avatar" class="avatar-icon" />
      </div>

      <div v-if="isDropdownVisible" class="dropdown-menu">
        <ul>
          <li @click="openProfile">Profile</li>
          <li @click="logout">Logout</li>
        </ul>
      </div>

    </div>

    <div>Welcome, {{ hunterData.Username }}</div>
    
    <div class="jenny-count">
      <button @click="openJennyPuzzle" class="btn btn-jenny">Jennys</button>
    </div>

  </div>

  <ProfileModal 
    v-if="showProfile"
    :data="hunterData"
    :locations="locations"
    :typesQuestion="typesQuestion"
    @close="closeProfile"
    @update="handleDataUpdate"
  />

  <JennyPuzzleModal
    v-if="showJennyPuzzle"
    :data="hunterData"
    @close="closeJennyPuzzle"
  />

</template>

<script>
import { ref, computed } from 'vue';
import { logUserAPI } from '../../api';
import { binaryStrToArrayBuffer } from '../../utils';
import { useAuthStore } from '../../stores/auth';

import ProfileModal from './profile/ProfileModal.vue';
import JennyPuzzleModal from './jenny-puzzle/JennyPuzzleModal.vue';

export default {
  name: 'HeaderVue',
  components: {
    ProfileModal,
    JennyPuzzleModal,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    gameElements: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    
    // console.log(props.gameElements);
    const isDropdownVisible = ref(false);
    const showProfile = ref(false);
    const showJennyPuzzle = ref(false);

    const hunterData = ref(props.data);
    const locations = ref(props.gameElements['locations']);
    const typesQuestion = ref(props.gameElements['typesQuestion']);

    const authStore = useAuthStore();

    const placeholderAvatar = computed(() => {
      // console.log(hunterData.value.Avatar);
      if (hunterData.value.Avatar) {
        const buffer = binaryStrToArrayBuffer(hunterData.value.Avatar);
        const mimeType = 'application/octet-stream';
        const result = new Blob([buffer], {type: mimeType});
        // const result = new Blob([hunterData.value.Avatar], {type: 'application/octet-stream'});
        // console.log(result);
        return URL.createObjectURL(result);
      }
      return require('@/assets/placeholder-avatar.png');
    });

    const openProfile = () => {
      if (hunterData.value) {
        showProfile.value = true;
      }
    };

    const closeProfile = () => {
      showProfile.value = false;
    };

    const openJennyPuzzle = () => {
      showJennyPuzzle.value = true;
    };

    const closeJennyPuzzle = () => {
      showJennyPuzzle.value = false;
    };

    const handleDataUpdate = async (updatedData) => {
      if (updatedData) {
        authStore.logout();
        try {
          const response = await logUserAPI(updatedData);
          if(!response.ok) {
            throw new Error('Failed to login');
          }
          const data = await response.json();
          authStore.login(data.access_token);
          // console.log('updatedData: ' + updatedData);
          hunterData.value = updatedData;
        } catch (error) {
          alert('Error: ' + error.message);
        }
      }
    };

    function logout() {
      authStore.logout();
      window.location.href = '/'; // Redirect to the welcome page
    }

    return {
      isDropdownVisible,
      showProfile,
      showJennyPuzzle,
      hunterData,
      locations,
      typesQuestion,
      placeholderAvatar,
      openProfile,
      closeProfile,
      openJennyPuzzle,
      closeJennyPuzzle,
      handleDataUpdate,
      logout 
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: #ccc;
}

.session-options {
  position: relative;
}

.avatar {
  cursor: pointer; /* Shows a pointer cursor on hover */
}

.avatar-icon {
  width: 60px; /* Adjust size */
  height: 60px; /* Adjust size */
  border-radius: 50%; /* Makes it circular */
}

.dropdown-menu {
  position: absolute; /* Positions relative to .left */
  top: 50px; /* Adjust position based on your layout */
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1000; /* Ensures dropdown appears above other content */
}

.dropdown-menu ul {
  list-style: none; /* Removes bullet points */
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px 20px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0; /* Hover effect */
}

.btn-jenny {
  background-color: #43d943;
  border-radius: 10px;
  border-width: 0.5px;
  padding: 5px 10px;
  font-size: 20px;
}

.btn-jenny:hover {
  background-color: #e36664;
  cursor: pointer;
}
</style>
