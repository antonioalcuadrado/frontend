// src/hooks/subjects.js

const BASE_URL = 'http://127.0.0.1:8000/courses'; // Adjust to your backend URL

// Fetch all subjects
export async function fetchSubjectsByCourse(id) {
  console.log(id)
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
