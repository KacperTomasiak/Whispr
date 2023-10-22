import { browser } from "$app/environment";
import { get, writable, type Writable } from "svelte/store";

export let privateKey: Writable<string> = writable(
  browser && localStorage.privateKey != undefined ? localStorage.privateKey : ""
);
export let username: Writable<string> = writable("");
export let accountAge: Writable<number> = writable(0);
export let numberOfSessions: Writable<number> = writable(0);
export let sessions: Writable<string[]> = writable([]);
export let currentSession: Writable<string> = writable(
  browser && localStorage.currentSession != undefined
    ? localStorage.currentSession
    : ""
);
export let messages: Writable<Message[]> = writable([]);
export let isReplying: Writable<boolean> = writable(false);
export let messageId: Writable<number> = writable(0);
export let references: Writable<any> = writable([]);

type Message = {
  id: number;
  session: string;
  privateKey: string;
  username: string;
  message: string;
  reference: number;
  messageTime: string;
  edited: boolean;
};

export const getUserData = async (): Promise<any> => {
  const api: string = "http://localhost:3000";
  let response = await fetch(`${api}/user/${get(privateKey)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let result = await response.json();
  return result;
};

export const syncUserData = async (): Promise<void> => {
  let result = await getUserData();
  privateKey.set(result.privateKey);
  username.set(result.username);
  accountAge.set(result.accountAge);
  numberOfSessions.set(result.numberOfSessions);
  sessions.set(result.sessions);
};
