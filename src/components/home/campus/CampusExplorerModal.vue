<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <CampusExplorerVue
        :locations="locations"
      />
    </div>
  </div>
</template>

<script>
import CampusExplorerVue from './CampusExplorer.vue';
export default {
  props: {
    locations: {
      type: Array,
      required: true,
    }
  },
  components: {
    CampusExplorerVue,
  },
  // setup(props) {
  //   console.log(props.locations);
  // },
  methods: {
    close() {
      this.$emit('close');
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
  height: 80%;
  width: 100%;
  max-width: 1000px;
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