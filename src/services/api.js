//const API_URL = "http://localhost:4000/api";//
const API_URL = "https://practica-awos.onrender.com/api";

export const api = {
  get: async (endpoint) => {
    const token = localStorage.getItem('token'); 
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Aquí mandamos el pase VIP
      }
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  },

  post: async (endpoint, body) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Aquí también mandamos el pase VIP
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  }
};