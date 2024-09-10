<template>
  <div v-if="cardDetails" class="image-details-modal" @click="this.$emit('close')">
    <div class="modal-content" @click.stop>
      <span class="close-button" @click="this.$emit('close')">&times;</span>
      <div v-if="cardDetails.Title !== ''" 
      class="card-details-container">
        <img :src="cardDetails.Card_Img" :alt="cardDetails.Title" class="modal-image" />
        <div class="card-details">
          <h3>{{ cardDetails.Title }}</h3>
          <p><b>Difficulty:</b> {{ cardDetails.Difficulty_Description }}</p>
          <p><b>Quantity:</b> {{ cardDetails.Quantity }}</p>
          <p><b>Description:</b> {{ cardDetails.Description }}</p>
          
          <button v-if="hunterData && !isBuyList && cardDetails.Quantity > 0"
          @click="openCardChallenge" class="btn btn-challenge">
            Challenge!
          </button>

          <button v-if="hunterData && isBuyList" @click="openCardBuy" class="btn btn-challenge">
            Buy!
          </button>

          <CardChallengeModalVue
            v-if="showCardChallenge"
            :cardDetails="cardDetails"
            :hunterData="hunterData"
            @close="closeCardChallenge"
          />

          <CardBuyModalVue 
            v-if="showCardBuy"
            :ownerData="hunterData"
            :cardDetails="cardDetails"
            @close="closeCardBuy"
          />

        </div>
      </div>
      <div v-if="hunterData && !isBuyList && cardDetails.Title !== '' && cardDetails.Quantity == 0">
        <h3>All cards already taken! Go Hunt on Campus Map!</h3>
      </div>
      <div v-if="cardDetails.Title === ''">
        <h3 v-if="hunterData && !isBuyList">You don't have enough Jenny to buy this card...</h3>
        <h3 v-if="hunterData && isBuyList">This Hunter doesn't have this card!</h3>
        <h3 v-if="!hunterData">You don't have this card yet...</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import CardChallengeModalVue from '../card-challenge/CardChallengeModal.vue';
import CardBuyModalVue from '../card-challenge/CardBuyModal.vue';

export default {
  components: {
    CardChallengeModalVue,
    CardBuyModalVue,
  },
  props: {
    cardDetails: {
      type: Object,
      required: false,
    },
    hunterData: {
      type: Object,
      required: false,
    },
    isBuyList: {
      type: Boolean,
      required: false,
    },
  },
  setup() {
    // console.log(props.isBuyList);
    const showCardChallenge = ref(false);
    const openCardChallenge = () => {
      showCardChallenge.value = true;
    };

    const closeCardChallenge = () => {
      showCardChallenge.value = false;
    };

    const showCardBuy = ref(false);
    const openCardBuy = () => {
      showCardBuy.value = true;
    };

    const closeCardBuy = () => {
      showCardBuy.value = false;
    };

    return {
      showCardChallenge,
      openCardChallenge,
      closeCardChallenge,
      showCardBuy,
      openCardBuy,
      closeCardBuy,
    };
  },
}
</script>

<style scoped>
.image-details-modal {
  position: fixed; /* Fixed position for modal */
  top: 0; /* Top of the page */
  left: 0; /* Left of the page */
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
  display: flex; /* Flexbox for centering */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  z-index: 1000; /* Above all other content */
}

.modal-content {
  background-color: #fff; /* White background */
  padding: 20px; /* Padding around content */
  border-radius: 8px; /* Rounded corners */
  width: 90%; /* Max width */
  max-width: 600px; /* Limit width */
  position: relative; /* Relative positioning */
}

.card-details-container {
  display: flex;
  flex-direction: row;
}

.card-details {
  display: flex;
  flex-direction: column;
}

.modal-image {
  width: 50%; /* Full width */
  height: auto; /* Maintain aspect ratio */
  margin: 0px 15px 0px 0px; /* Space below image */
  border-radius: 8px; /* Rounded corners */
}

.btn-challenge {
  background-color: #43d943;
  border-radius: 10px;
  border-width: 0.5px;
  padding: 5px 10px;
  font-size: 20px;
}

.btn-challenge:hover {
  background-color: #e36664;
  cursor: pointer;
}

.close-button {
  position: absolute; /* Absolute positioning */
  top: 10px; /* Top offset */
  right: 10px; /* Right offset */
  font-size: 24px; /* Font size */
  color: #333; /* Color */
  cursor: pointer; /* Pointer cursor */
}
</style>