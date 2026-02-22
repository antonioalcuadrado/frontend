import { get } from 'svelte/store'
import { fetchHallLectures, fetchHallById } from '../../../hooks/halls'
import { getSemester } from '../../../utils'

export async function load({ params, fetch, setHeaders }) {
    const semester = getSemester()
    const hall_lectures = await fetchHallLectures(params.id, parseInt(semester), fetch)
    const hall = await fetchHallById(params.id, fetch)

    setHeaders({'cache-control': 'max-age=1, stale-while-revalidate=30'})

    return {
        hall_lectures,
        hall
    }
}
