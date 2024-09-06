<template>
  <h2>{{ bookCards }}</h2>
</template>

<script>
// import { onMounted, ref } from 'vue';
export default {
  props: {
    bookCards:{
      type: Array,
      required: false,
    }
  },
  // setup(props) {
  //   console.log(props.bookCards);
  //   const cards = ref(props.bookCards);
  //   const generateSlots = () => {
  //     for(let i=0;i<100;i++) {
  //       let slotNumber = generateSlotNumber(i);
  //       let j = 0;
  //       for(j=0;j<cards.length();j++) {
  //         if (cards[j].Slot_Number === slotNumber) {
  //           break;
  //         }
  //       }
  //       if (j < cards.length()) {
  //         cards[i].Card_Image = require(`@/assets/gc-cards/${slotNumber}.png`);
  //       } else {
  //         cards[i].Card_Image = require(`@/assets/gc-cards/${slotNumber}-empty.png`);
  //       }
  //     }
  //   };

  //   const generateSlotNumber = (number) => {
  //     if (number < 10) {
  //       return "00" + number;
  //     }
  //     return "0" + number;
  //   };

  //   onMounted(generateSlots);
  // }
};
</script>

<style scoped>

</style>
