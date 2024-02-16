import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

export let isVisible: Writable<boolean> = writable(false);
export let showPopup: Writable<boolean> = writable(false);
export let activeTheme: Writable<number> = writable(
  browser && localStorage.activeTheme != undefined
    ? localStorage.activeTheme
    : 0
);
