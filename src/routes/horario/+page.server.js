import { fetchCourses } from '../../hooks/courses'

export async function load({ fetch, setHeaders }) {
    const courses = await fetchCourses(fetch, setHeaders)

    return { courses }
}
