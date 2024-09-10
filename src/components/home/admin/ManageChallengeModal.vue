<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="this.$emit('close')">&times;</span>
      <div class="scrollable-list-container">
        <ul v-if="allAnswers" class="scrollable-list">
          <li v-for="(answer, index) in allAnswers" :key="index" class="list-item">
            <p>W: {{ answer.Username }}</p>
            <p>Q: {{ answer.Statement }}</p>
            <p>A: {{ answer.Answer }}</p>
            <div>
              <button class="btn btn-jenny" @click="grandCardByAnswer(answer)">Grant</button>
              <button class="btn btn-jenny" @click="ignoreAnswer(answer)">Ignore</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllAnswersFromHunters, grantCardToHunter, removeAnswer } from '@/api';
import { onMounted, ref } from 'vue';

export default {
  props: {

  },
  setup() {
    const allAnswers = ref(null);
    const getAllAnswers = async () => {
      try {
        const response = await getAllAnswersFromHunters();
        if (!response.ok) {
          throw new Error('Failed to fetch Answers.');
        }
        let result = await response.json();
        if (result.answers) {
          allAnswers.value = result.answers;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const grandCardByAnswer = async (answer) => {
      try {
        const response = await grantCardToHunter(answer);
        if (!response.ok) {
          throw new Error('Failed to grant card');
        }
        const data = await response.json();
        if (data.msg) {
          alert(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const ignoreAnswer = async (answer) => {
      try {
        const response = await removeAnswer(answer);
        if (!response.ok) {
          throw new Error('Failed to remove answer');
        }
        const data = await response.json();
        if (data.msg) {
          alert(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(getAllAnswers);

    return {
      allAnswers,
      grandCardByAnswer,
      ignoreAnswer,
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

.btn-jenny {
  background-color: #43d943;
  border-radius: 10px;
  border-width: 0.5px;
  padding: 5px 10px;
  font-size: 15px;
}

.btn-jenny:hover {
  background-color: #e36664;
  cursor: pointer;
}

.scrollable-list-container {
  max-width: 600px; /* Max width for the container */
  width: 90%; /* Full width */
  height: px; /* Fixed height for the scrollable area */
  margin: 0 auto; /* Center align */
  border: 1px solid #ddd; /* Optional border */
  border-radius: 8px; /* Rounded corners */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Hide horizontal scrolling */
  padding: 10px; /* Padding inside the container */
  background-color: #f9f9f9; /* Background color */
}

.scrollable-list {
  list-style: none; /* Remove list styling */
  padding: 0; /* Remove default padding */
  margin: 0; /* Remove default margin */
}

.list-item {
  display: flex; /* Flexbox for horizontal layout */
  align-items: center; /* Center vertically */
  padding: 10px; /* Padding around items */
  margin-bottom: 8px; /* Space between items */
  background-color: #fff; /* White background for items */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional shadow */
  transition: background-color 0.3s; /* Smooth background change */
}

.list-item:hover {
  background-color: #e6e6e6; /* Change background on hover */
}
</style>