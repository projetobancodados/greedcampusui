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
  const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return response;
}