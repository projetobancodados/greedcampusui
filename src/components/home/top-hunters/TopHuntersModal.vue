<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="this.$emit('close')">&times;</span>
      <div v-if="allHunters && allHuntersArray">
        <div class="hunter-list">
          <div class="hunter-item" v-for="(hunterItem, index) in allHuntersArray" :key="index">

            <h3><b>{{ index + 1}}.</b></h3>
            
            <div class="hunter-avatar">
              <img :src="manageAvatarImg(hunterItem.Avatar)" 
              alt="hunter avatar" class="hunter-avatar-img" />
            </div>
            
            <div class="hunter-name">
              {{ hunterItem.Username }}
            </div>
          
            <div class="hunter-jennys">
              {{ hunterItem.Cards_Qtd }}
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { binaryStrToArrayBuffer, convertBufferToImageURL } from '@/utils';
export default {
  
  props: {
    allHunters: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const allHuntersArray = ref([]);

    const manageHunters = () => {
      allHuntersArray.value = props.allHunters;
      // if (allHuntersArray.value) {}
    }

    const manageAvatarImg = (avatarImg) => {
      if (avatarImg) {
        const buffer = binaryStrToArrayBuffer(avatarImg);
        return convertBufferToImageURL(buffer);
      }
      return require('@/assets/placeholder-avatar.png');
    }

    onMounted(manageHunters);

    return {
      allHuntersArray,
      manageHunters,
      manageAvatarImg,
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
  width: 100%;
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

.hunter-list {
  width: 100%; /* Full width */
  /* max-width: 800px; */
  margin: 0 auto; /* Center align */
  padding: 10px; /* Optional padding */
}

.hunter-item {
  display: flex; /* Flexbox for alignment */
  width: 90%;
  align-items: center; /* Center vertically */
  justify-content: space-between; /* Distribute space between */
  padding: 10px; /* Spacing around each item */
  border-bottom: 1px solid #ddd; /* Optional border for separation */
  background-color: #f9f9f9; /* Optional background */
  border-radius: 8px; /* Rounded corners */
  margin-bottom: 10px; /* Spacing between items */
}

.hunter-avatar {
  flex: 0 0 auto; /* Do not grow or shrink */
  margin: 0px 10px 0px 10px; /* Space to the right of avatar */
}

.hunter-avatar-img {
  width: 50px; /* Fixed width */
  height: 50px; /* Fixed height */
  border-radius: 50%; /* Circular shape */
  border: 1px solid black;
  object-fit: cover; /* Maintain aspect ratio and fill */
}

.hunter-name {
  flex: 1; /* Take remaining space */
  text-align: center; /* Center text */
  font-weight: bold; 
}

.hunter-jennys {
  flex: 0 0 auto; /* Do not grow or shrink */
  text-align: right; /* Align to the right */
  font-size: 1.1em; /* Optional font size */
}
</style>