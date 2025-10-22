import { env } from '$env/dynamic/public'

export const getCourse = async () => {
    try{
        const response = await fetch(`${env.PUBLIC_URL}/courses`, )

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error || response.statusText)
        }

        const courses = await response.json()
        console.log("Courses: ", courses)

        return courses
    } catch (error) {
        throw new Error(error)
    }
}

export const postCourse = async (name, code, description) => {
    try {
        const course_data = {
            name: name,
            code: code,
            description: description
        }
        console.log(course_data)

        const response = await fetch(`${env.PUBLIC_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course_data)
        })

        if (response.status === 500) {
            throw new Error('Internal Server Error')
        } else if (!response.ok) {
            const data = await response.json()
            throw new Error(data || response.statusText)
        } else {
            const data = await response.json()
            console.log(data)
        }
    } catch (error) {
        throw new Error(error)
    }
}
