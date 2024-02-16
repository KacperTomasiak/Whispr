<script lang="ts">
  import { isVisible } from "../shared/visibility";
  import { privateKey, syncUserData } from "../shared/user";
  import Button from "./Button.svelte";
  import { fade } from "svelte/transition";

  let session: string = "";

  const generateSession = (): void => {
    session = "";
    let letters: string = "abcdefghijklmnopqrstuvwxyz";
    let numbers: string = "0123456789";
    let chars: string = letters + numbers;
    for (let i: number = 0; i < 7; i++) {
      for (let j: number = 0; j < 4; j++) {
        let num: number = Math.floor(Math.random() * chars.length);
        session += chars.substring(num, num + 1);
      }
      if (i < 6) session += "-";
    }
  };

  const joinSession = async (): Promise<void> => {
    const api: string = "http://localhost:3000";
    await fetch(`${api}/join-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privateKey: $privateKey,
        session: session,
      }),
    });
    await syncUserData();
    $isVisible = false;
  };
</script>

<form
  on:submit|preventDefault={joinSession}
  transition:fade={{ duration: 200 }}
>
  <div id="close-button" on:click={() => ($isVisible = false)}>x</div>
  <h2>Generate new session</h2>
  <input type="text" bind:value={session} readonly />
  <Button
    message="Generate session"
    isActive={true}
    link="none"
    on:click={(e) => {
      e.preventDefault();
      generateSession();
    }}
  />
  <h2>Join new session</h2>
  <input type="text" bind:value={session} />
  <Button message="Join session" isActive={true} link="none" />
</form>

<style>
  form {
    width: 500px;
    height: 600px;
    border-radius: 20px;
    background-color: var(--third-color);
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 50px 0px;
    position: absolute;
    z-index: 2;
    transform: translateX(150px);
  }

  #close-button {
    font-size: 5rem;
    position: absolute;
    cursor: pointer;
    top: 25px;
    right: 25px;
  }

  h2 {
    font-size: 2.4rem;
  }

  input {
    border: none;
    border-radius: 20px;
    background-color: var(--second-color);
    color: var(--first-color);
    width: 80%;
    height: 40px;
    font-size: 2rem;
    outline: none;
    text-align: center;
  }
</style>
