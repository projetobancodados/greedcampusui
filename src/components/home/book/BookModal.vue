<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="this.$emit('close')">&times;</span>

      <div v-if="!isBuyList">
        <button @click="showMyBookCards" class="btn btn-jenny">
          <b v-if="myBookCardsVisible">Hide</b>
          <b v-if="!myBookCardsVisible">My Cards</b>
        </button>

        <button @click="showWorldBookCards" class="btn btn-jenny">
          <b v-if="worldBookCardsVisible">Hide</b>
          <b v-if="!worldBookCardsVisible">World Cards</b>
        </button>

        <div>
          <BookCardsListVue
            v-if="myBookCardsVisible"
            :bookCards="bookCards.hunter_cards"
          />
        </div>

        <div>
          <BookCardsListVue v-if="worldBookCardsVisible"
            :hunterData="hunterGameData"
            :bookCards="bookCards.game_cards"
          />
        </div>
      </div>

      <div v-if="isBuyList">
        <BookCardsListVue 
          :bookCards="bookCards.hunter_cards"
          :hunterData="hunterData"
          :isBuyList="isBuyList"
        />
      </div>

    </div>
  </div>
</template>

<script>
import BookCardsListVue from './BookCardsList.vue';
import { onMounted, ref } from 'vue';
import { getUserByIdAPI } from '@/api';

export default {
  components: {
    BookCardsListVue,
  },
  props: {
    bookCards: {
      type: Object,
      required: true,
    },
    hunterData: {
      type: Object,
      required: true,
    },
    isBuyList: {
      type: Boolean,
      required: false,
    },
  },
  setup(props) {

    const myBookCardsVisible = ref(false);
    const worldBookCardsVisible = ref(false);
    const hunterGameData = ref(null);

    const showMyBookCards = () => {
      if (worldBookCardsVisible.value) {
        worldBookCardsVisible.value = false;
      }
      myBookCardsVisible.value = !myBookCardsVisible.value;
    };

    const showWorldBookCards = () => {
      if (myBookCardsVisible.value) {
        myBookCardsVisible.value = false;
      }
      worldBookCardsVisible.value = !worldBookCardsVisible.value;
    };

    const fetchHunterData = async () => {
      const hunter_id = props.hunterData.Hunter_Id;
      if (hunter_id) {
        try {
          const response = await getUserByIdAPI(hunter_id);
          const data = await response.json()
          if (data) {
            hunterGameData.value = data;
          }
        }catch(error) {
          console.log('Error fetching hunter by id ' + error);
        }
      }
    };

    onMounted(fetchHunterData);

    return {
      hunterGameData,
      myBookCardsVisible, showMyBookCards,
      worldBookCardsVisible, showWorldBookCards
    }
  }
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

.btn-jenny {
  background-color: #43d943;
  border-radius: 10px;
  border-width: 0.5px;
  padding: 5px 10px;
  margin: 0px 5px 0px 5px;
  font-size: 20px;
}

.btn-jenny:hover {
  background-color: #e36664;
  cursor: pointer;
}
</style>