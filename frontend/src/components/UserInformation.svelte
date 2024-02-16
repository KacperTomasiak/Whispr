<script lang="ts">
  import { syncUserData, username } from "../shared/user";
  import Button from "./Button.svelte";

  const changeUsername = async (): Promise<void> => {
    const api: string = "http://localhost:3000";
    await fetch(`${api}/change-username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: $username }),
    });
  };
</script>

<div id="content-wrapper">
  <div id="user">
    <div id="profile-picture" />
    <div id="nickname">{$username}</div>
    <Button
      message="Save"
      isActive={true}
      link="none"
      on:click={async () => {
        await changeUsername();
        await syncUserData();
      }}
    />
  </div>
  <div id="information">
    <div id="picture">
      <h3>Profile Picture</h3>
      <div class="block" />
    </div>
    <div id="username">
      <h3>Username</h3>
      <input
        type="text"
        name="username"
        id="username-input"
        bind:value={$username}
      />
    </div>
  </div>
</div>

<style>
  #content-wrapper {
    width: 100%;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }

  #user {
    width: 80%;
    height: 60px;
    border-radius: 20px;
    background-color: #181d20;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 20px;
  }

  #profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: #06d6a0;
    margin-right: 10px;
  }

  #nickname {
    font-size: 2.8rem;
    flex: 1;
  }

  #information {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  #picture,
  #username {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    height: 100px;
  }

  h3 {
    font-size: 2rem;
  }

  .block {
    background-color: #06d6a0;
    width: 65px;
    height: 65px;
    border-radius: 10px;
  }

  input {
    border: none;
    border-radius: 20px;
    background-color: #181d20;
    color: #06d6a0;
    width: 150px;
    height: 40px;
    font-size: 2rem;
    outline: none;
    text-align: center;
  }
</style>
