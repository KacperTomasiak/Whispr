<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { currentSession, messages } from "../shared/user";
  import io from "socket.io-client";
  import { slide } from "svelte/transition";
  import Notification from "$lib/assets/notification.mp3";

  export let title: string;

  const socket = io("http://localhost:3000");
  let element: any;
  let notification: any;

  const setCurrentSession = (): void => {
    $currentSession = element.innerHTML;
    localStorage.currentSession = $currentSession;
    goto("/");
  };

  const getMessages = async (): Promise<void> => {
    const api: string = "http://localhost:3000";
    let response = await fetch(`${api}/get-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: $currentSession,
      }),
    });
    const result = await response.json();
    $messages = result;
  };

  socket.on("message", async (): Promise<void> => {
    await getMessages();
    notification.play();
  });

  onMount(async () => {
    if (localStorage.currentSession != undefined) {
      $currentSession = localStorage.currentSession;
      await getMessages();
    }
  });
</script>

<div
  transition:slide={{ delay: 200, duration: 200, axis: "y" }}
  bind:this={element}
  on:click={async () => {
    setCurrentSession();
    await getMessages();
  }}
>
  {title}
</div>
<audio controls bind:this={notification}>
  <source src={Notification} type="audio/mpeg" />
</audio>

<style>
  div {
    width: 80%;
    height: 60px;
    border-radius: 15px;
    background-color: #181d20;
    color: #06d6a0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 10px;
    padding: 10px;
  }

  div:hover {
    opacity: 0.8;
  }

  audio {
    display: none;
  }
</style>
