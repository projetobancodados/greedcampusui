// Register user
export async function registerUserAPI(formData) {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/hunter/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  return response;
}

// Get user by username
export async function getUserByUsernameAPI() {
  const response = await fetch(
    `${process.env.VUE_APP_API_URL}/hunter/username/${localStorage.getItem('access_token')}`
  );
  return response;
}

// Get user by id
export async function getUserByIdAPI(hunter_id) {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/hunter/${hunter_id}`);
  return response;
}

// Delete user
export async function deleteUserAPI(hunter_id) {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/hunter/delete/${hunter_id}`, {
    method: 'DELETE'
  });
  return response;
}

// Log user
export async function logUserAPI(formData) {
  // console.log(formData);
  const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return response;
}

// Get all users
export async function getAllUsers() {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/hunter/all`);
  return response;
}

// Get locations
export async function getAllLocations() {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/locations`);
  return response;
}

// Get types question
export async function getAllTypesQuestion() {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/typesquestion`);
  return response;
}

// Get all cards
export async function getAllGameCards (hunter_id) {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/cards/${hunter_id}`);
  return response;
}

// Get cards by hunter id
export async function getAllHunterCards(hunter_id) {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/cards/book/${hunter_id}`)
  return response;
}

// Get question by type and difficulty
export async function getQuestionByTypeAndDifficulty(type_question_id, difficulty_code) {
  const response = await fetch(`
    ${process.env.VUE_APP_API_URL}/question/${type_question_id}/${difficulty_code}`
  );
  return response;
}

// Add answer
export async function addAnswer(answerData, hunter_id, card_id, question_id, card_value) {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/answer/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: answerData.Answer,
      hunter_id: hunter_id,
      card_id: card_id,
      question_id: question_id,
      jenny_value: card_value
    }),
  });
  return response;
}

// Buy from another hunter
export async function buyfromHunter(hunter_id_from, hunter_id_to, card_id) {
  const response = await fetch(`${process.env.VUE_APP_API_URL}/cards/trade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hunter_id_from: hunter_id_from,
      hunter_id_to: hunter_id_to,
      card_id: card_id
    }),
  });
  return response;
}