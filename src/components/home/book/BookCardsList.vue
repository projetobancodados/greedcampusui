<template>
  <div class="gallery-container">
    <div class="image-grid">
      <div v-for="(slot, index) in paginatedImages" 
        :key="index" 
        class="image-item"
        @click="showDetails(slot)"
        >
        <img :src="slot.Card_Img" :alt="slot.Title" class="card-img" />
      </div>
    </div>

    <CardDetailsModalVue 
      @close="closeDetails"
      :cardDetails="selectedImage"
      :hunterData="hunterData"
      :isBuyList="isBuyList"
    />

    <div class="pagination-controls">
      <button @click="goToPage(currentPage-1)">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import CardDetailsModalVue from '../card/card-details/CardDetailsModal.vue';

export default {
  components: {
    CardDetailsModalVue,
  },
  props: {
    bookCards:{
      type: Array,
      required: false,
    },
    hunterData: {
      type: Object,
      required:false
    },
    isBuyList: {
      type: Boolean,
      required: false,
    },
  },
  setup(props) {
    
    const cards = ref(props.bookCards);
    const selectedImage = ref(null);
    const slots = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(6);

    const totalPages = computed(() => {
      return Math.ceil(slots.value.length / pageSize.value);
    });

    const paginatedImages = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return slots.value.slice(start, end);
    });
    
    const generateSlots = () => {
      for(let i=0;i<100;i++) {
        let slotNumber = generateSlotNumber(i);
        let j = 0;
        for(j=0;j<cards.value.length;j++) {
          if (cards.value[j].Slot_Number === slotNumber) {
            break;
          }
        }
        if (j < cards.value.length) {
          // console.log(cards.value[j]);
          cards.value[j].Card_Img = require(`@/assets/gc-cards/${slotNumber}.png`);
          slots.value.push(cards.value[j]);
        } else {
          slots.value.push({
            Card_Id: 0,
            Card_Img: require(`@/assets/gc-cards-empty/${slotNumber}-empty.png`),
            Description: "",
            Difficulty_Code: 0,
            Quantity: 0,
            Slot_Number: "",
            Title: "",
          });
        }
      }
    };

    const generateSlotNumber = (number) => {
      if (number < 10) {
        return "00" + number;
      }
      return "0" + number;
    };

    const showDetails = (slot) => {
      selectedImage.value = slot;
    };

    const closeDetails = () => {
      selectedImage.value = null;
    };

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    onMounted(generateSlots);

    return {  
      goToPage,
      showDetails,
      closeDetails,
      selectedImage,
      paginatedImages,
      currentPage,
      totalPages,
    };
  }
};
</script>

<style scoped>
.gallery-container {
  width: 90%;
  max-width: 900px;
  margin: 0 auto; /* Center align */
  padding: 20px; /* Optional padding */
}

.image-grid {
  display: grid; /* CSS Grid for layout */
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); /* Responsive columns */
  gap: 5px; /* Gap between images */
  margin-bottom: 20px; /* Space below grid */
}

.image-item {
  overflow: hidden; /* Hide overflow */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow */
}

.card-img{
  width: 100%; /* Full width */
  height: auto; /* Maintain aspect ratio */
  display: block; /* Remove bottom margin */
}

.pagination-controls {
  display: flex; /* Flexbox for layout */
  justify-content: center; /* Center align */
  align-items: center; /* Center align vertically */
  gap: 10px; /* Gap between buttons */
}

.pagination-controls button {
  padding: 8px 16px; /* Button padding */
  background-color: #007bff; /* Button color */
  color: #fff; /* Text color */
  border: none; /* Remove border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.pagination-controls button:disabled {
  background-color: #ddd; /* Disabled button color */
  cursor: not-allowed; /* Not-allowed cursor */
}

.pagination-controls button:hover:not(:disabled) {
  background-color: #0056b3; /* Hover effect */
}
</style>
