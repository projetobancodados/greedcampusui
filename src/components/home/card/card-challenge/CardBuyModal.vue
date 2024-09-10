<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="this.$emit('close')">&times;</span>
      <div v-if="(ownerData && loggedUserData) && 
      (ownerData.Hunter_Id === loggedUserData.Hunter_Id)">
        <h2>You cannot buy from yourself...</h2>
      </div>
      <div v-if="(ownerData && loggedUserData) && 
      (ownerData.Hunter_Id !== loggedUserData.Hunter_Id)">
        <h2>Buying the card...</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { buyfromHunter, getUserByUsernameAPI } from '@/api';

export default {
  props: {
    ownerData: {
      type: Object,
      required: true,
    },
    cardDetails: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    
    const loggedUserData = ref(null);

    const fetchHunterData = async () => {
      try {
        const response = await getUserByUsernameAPI();
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        loggedUserData.value = await response.json();
        if (loggedUserData.value) {
          if (loggedUserData.value.Hunter_Id !== props.ownerData.Hunter_Id) {
            await buyFromOwner();
          }
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      } 
    };

    const buyFromOwner = async () => {
      try {
        const response = await buyfromHunter(
          props.ownerData.Hunter_Id,
          loggedUserData.value.Hunter_Id,
          props.cardDetails.Card_Id);
        if (!response.ok) {
          throw new Error('Failed to execute procedure!');
        }
        let data = await response.json();
        if (data.msg) {
          alert(data.msg);
        } 
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    onMounted(fetchHunterData);

    return {
      loggedUserData,
    };
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
</style>