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