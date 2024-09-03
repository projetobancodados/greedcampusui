<template>
  <div v-if="fetchedHunterData" class="home-container">
    <HeaderVue 
    :data="fetchedHunterData" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import HeaderVue from './Header.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderVue
  },
  setup() {
    const fetchedHunterData = ref(null);
    const loading = ref(false);

    const fetchHunterData = async () => {
      try {
        loading.value = true;
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}/hunter/username/${localStorage.getItem('access_token')}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        fetchedHunterData.value = await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchHunterData);

    return {
      fetchedHunterData,
      loading,
      fetchHunterData,
    }
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  text-align: center;
}
</style>
