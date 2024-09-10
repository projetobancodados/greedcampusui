<template>
  <button class="btn btn-jenny" @click="openManageChallenge">
    Manage Challenges
  </button>
  <ManageChallengeModalVue 
    @close="closeManageChallenge"
    v-if="showManageChallenge"
  />
</template>

<script>
import { ref } from 'vue'
import ManageChallengeModalVue from './ManageChallengeModal.vue'
export default {
  components: {
    ManageChallengeModalVue,
  },
  setup() {
    const showManageChallenge = ref(false);
    const openManageChallenge = () => {
      showManageChallenge.value = true;
    };

    const closeManageChallenge = () => {
      showManageChallenge.value = false;
    };

    return {
      showManageChallenge,
      openManageChallenge,
      closeManageChallenge,
    };
  },
}
</script>

<style scoped>
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