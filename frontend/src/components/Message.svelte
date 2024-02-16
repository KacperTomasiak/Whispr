<script lang="ts">
  import { onMount } from "svelte";
  import {
    currentSession,
    isReplying,
    messageId,
    references,
    privateKey,
    messages,
  } from "../shared/user";
  import { io } from "socket.io-client";

  export let id: number;
  export let message: string;
  export let username: string;
  export let key: string;
  export let reference: number;
  export let messageTime: string;
  export let edited: boolean;
  export let attachments: string;

  const socket = io("http://localhost:3000");
  let showOptions: boolean = false;
  let isBeingEdited: boolean = false;
  let element: any;

  const scrollToElement = (index: number): void => {
    $references[index].$$.ctx[10].parentElement.parentElement.scrollIntoView({
      behavior: "smooth",
    });
  };

  const editMessage = async (): Promise<void> => {
    const api: string = "http://localhost:3000";
    await fetch(`${api}/edit-message`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        session: $currentSession,
        message: message,
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
        id: id,
      }),
    });
    socket.emit("change", true);
    showOptions = false;
  };

  const downloadFile = async (file: string): Promise<void> => {
    const api: string = "http://localhost:3000";
    const response = await fetch(`${api}/download-file/${id}/${file}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.blob();
    const url = window.URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.slice(0, file.length - 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  onMount(() => {
    element.style.height = element.scrollHeight + "px";
  });
</script>

<div class="container" class:my-message-container={key == $privateKey}>
  {#if reference != 0}
    {#each $messages as message}
      {#if message.id == reference}
        <div
          class="mini-wrapper"
          class:my-message-wrapper={message.privateKey == $privateKey}
          on:click={() => scrollToElement(reference)}
        >
          {message.message}
        </div>
      {/if}
    {/each}
  {/if}
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
      <i
        class="fa-solid fa-ellipsis-vertical"
        class:my-message={key == $privateKey}
        on:click={() => (showOptions = !showOptions)}
      />
      {#if edited == true}
        <div id="status" class:my-message={key == $privateKey}>Edited</div>
      {/if}
      {#if attachments != ""}
        {#each attachments.split(",") as attachment}
          <div class="attachment">
            {attachment}<i
              class="fa-solid fa-file-arrow-down"
              class:my-message={key == $privateKey}
              on:click={(e) => downloadFile(e.target.parentElement.textContent)}
            />
          </div>
        {/each}
      {/if}
      {#if key == $privateKey && showOptions == true}
        <div class="options my-message">
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
      {:else if key != $privateKey && showOptions == true}
        <div class="options">
          <div
            class="option"
            on:click={() => {
              $messageId = id;
              $isReplying = true;
            }}
          >
            Reply
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 50%;
    min-width: 250px;
    width: auto;
    height: auto;
    margin: 20px auto 20px 20px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }

  .wrapper {
    padding: 10px 20px;
    border-radius: 15px;
    color: white;
    background-color: var(--third-color);
  }

  .mini-wrapper {
    max-width: 50%;
    font-size: 1.8rem;
    padding: 8px 16px;
    border-radius: 10px;
    color: white;
    background-color: var(--third-color);
    word-wrap: break-word;
    opacity: 0.8;
    cursor: pointer;
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
    position: relative;
  }

  #status {
    width: 100%;
    text-align: right;
    font-size: 1.5rem;
    color: white;
    margin-top: 5px;
  }

  .attachment {
    color: inherit;
    margin: 10px 0px;
  }

  .options {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
  }

  .option {
    color: var(--third-color);
    font-size: 1.8rem;
    margin: 10px 20px 0px;
    cursor: pointer;
    color: inherit;
  }

  .option:hover {
    opacity: 0.8;
  }

  .my-message-container {
    margin: 20px 20px 20px auto;
    align-items: flex-end;
  }

  .my-message-wrapper {
    background-color: var(--first-color);
    color: var(--second-color);
  }

  .my-message {
    color: var(--second-color) !important;
  }

  textarea {
    height: 0px;
    background-color: transparent;
    color: white;
    font-size: 2.2rem;
    margin-right: 10px;
    border: none;
    outline: none;
    resize: none;
    overflow: none;
  }

  i {
    color: white;
    margin: 0px 0px 0px auto;
    cursor: pointer;
    position: absolute;
    right: 0px;
  }
</style>
