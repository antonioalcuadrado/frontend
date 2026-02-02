// src/lib/api/degrees.js
import { PUBLIC_API_URL } from '$env/static/public'
const BASE_URL = `${PUBLIC_API_URL}degrees`; // Adjust to your backend URL

// Fetch all degrees
export async function fetchDegrees() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch degrees');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching degrees:', err);
    throw err;
  }
}

// Fetch a single degree by ID
export async function fetchDegreeById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch degree');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error fetching degree with ID ${id}:`, err);
    throw err;
  }
}
