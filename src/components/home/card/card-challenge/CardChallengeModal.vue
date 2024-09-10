<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="this.$emit('close')">&times;</span>
      <div v-if="challengeQuestion">
        <h3>{{ challengeQuestion.Statement }}</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="answer-question">Send your answer!</label>
            <input type="text" id="answer-question" v-model="formData.Answer" required />
            <button type="submit" class="btn submit-btn">GO!</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { addAnswer, getQuestionByTypeAndDifficulty } from '@/api';
export default {
  props: {
    cardDetails: {
      type: Object,
      required: true,
    },
    hunterData: {
      type: Object,
      required: true,
    }
  },
  setup(props, { emit }) {
    const challengeQuestion = ref(null);

    const getChallengeQuestion = async () => {
      try {
        const response = await getQuestionByTypeAndDifficulty(
          props.hunterData.Type_Question, props.cardDetails.Difficulty_Code
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        let randomQuestion = await response.json();
        if (randomQuestion) {
          challengeQuestion.value = randomQuestion;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const formData = ref({
      Answer: ""
    });

    const handleSubmit = async () => {
      try {
        const response = await addAnswer(
          formData.value,
          props.hunterData.Hunter_Id,
          props.cardDetails.Card_Id,
          challengeQuestion.value.Question_Id,
          props.cardDetails.Card_Value);
        if (!response.ok) {
          throw new Error('Failed to add answer');
        }
        let newAnswerId = await response.json();
        if (newAnswerId) {
          alert(newAnswerId.msg);
          emit('close');
        }
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(getChallengeQuestion);

    return {
      challengeQuestion,
      formData, 
      handleSubmit,
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

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit-btn {
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px 0px 5px 0px;
  color: #20232a;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #20232a;
  color: #61dafb;
}
</style>