<script lang="ts">
  import {
    currentSession,
    privateKey,
    messages,
    messageId,
    isReplying,
    references,
    syncUserData,
  } from "../shared/user";
  import io from "socket.io-client";
  import Button from "./Button.svelte";
  import Message from "./Message.svelte";

  const socket = io("http://localhost:3000");
  let message: any;
  let uploadedContent: any;

  const sendMessage = async (): Promise<void> => {
    let attachments: string[] = [];
    if (uploadedContent != undefined) {
      for (let i: number = 0; i < uploadedContent.length; i++) {
        attachments.push(`${uploadedContent[i].name}`);
      }
    }
    const api: string = "http://localhost:3000";
    await fetch(`${api}/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privateKey: $privateKey,
        session: $currentSession,
        message: message,
        reference: $messageId,
        attachments: attachments,
      }),
    });
    socket.emit("session", $currentSession);
    message = "";
    $messageId = 0;
    $isReplying = false;
  };

  const leaveSession = async (): Promise<void> => {
    const api: string = "http://localhost:3000";
    await fetch(`${api}/leave-session`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privateKey: $privateKey,
        session: $currentSession,
      }),
    });
    $currentSession = "";
    localStorage.currentSession = "";
    await syncUserData();
  };

  const uploadFiles = async (): Promise<void> => {
    const formData: FormData = new FormData();
    for (let i: number = 0; i < uploadedContent.length; i++) {
      formData.append("files", uploadedContent[i], uploadedContent[i].name);
    }
    formData.append("privateKey", $privateKey);
    const api: string = "http://localhost:3000";
    await fetch(`${api}/upload-files`, {
      method: "POST",
      headers: {},
      body: formData,
    });
    uploadedContent = undefined;
  };
</script>

<div id="session-title">
  {$currentSession}
  <i class="fa-solid fa-right-from-bracket" on:click={leaveSession} />
</div>
<div id="chat">
  {#each $messages as message}
    {#key $messages}
      <Message
        id={message.id}
        message={message.message}
        username={message.username}
        key={message.privateKey}
        reference={message.reference}
        messageTime={message.messageTime
          .toString()
          .slice(0, 19)
          .replace("T", " ")}
        edited={message.edited}
        attachments={message.attachments}
        bind:this={$references[message.id]}
      />
    {/key}
  {/each}
</div>
{#if $isReplying == true || uploadedContent != undefined}
  <div class="box">
    <span
      id="close-button"
      on:click={() => {
        $messageId = 0;
        $isReplying = false;
        uploadedContent = undefined;
      }}
    >
      x
    </span>
    {#if $isReplying == true}
      {#each $messages as message}
        {#if message.id == $messageId}
          Replying to message: {message.message}
        {/if}
      {/each}
    {/if}
    {#if uploadedContent != undefined}
      Attachments: {uploadedContent.length}
    {/if}
  </div>
{/if}
<div id="message">
  <form>
    <label for="upload-button">
      <i class="fa-solid fa-file-import" />
      <input
        type="file"
        id="upload-button"
        bind:files={uploadedContent}
        multiple
        hidden
      />
    </label>
  </form>
  <input
    type="text"
    placeholder="Type your message here..."
    bind:value={message}
    on:keydown={async (e) => {
      if (e.key == "Enter" && message != undefined && message != "") {
        await sendMessage();
      }
      if (e.key == "Enter" && uploadedContent != undefined) {
        await uploadFiles();
      }
      if (e.key == "Escape") {
        $messageId = 0;
        $isReplying = false;
        uploadedContent = undefined;
      }
    }}
  />
  <Button
    message="Send"
    isActive={true}
    link="none"
    on:click={async () => {
      if (message != undefined && message != "") await sendMessage();
      if (uploadedContent != undefined) await uploadFiles();
    }}
  />
</div>

<style>
  #session-title {
    width: 80%;
    height: 60px;
    margin-bottom: 20px;
    font-size: 2.5rem;
    border-radius: 20px;
    background-color: var(--third-color);
    color: var(--first-color);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 20px;
  }

  #chat {
    width: 80%;
    height: calc(100% - 60px - 40px - 40px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
    overflow-x: hidden;
  }

  #message {
    width: 80%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .box {
    width: 80%;
    padding: 20px;
    font-size: 1.8rem;
    text-align: left;
    color: var(--first-color);
    word-wrap: break-word;
  }

  #close-button {
    margin: 0px 10px;
    font-size: 2rem;
    cursor: pointer;
  }

  input {
    width: 85%;
    height: 40px;
    border: none;
    border-radius: 20px;
    padding-left: 10px;
    background-color: var(--second-color);
    color: white;
    border: 2px solid var(--first-color);
    font-size: 2rem;
    outline: none;
  }

  i {
    font-size: 2.8rem;
    cursor: pointer;
    margin: 0px 10px 0px auto;
  }

  i:hover {
    color: var(--first-color);
  }
</style>
