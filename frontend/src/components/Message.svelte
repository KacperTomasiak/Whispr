<script lang="ts">
  import { onMount } from "svelte";
  import { currentSession, privateKey } from "../shared/user";
  import { io } from "socket.io-client";

  export let message: string;
  export let username: string;
  export let key: string;
  export let messageTime: string;

  const socket = io("http://localhost:3000");
  let showOptions: boolean = false;
  let isBeingEdited: boolean = false;
  let element: any;

  const editMessage = async (): Promise<void> => {
    const api: string = "http://localhost:3000";
    await fetch(`${api}/edit-message`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privateKey: $privateKey,
        session: $currentSession,
        message: message,
        time: messageTime,
      }),
    });
    socket.emit("change", true);
    isBeingEdited = false;
    showOptions = false;
  };

  const deleteMessage = async (): Promise<void> => {
    const api: string = "http://localhost:3000";
    await fetch(`${api}/delete-message`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privateKey: $privateKey,
        session: $currentSession,
        time: messageTime,
      }),
    });
    socket.emit("change", true);
    showOptions = false;
  };

  onMount(() => {
    element.style.height = element.scrollHeight + "px";
  });
</script>

<div
  class="wrapper"
  class:my-message-wrapper={key == $privateKey}
  on:keydown={async (e) => {
    if (e.key == "Escape") {
      isBeingEdited = false;
      showOptions = false;
    }
    if (e.key == "Enter") {
      await editMessage();
      element.style.height = "auto";
    }
  }}
>
  <div id="details">
    <div id="username">{username}</div>
    <div id="time">{messageTime}</div>
  </div>
  <div id="message-box">
    <textarea
      class:my-message={key == $privateKey}
      bind:this={element}
      bind:value={message}
      readonly={!isBeingEdited}
    />
    {#if key == $privateKey}
      <i
        class="fa-solid fa-ellipsis-vertical"
        on:click={() => (showOptions = !showOptions)}
      />
    {/if}
  </div>
  {#if showOptions == true}
    <div id="options">
      <div
        class="option"
        on:click={() => {
          element.focus();
          isBeingEdited = true;
        }}
      >
        Edit
      </div>
      {#if isBeingEdited == true}
        <div
          class="option"
          on:click={async () => {
            await editMessage();
            element.style.height = "auto";
          }}
        >
          Save
        </div>
      {:else if isBeingEdited == false}
        <div
          class="option"
          on:click={async () => {
            await deleteMessage();
          }}
        >
          Delete
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .wrapper {
    max-width: 50%;
    min-width: 250px;
    width: auto;
    height: auto;
    padding: 10px 20px;
    margin: 20px auto 20px 20px;
    border-radius: 15px;
    color: white;
    background-color: var(--third-color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #details {
    width: 100%;
    height: auto;
    color: inherit;
    font-size: 1.4rem;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #username,
  #time {
    color: inherit;
  }

  #message-box {
    width: 100%;
    height: auto;
    color: inherit;
    font-size: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  #options {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  textarea {
    height: 0px;
    background-color: transparent;
    color: white;
    font-size: 2.2rem;
    border: none;
    outline: none;
    resize: none;
    overflow: none;
  }

  .option {
    color: var(--third-color);
    font-size: 1.8rem;
    margin: 10px 20px 0px;
    cursor: pointer;
  }

  .option:hover {
    opacity: 0.8;
  }

  .my-message-wrapper {
    background-color: var(--first-color);
    color: var(--second-color);
    margin: 20px 20px 20px auto;
  }

  .my-message {
    color: var(--second-color);
  }

  .fa-ellipsis-vertical {
    color: var(--third-color);
    margin: 0px 0px 0px auto;
    cursor: pointer;
  }
</style>
