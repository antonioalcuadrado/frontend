import { writable, get } from "svelte/store"

export const useFetch = (url, options) => {
    const data = writable(null)
    const loading = writable(true)
    const error = writable(null)

    async function fetchData() {
        try {
            const response = await fetch(url, options)
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const json  = await response.json()
            data.set(json)
        } catch (err) {
            error.set(err) 
        } finally {
            loading.set(false)
        }
    }

    fetchData()

    return { data, loading, error }
}
