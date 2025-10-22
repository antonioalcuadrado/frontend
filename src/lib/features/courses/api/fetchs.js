import { useFetch } from '$lib/hooks/useFetch'
import { env } from '$env/dynamic/public'

export const getCourses = () => {
    return useFetch(`${env.PUBLIC_URL}/courses`)
}

export const postCourse = (name, code, description) => {
    const course_data = {
        name: name,
        code: code.toUpperCase(),
        description: description
    }

    return useFetch(`${env.PUBLIC_URL}/courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(course_data)
    })
}
