<template>
  <div class="header-container">
    <div class="session-options">

      <div class="avatar" @click="toggleDropdown">
        <img src="avatar.png" alt="Avatar" class="avatar-icon" />
      </div>

      <div v-if="isDropdownVisible" class="dropdown-menu">
        <ul>
          <li @click="openProfile">Profile</li>
          <li @click="logout">Logout</li>
        </ul>
      </div>

    </div>
    
    <div class="jenny-count">
      <button>Jennys</button>
    </div>

  </div>

  <ProfileModal 
    :visible="showProfile"
    @close="closeProfile"
  />

</template>

<script>
import { useAuthStore } from '../../stores/auth';
import ProfileModal from './profile/ProfileModal.vue';

export default {
  name: 'HeaderVue',
  components: {
    ProfileModal,
  },
  data() {
    return {
      isDropdownVisible: false,
      showProfile: false,
    };
  },
  setup() {
    const authStore = useAuthStore();

    function logout() {
      authStore.logout();
      window.location.href = '/'; // Redirect to the welcome page
    }

    return { logout };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    openProfile() {
      this.showProfile = true;
    },
    closeProfile() {
      this.showProfile = false;
    },
    // handleClickOutside(event) {
    //   if (!this.$el.contains(event.target)) {
    //     this.isDropdownVisible = false;
    //   }
    // },
  },
  // mounted() {
  //   document.addEventListener('click', this.handleClickOutside);
  // },
  // beforeUnmount() {
  //   document.removeEventListener('click', this.handleClickOutside);
  // },
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
}

.session-options {
  position: relative;
}

.avatar {
  cursor: pointer; /* Shows a pointer cursor on hover */
}

.avatar-icon {
  width: 40px; /* Adjust size */
  height: 40px; /* Adjust size */
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
</style>
