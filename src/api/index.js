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