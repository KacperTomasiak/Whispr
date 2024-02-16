<script lang="ts">
  import {
    currentSession,
    privateKey,
    messages,
    syncUserData,
  } from "../shared/user";
  import io from "socket.io-client";
  import Button from "./Button.svelte";
  import Message from "./Message.svelte";

  const socket = io("http://localhost:3000");
  let message: any;

  const sendMessage = async (): Promise<void> => {
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
      }),
    });
    socket.emit("session", $currentSession);
    message = "";
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
</script>

<div id="session-title">
  {$currentSession}
  <i class="fa-solid fa-right-from-bracket" on:click={leaveSession} />
</div>
<div id="chat">
  {#each $messages as message}
    {#key $messages}
      <Message
        message={message.message}
        username={message.username}
        key={message.privateKey}
        messageTime={message.messageTime
          .toString()
          .slice(0, 19)
          .replace("T", " ")}
      />
    {/key}
  {/each}
</div>
<div id="message">
  <input
    type="text"
    name="messageInput"
    id="message-input"
    placeholder="Type your message here..."
    bind:value={message}
    on:keydown={async (e) => {
      if (e.key == "Enter" && message != undefined && message != "") {
        await sendMessage();
      }
    }}
  />
  <Button
    message="Send"
    isActive={true}
    link="none"
    on:click={async () => {
      if (message != undefined && message != "") await sendMessage();
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
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
  }

  #message {
    width: 80%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  #message-input {
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
    margin: 0px 0px 0px auto;
  }
</style>
