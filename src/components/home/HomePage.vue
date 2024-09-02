<template>
  <div class="home-container">
    <HeaderVue />
  </div>
</template>

<script>
import HeaderVue from './Header.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderVue
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  text-align: center;
}
</style>
