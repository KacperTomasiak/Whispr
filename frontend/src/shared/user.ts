import { writable, type Writable } from "svelte/store";

export let privateKey: Writable<string> = writable("");
export let username: Writable<string> = writable("");
export let accountAge: Writable<number> = writable(0);
export let numberOfSessions: Writable<number> = writable(0);
export let sessions: Writable<string[]> = writable([]);
export let currentSession: Writable<string> = writable("");
export let messages: Writable<Message[]> = writable([]);

type Message = {
  session: string;
  privateKey: string;
  username: string;
  message: string;
  messageTime: string;
};

export const getUserData = async (): Promise<any> => {
  const api: string = "http://localhost:3000";
  let response = await fetch(`${api}/user`, {
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
