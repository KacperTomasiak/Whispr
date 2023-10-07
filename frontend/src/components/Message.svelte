<script lang="ts">
  import { privateKey } from "../shared/user";

  export let message: string;
  export let username: string;
  export let key: string;
  export let messageTime: string;
</script>

<div class="wrapper" class:user={key == $privateKey}>
  <div id="details">
    <div id="username">{username}</div>
    <div id="time">{messageTime}</div>
  </div>
  <div id="message-box">
    {message}
  </div>
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

  .user {
    background-color: var(--first-color);
    color: var(--second-color);
    margin: 20px 20px 20px auto;
  }
</style>
