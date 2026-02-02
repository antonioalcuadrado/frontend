// src/hooks/schedules.js

const BASE_URL = 'http://127.0.0.1:8000/subjects'; // Adjust to your backend URL

// Fetch all custom schedules
export async function fetchSchedules(subjects_id) {
  try {
    const params = new URLSearchParams();
    subjects_id.forEach(id => params.append("subjects_id", id));

    const response = await fetch(`http://localhost:8000/schedules?${params}`)
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
