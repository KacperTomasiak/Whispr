<script lang="ts">
  import { goto } from "$app/navigation";
  import { username } from "../shared/user";

  const logOut = async (): Promise<void> => {
    const api: string = "http://localhost:3000";
    fetch(`${api}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    background-color: #181d20;
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
    background-color: #06d6a0;
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
    color: #06d6a0;
    cursor: pointer;
  }

  a:hover > i {
    color: #06d6a0;
  }

  a.active {
    text-decoration: underline;
    color: #06d6a0;
  }

  i.active {
    color: #06d6a0;
  }

  i {
    margin-right: 10px;
  }

  .fa-right-from-bracket {
    rotate: 180deg;
  }
</style>
