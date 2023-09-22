<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    syncUserData,
    privateKey,
    username,
    currentSession,
  } from "../shared/user";
  import Button from "./Button.svelte";

  const changeUsername = async (): Promise<void> => {
    const api: string = "http://localhost:3000";
    await fetch(`${api}/change-username`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ privateKey: $privateKey, username: $username }),
    });
  };

  const deleteAccount = async (): Promise<void> => {
    const api: string = "http://localhost:3000";
    await fetch(`${api}/delete-account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ privateKey: $privateKey }),
    });
    $privateKey = "";
    $currentSession = "";
    localStorage.removeItem("privateKey");
    localStorage.removeItem("currentSession");
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    goto("/login");
  };
</script>

<div id="content-wrapper">
  <div id="user">
    <div class="block" />
    <div id="nickname">{$username}</div>
    <Button
      message="Save"
      isActive={true}
      link="none"
      on:click={async () => {
        if ($username.startsWith("$")) {
          await changeUsername();
          await syncUserData();
        }
      }}
    />
  </div>
  <div id="information">
    <div id="username">
      <h3>Username</h3>
      <input
        type="text"
        name="username"
        id="username-input"
        bind:value={$username}
      />
    </div>
    <Button
      message="Delete account"
      isActive={true}
      link="none"
      on:click={deleteAccount}
    />
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

  #username {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    height: 100px;
    text-align: center;
  }

  .block {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: #06d6a0;
    margin-right: 10px;
  }

  h3 {
    font-size: 2rem;
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
