import { get } from 'svelte/store'
import { fetchHallLectures, fetchHallById } from '../../../hooks/halls'
import { getSemester } from '../../../utils'

export async function load({ params }) {
    const semester = getSemester()
    const hall_lectures = await fetchHallLectures(params.id, parseInt(semester))
    const hall = await fetchHallById(params.id)

    return {
        hall_lectures,
        hall
    }
}
