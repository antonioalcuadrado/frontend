import { get } from 'svelte/store'

export function load({ params }) {
    console.log("Load")

    return {
        id: params.id
    }
}
