import { writable, type Writable } from "svelte/store";

export let privateKey: Writable<string> = writable("");
export let username: Writable<string> = writable("$anonymous");
