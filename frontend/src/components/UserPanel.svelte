<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentSession, privateKey, username } from "../shared/user";

  const logOut = async (): Promise<void> => {
    $privateKey = "";
    $currentSession = "";
    localStorage.removeItem("privateKey");
    localStorage.removeItem("currentSession");
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    goto("/login");
  };

  export let option: string;
</script>

<div id="user-panel">
  <a href="/profile" id="user">
    <div id="profile-picture" />
    <div id="nickname">{$username}</div>
  </a>
  <a class:active={option == "profile"} href="/profile" id="profile"
    ><i class:active={option == "profile"} class="fa-solid fa-user" />Profile</a
  >
  <a class:active={option == "settings"} href="settings" id="settings"
    ><i
      class:active={option == "settings"}
      class="fa-solid fa-gear"
    />Settings</a
  >
  <a id="log-out" on:click={logOut}
    ><i class="fa-solid fa-right-from-bracket" />Log Out</a
  >
</div>

<style>
  #user-panel {
    width: 80%;
    height: 250px;
    background-color: var(--third-color);
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    font-size: 2rem;
    border-radius: 20px;
  }

  #profile-picture {
    width: 35px;
    height: 35px;
    background-color: var(--first-color);
    border-radius: 10px;
    margin-right: 10px;
  }

  #nickname {
    font-size: 2rem;
    margin-left: 10px;
  }

  #user {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #user:hover {
    text-decoration: none;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    color: var(--first-color);
    cursor: pointer;
  }

  a:hover > i {
    color: var(--first-color);
  }

  a.active {
    text-decoration: underline;
    color: var(--first-color);
  }

  i.active {
    color: var(--first-color);
  }

  i {
    margin-right: 10px;
  }

  .fa-right-from-bracket {
    rotate: 180deg;
  }
</style>
