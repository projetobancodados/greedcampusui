<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {

  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
}
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
