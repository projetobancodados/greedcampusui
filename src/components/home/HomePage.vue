<template>
  <div v-if="fetchedHunterData && gameElements.locations && gameElements.typesQuestion" class="home-container">
    <HeaderVue 
    :data="fetchedHunterData"
    :gameElements="gameElements" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getUserByUsernameAPI, getAllLocations, getAllTypesQuestion } from '@/api';
import HeaderVue from './Header.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderVue
  },
  setup() {
    const fetchedHunterData = ref(null);
    const gameElements = ref({
      locations: null,
      typesQuestion: null,
    });

    const loading = ref(false);

    const fetchHunterData = async () => {
      try {
        loading.value = true;
        const response = await getUserByUsernameAPI();
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

    const fetchLocations = async () => {
      try {
        const response = await getAllLocations();
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        let locations = await response.json();
        if (locations) {
          gameElements.value.locations = locations;
        }
      } catch (error) {
        console.log(error);
      }
    }

    const fetchTypesQuestion = async () => {
      try {
        const response = await getAllTypesQuestion();
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        let typesQuestion = await response.json();
        if (typesQuestion) {
          gameElements.value.typesQuestion = typesQuestion;
        }
      } catch (error) {
        console.log(error);
      }
    }

    const fetchGameData = async () => {
      await fetchLocations();
      await fetchTypesQuestion();
    }

    onMounted(() => {
      fetchHunterData();
      fetchGameData();
    });

    return {
      fetchedHunterData,
      gameElements,
      loading,
      fetchHunterData,
      fetchGameData
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
