<script lang="ts">
  import { onMount } from "svelte";
  import { isVisible } from "../shared/visibility";
  import { syncUserData } from "../shared/user";
  import Button from "./Button.svelte";
  import UserPanel from "./UserPanel.svelte";

  export let option: string;

  onMount(async () => {
    await syncUserData();
  });
</script>

<div>
  <div id="chats">No chats...</div>
  <Button
    message="New session"
    isActive={true}
    link="none"
    on:click={() => ($isVisible = true)}
  />
  {#if option == "profile"}
    <UserPanel option="profile" />
  {:else if option == "settings"}
    <UserPanel option="settings" />
  {:else}
    <UserPanel option="none" />
  {/if}
</div>

<style>
  div {
    width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }

  #chats {
    width: 80%;
    min-height: 50px;
    height: 250px;
    font-size: 2rem;
  }
</style>
