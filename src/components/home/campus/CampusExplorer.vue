<template>
  <div class="fixed-container">

    <div class="campus-explorer-container" ref="campusExplorerContainer">
      <img 
      :src="require('@/assets/campus-map.png')" 
      alt="Interactive Map" ref="interactiveImage" class="responsive-image" />
      <!-- Interactive Points -->
      <div
        v-for="(location) in locations"
        :key="location.Location_Id"
        :style="{ top: location.Yaxis + '%', left: location.Xaxis + '%' }"
        class="marker"
        @click="handlePointClick(location)"
      >
        ●
      </div>
    </div>
    
  </div>
</template>

<script>
import Panzoom from '@panzoom/panzoom';

export default {
  props: {
    locations: {
      type: Array,
      required: true,
    }
  },
  // data() {
  //   return {
  //     points: [
  //       { x: 71, y: 37, id: 1 },
  //     ],
  //   };
  // },
  methods: {
    handlePointClick(point) {
      alert(`Clicked on point ${point.Description}`);
      // Implement your interaction logic here
    },
  },
  mounted() {
    const panzoomInstance = Panzoom(this.$refs.campusExplorerContainer, {
      maxScale: 5,
      contain: 'outside', // Ensures the image is contained within the container
      startX: 0,
      startY: 0,
    });
    this.$refs.campusExplorerContainer.addEventListener('wheel', panzoomInstance.zoomWithWheel);
  },
};
</script>

<style scoped>
.fixed-container {
  width: 100%; /* Fixed width */
  height: 100%; /* Fixed height */
  overflow: hidden; /* Ensures the image does not overflow out of the container */
  position: relative; /* Relative positioning to position elements correctly */
  border: 1px solid #ddd; /* Optional border for visibility */
  margin: 5px auto; /* Center the container horizontally */
}

.campus-explorer-container {
  position: absolute; /* Allows for absolute positioning of the image and markers */
  width: 100%; /* Takes up full container width */
  height: 100%; /* Takes up full container height */
  /* top: 50%;
  left: 50%; */
  transform: translate(-50%, -50%); /* Center the image-container */
}

.responsive-image {
  width: 100%; /* Responsive width */
  height: 100%; /* Maintain aspect ratio */
  display: block; /* Removes bottom margin space */
  cursor: grab; /* Show a grabbing cursor for panning */
}

.marker {
  position: absolute;
  width: 20px; /* Adjust size */
  height: 20px; /* Adjust size */
  background-color: greenyellow;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%); /* Center the point */
}
</style>