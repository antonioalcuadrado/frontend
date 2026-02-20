// src/hooks/hallss.js
import { PUBLIC_API_URL } from '$env/static/public'
const BASE_URL = `${PUBLIC_API_URL}halls`; // Adjust to your backend URL

// Fetch all halls
export async function fetchAllHalls() {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch halss');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching halls:', err);
    throw err;
  }
}
