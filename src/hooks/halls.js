// src/hooks/hallss.js
import { PUBLIC_API_URL } from '$env/static/public'
const BASE_URL = `${PUBLIC_API_URL}halls`; // Adjust to your backend URL

// Fetch all halls
export async function fetchAllHalls(fetch, setHeaders) {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch halss');
    }
    setHeaders({ 'cache-control': 'max-age=600' })
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching halls:', err);
    throw err;
  }
}

// Fetch hall by id
export async function fetchHallById(id, fetch) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch hall by id");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error fetching hall by id:", err);
        throw err;
    }
}

// Fetch lectures from a hall
export async function fetchHallLectures(id, semester, fetch) {
    try {
        const response = await fetch(`${BASE_URL}/${id}/lectures`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to ferch hall lectures");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error fetch hall lectures:", err)
        throw err;
    }
}
