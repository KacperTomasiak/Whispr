<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { currentSession, messages } from "../shared/user";
  import io from "socket.io-client";
  import { slide } from "svelte/transition";

  export let title: string;

  const socket = io("http://localhost:3000");
  let element: any;
  let notification: any;

  const setCurrentSession = (): void => {
    $currentSession = element;
    localStorage.currentSession = $currentSession;
    goto("/");
  };

  const getMessages = async (): Promise<void> => {
    const api: string = "http://localhost:3000";
    let response = await fetch(`${api}/get-message/${$currentSession}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    $messages = result;
  };

  socket.on("data", async (session: string): Promise<void> => {
    if (session == $currentSession && element == $currentSession) {
      await getMessages();
      notification.play();
    }
  });

  socket.on("change", async (): Promise<void> => {
    await getMessages();
  });

  onMount(async () => {
    await getMessages();
  });
</script>

<div
  class:active={element == $currentSession}
  transition:slide={{ delay: 200, duration: 200, axis: "y" }}
  bind:innerHTML={element}
  on:click={async () => {
    setCurrentSession();
    await getMessages();
  }}
  contenteditable="false"
>
  {title}
</div>
<audio controls bind:this={notification}>
  <source src="/sounds/notification.mp3" type="audio/mpeg" />
</audio>

<style>
  div {
    width: 80%;
    height: 60px;
    border-radius: 15px;
    background-color: var(--third-color);
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 10px;
    padding: 10px;
  }

  .active {
    color: var(--first-color);
  }

  div:hover {
    opacity: 0.8;
  }

  audio {
    display: none;
  }
</style>
