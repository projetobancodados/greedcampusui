// CHATGPT generated

// Utility function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Check if placing num in board[row][col] is valid
function isSafe(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    // Check row, column and 3x3 subgrid
    if (board[row][i] === num || board[i][col] === num || board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === num) {
      return false;
    }
  }
  return true;
}

// Backtracking function to fill the board
function fillBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let num of numbers) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Generate a full solved Sudoku board
export function generateSudokuBoard() {
  let board = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(board);
  return board;
}

// Remove cells to create a puzzle
export function createPuzzle(board, difficulty = 10) {
  const puzzle = board.map(row => row.slice());
  let attempts = difficulty;
  
  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      attempts--;
    }

  }

  return puzzle;
}

// Function to check if the puzzle is solved
// export function isPuzzleSolved(puzzle) {
//   return true;
// }
