import { writable, type Writable } from "svelte/store";

export let isVisible: Writable<boolean> = writable(false);
