import { writable } from 'svelte/store'

export const buildingStore = writable("default")
export const openFloorsStore = writable([false, false, false])
