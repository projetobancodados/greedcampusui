<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="this.$emit('close')">&times;</span>
      <div v-if="hunterGameData">

        <div v-if="!showSudoku">
          <p>You have {{ hunterGameData.Jenny_Qtd }} Jennys!</p>
          <h3>Obtain more Jenny solving a sudoku!</h3>
          <button @click="toggleSudoku" class="btn btn-sudoku">Show Sudoku</button>
        </div>

        <div v-if="showSudoku">
          <button @click="toggleSudoku" class="btn btn-sudoku">Hide Sudoku</button>
          <p>{{ puzzleBoard }}</p>
        </div>

      </div>
      <div ref="countdownSudoku"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getUserByIdAPI } from '@/api';
import { 
  generateSudokuBoard, 
  createPuzzle} from '@/sudoku-generator';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const hunterData = ref(props.data);
    const showSudoku = ref(false);
    const hunterGameData = ref(null);
    const solvedBoard = ref([[]]);
    const puzzleBoard = ref([[]]);

    const countdownSudoku = ref(null);
    // const remainingTime = ref(0);

    const getHunterStats = async () => {
      const hunter_id = hunterData.value.Hunter_Id;
      if (hunter_id) {
        try {
          const response = await getUserByIdAPI(hunter_id);
          const data = await response.json()
          if (data) {
            hunterGameData.value = data;
          }
        }catch(error) {
          console.log('Error fetching hunter by id ' + error);
        }
      }
    }

    onMounted(() => {
      getHunterStats();
    });


    const toggleSudoku = () => {
      showSudoku.value = !showSudoku.value;
      if (showSudoku.value) {
        solvedBoard.value = generateSudokuBoard();
        puzzleBoard.value = createPuzzle(solvedBoard.value, 10);

        const countdownElement = document.createElement('div');
        countdownElement.id = 'countdown';
        countdownElement.style.fontSize = '40px';
        countdownSudoku.value.appendChild(countdownElement);

        startCountdown(1000);
      } else {
        const countDownElement = document.getElementById('countdown');
        if (countDownElement) {
          countDownElement.remove();
        }
      }
    };

    const startCountdown = (duration) => {
      let timer = duration;
      const display = document.getElementById('countdown');
      
      const countdown = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timer <= 0) {
          clearInterval(countdown);
          alert("Time's up!");
        }

        timer--;

      }, 1000);
    }

    return {
      hunterGameData,
      showSudoku,
      puzzleBoard,
      countdownSudoku,
      getHunterStats,
      toggleSudoku
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

.btn {
  background-color: #61dafb;
  border: none;
  padding: 10px 20px;
  color: #20232a;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

</style>