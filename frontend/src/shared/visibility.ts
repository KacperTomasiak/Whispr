import { writable, type Writable } from "svelte/store";

export let isVisible: Writable<boolean> = writable(false);
export let showPopup: Writable<boolean> = writable(false);
