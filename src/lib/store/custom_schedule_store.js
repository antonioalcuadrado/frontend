import { writable } from 'svelte/store';

function browserStore(key, initialValue) {
    let storedValue = initialValue;

    if (typeof localStorage !== 'undefined') {
        try {
            const raw = localStorage.getItem(key);
            storedValue = raw ? JSON.parse(raw) : initialValue;
        } catch (e) {
            console.warn('Failed to parse localStorage', e);
            storedValue = initialValue;
        }
    }

    const store = writable(storedValue);

    if (typeof localStorage !== 'undefined') {
        store.subscribe((val) => {
            localStorage.setItem(key, JSON.stringify(val));
        });
    }

    return store;
}

export const customStore = browserStore('custom', []);
