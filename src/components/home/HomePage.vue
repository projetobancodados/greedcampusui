<template>
  <div v-if="fetchedHunterData && 
  gameElements.locations && 
  gameElements.typesQuestion && 
  gameElements.allHunters &&
  gameElements.bookCards.hunter_cards &&
  gameElements.bookCards.game_cards"
  class="home-container">
    <HeaderVue 
    :data="fetchedHunterData"
    :gameElements="gameElements" />

    <div class="">
      <button class="btn btn-book" @click="openBookListing">
        <img :src="require('@/assets/book-anim.gif')" class="book-anim" />
        <span class="hover-text"><b>BOOK!</b></span>
      </button>
    </div>

    <div class="footer-container">
      <button @click="openCampusMap" class="btn btn-jenny" >Campus Map</button>
      <button @click="openTopHunters" class="btn btn-jenny" >Top Hunters</button>
    </div>

    <BookModalVue 
      v-if="showBookListing"
      @close="closeBookListing"
      :bookCards="gameElements.bookCards"
    />

    <CampusExplorerModalVue 
      v-if="showCampusMap"
      @close="closeCampusMap"
      :locations="gameElements.locations"
    />

    <TopHuntersModalVue 
      v-if="showTopHunters"
      :allHunters="gameElements.allHunters"
      @close="closeTopHunters"
    />
    
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getUserByUsernameAPI, getAllLocations, getAllTypesQuestion, getAllUsers, getAllHunterCards, getAllGameCards } from '@/api';
import HeaderVue from './Header.vue';
import CampusExplorerModalVue from './campus/CampusExplorerModal.vue';
import TopHuntersModalVue from './top-hunters/TopHuntersModal.vue';
import BookModalVue from './book/BookModal.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderVue,
    CampusExplorerModalVue,
    TopHuntersModalVue,
    BookModalVue,
  },
  setup() {
    const fetchedHunterData = ref(null);
    const gameElements = ref({
      locations: null,
      typesQuestion: null,
      allHunters: null,
      bookCards: {
        hunter_cards: null,
        game_cards: null,
      },
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

    const showBookListing = ref(false);
    const openBookListing = () => {
      showBookListing.value = true;
    };

    const closeBookListing = () => {
      showBookListing.value = false;
    };

    const fetchHunterData = async () => {
      try {
        loading.value = true;
        const response = await getUserByUsernameAPI();
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        fetchedHunterData.value = await response.json();
        await fetchAllHunterCards(fetchedHunterData.value.Hunter_Id);
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

    const fetchAllGameCards = async () => {
      try {
        const response = await getAllGameCards();
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        let allGameCards = await response.json();
        if (allGameCards.game_cards) {
          gameElements.value.bookCards.game_cards = allGameCards.game_cards;
        }
      } catch (error) {
        console.log(error);
      }
    }

    const fetchAllHunterCards = async (hunter_id) => {
      try {
        const response = await getAllHunterCards(hunter_id);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        let allHunterCards = await response.json();
        if (allHunterCards.hunter_cards) {
          gameElements.value.bookCards.hunter_cards = allHunterCards.hunter_cards;
        }
      } catch (error) {
        console.log(error);
      }
    }

    const fetchGameData = async () => {
      await fetchLocations();
      await fetchTypesQuestion();
      await fetchAllHunters();
      await fetchAllGameCards();
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
      showBookListing,
      openBookListing,
      closeBookListing,
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

.btn-book {
  border: none; /* Remove default border */
  padding: 0; /* Remove padding */
  background-color: transparent; /* Transparent background */
  cursor: pointer; /* Pointer cursor on hover */
  outline: none; /* Remove focus outline */
}

.book-anim {
  max-height: 400px;
  object-fit: cover; /* Ensure the image covers the button area */
  transition: transform 0.3s ease; /* Smooth transition for scaling */
}

.btn-book:hover .book-anim {
  transform: scale(1.5); /* Slightly enlarge the image on hover */
  cursor: pointer;
}

.hover-text {
  position: absolute; /* Absolute positioning to overlay on the button */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Adjust centering */
  color: white; /* Text color */
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background for readability */
  padding: 5px 10px; /* Padding for the text */
  border-radius: 4px; /* Rounded corners for the text box */
  opacity: 0; /* Initially hidden */
  pointer-events: none; /* Disable pointer events to avoid text interfering with button clicks */
  transition: opacity 0.2s ease; /* Smooth transition for opacity */
  font-size: 50px;
}

/* Show text on button hover */
.btn-book:hover .hover-text {
  opacity: 1; /* Show the text */
}

</style>
