// src/hooks/courses.js

const BASE_URL = 'http://127.0.0.1:8000/courses'; // Adjust to your backend URL

// Fetch all courses
export async function fetchCourses() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch courses');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching courses:', err);
    throw err;
  }
}

// Fetch a single course
export async function fetchCourseById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch course');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error fetching course with ID ${id}:`, err);
    throw err;
  }
}
