import { writable, type Writable } from "svelte/store";

export let privateKey: Writable<string> = writable("");
