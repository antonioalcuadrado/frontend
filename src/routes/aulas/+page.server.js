import { fetchAllHalls } from '../../hooks/halls'

export async function load({fetch, setHeaders}) {
    const halls = await fetchAllHalls(fetch, setHeaders)

    return { halls }
}
