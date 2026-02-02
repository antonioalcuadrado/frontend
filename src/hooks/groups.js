// src/hooks/subjects.js
import { PUBLIC_API_URL } from '$env/static/public'
const BASE_URL = `${PUBLIC_API_URL}groups`; // Adjust to your backend URL

// Fetch all groups
export async function fetchGroups() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch groups');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching groups:', err);
    throw err;
  }
}

// Fetch all lectures for a group in one semester
export async function fetchLecturesByGroup(id, semester) {
    try {
        const params = new URLSearchParams();
        params.append("cuatrimester", semester);

        const response = await fetch(`${BASE_URL}/${id}/lectures?${params}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch lectures from group');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching lectures from groups:', error);
        throw err;
    }
}
