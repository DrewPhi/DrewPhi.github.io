import { readable, writable } from 'svelte/store';

export const lines = writable(["","","",""]);
export const flying = writable(false);