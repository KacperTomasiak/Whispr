<script lang="ts">
  import { currentSession, privateKey } from "../shared/user";
  import Button from "./Button.svelte";

  let message: any;

  const sendMessage = async () => {
    const api: string = "http://localhost:3000";
    await fetch(`${api}/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privateKey: $privateKey,
        session: $currentSession,
        message: message.value,
      }),
    });
    message.value = "";
  };
</script>

<div id="session-title">{$currentSession}</div>
<div id="chat" />
<div id="message">
  <input
    type="text"
    name="messageInput"
    id="message-input"
    placeholder="Type your message here..."
    bind:this={message}
  />
  <Button
    message="Send"
    isActive={true}
    link="none"
    on:click={async () => {
      await sendMessage();
    }}
  />
</div>

<style>
  #session-title {
    width: 80%;
    height: 60px;
    font-size: 2.5rem;
    border-radius: 20px;
    background-color: #181d20;
    color: #06d6a0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 20px;
  }

  #chat {
    width: 100%;
    height: calc(100% - 60px - 40px - 40px);
    overflow-y: auto;
  }

  #message {
    width: 80%;
    height: 40px;
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
    background-color: #131516;
    color: white;
    border: 2px solid #06d6a0;
    font-size: 2rem;
    outline: none;
  }
</style>
