// src/hooks/subjects.js
import { PUBLIC_API_URL } from '$env/static/public'
const BASE_URL = `${PUBLIC_API_URL}courses`; // Adjust to your backend URL

// Fetch all subjects
export async function fetchSubjectsByCourse(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}/subjects`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch subjects');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching subjects:', err);
    throw err;
  }
}
