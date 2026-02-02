// src/hooks/schedules.js
import { PUBLIC_API_URL } from '$env/static/public'
const BASE_URL = `${PUBLIC_API_URL}schedules`; // Adjust to your backend URL

// Fetch all custom schedules
export async function fetchSchedules(subjects_id) {
  try {
    const params = new URLSearchParams();
    subjects_id.forEach(id => params.append("subjects_id", id));

    const response = await fetch(`${BASE_URL}?${params}`)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch schedules');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching schedules:', err);
    throw err;
  }
}
