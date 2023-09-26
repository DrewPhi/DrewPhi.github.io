import { readable, writable } from 'svelte/store';


export const lines = writable(["", "", "", ""]);
export const page = writable(0);

