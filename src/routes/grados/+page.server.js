import { fetchGroups } from '../../hooks/groups'

export async function load({ fetch, setHeaders }) {
    const groups = await fetchGroups(fetch, setHeaders)

    return { groups }
}
