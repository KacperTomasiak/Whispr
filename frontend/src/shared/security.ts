import { writable, type Writable } from "svelte/store";
import { get } from "svelte/store";
import { browser } from "$app/environment";
import { showPopup } from "./visibility";

export let isSet: Writable<boolean> = writable(false);
export let sessionLength: Writable<15 | 30 | 60> = writable(
  browser && localStorage.sessionLength != undefined
    ? localStorage.sessionLength
    : 60
);

export const changeSessionLength = (newSessionLength: 15 | 30 | 60): void => {
  sessionLength.set(newSessionLength);
  localStorage.sessionLength = get(sessionLength);
  let now: Date = new Date();
  let expirationDate: Date = new Date(now.getTime() + newSessionLength * 60000);
  let year: string = String(expirationDate.getFullYear());
  let day: string = String(expirationDate.getUTCDate());
  let hour: string = String(expirationDate.getUTCHours());
  let minute: string = String(expirationDate.getUTCMinutes());
  let days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (Number(hour) < 10) {
    hour = String("0" + hour);
  }
  if (Number(minute) < 10) {
    minute = String("0" + minute);
  }
  document.cookie = `auth=true; expires=${
    days[expirationDate.getDay()]
  }, ${day} ${
    months[expirationDate.getMonth()]
  } ${year} ${hour}:${minute}:00 UTC; path=/`;
  isSet.set(true);
  showPopup.set(true);
  setTimeout(() => {
    showPopup.set(false);
  }, 2000);
};
