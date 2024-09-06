<template>
  <div v-if="fetchedHunterData && 
  gameElements.locations && 
  gameElements.typesQuestion && 
  gameElements.allHunters"
  class="home-container">
    <HeaderVue 
    :data="fetchedHunterData"
    :gameElements="gameElements" />

    <div class="">  
      <CampusExplorerModalVue 
        v-if="showCampusMap"
        @close="closeCampusMap"
        :locations="gameElements.locations"
      />
    </div>

    <div class="footer-container">
      <button @click="openCampusMap" class="btn btn-jenny" >Campus Map</button>
      <button @click="openTopHunters" class="btn btn-jenny" >Top Hunters</button>
    </div>

    <TopHuntersModalVue 
      v-if="showTopHunters"
      :allHunters="gameElements.allHunters"
      @close="closeTopHunters"
    />
    
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getUserByUsernameAPI, getAllLocations, getAllTypesQuestion, getAllUsers } from '@/api';
import HeaderVue from './Header.vue';
import CampusExplorerModalVue from './campus/CampusExplorerModal.vue';
import TopHuntersModalVue from './top-hunters/TopHuntersModal.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderVue,
    CampusExplorerModalVue,
    TopHuntersModalVue,
  },
  setup() {
    const fetchedHunterData = ref(null);
    const gameElements = ref({
      locations: null,
      typesQuestion: null,
      allHunters: null,
    });

    const loading = ref(false);

    const showCampusMap = ref(false);
    const openCampusMap = () => {
      showCampusMap.value = true;
    };

    const closeCampusMap = () => {
      showCampusMap.value = false;
    };

    const showTopHunters = ref(false);
    const openTopHunters = () => {
      showTopHunters.value = true;
    };

    const closeTopHunters = () => {
      showTopHunters.value = false;
    };

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

    const fetchAllHunters = async () => {
      try {
        const response = await getAllUsers();
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        let allHunters = await response.json();
        if (allHunters) {
          gameElements.value.allHunters = allHunters;
        }
      } catch (error) {
        console.log(error);
      }
    }

    const fetchGameData = async () => {
      await fetchLocations();
      await fetchTypesQuestion();
      await fetchAllHunters();
    }

    onMounted(() => {
      fetchHunterData();
      fetchGameData();
    });

    return {
      fetchedHunterData,
      gameElements,
      showCampusMap,
      openCampusMap,
      closeCampusMap,
      showTopHunters,
      openTopHunters,
      closeTopHunters,
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
  height: 90vh;
  /* width: 100%; */
  text-align: center;
}

.footer-container {
    display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  /* background-color: #ccc; */
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
