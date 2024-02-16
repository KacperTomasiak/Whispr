<script lang="ts">
  import Button from "./Button.svelte";
  import UserPanel from "./UserPanel.svelte";

  export let option: string;
</script>

<div>
  <div id="chats">No chats...</div>
  <Button message="New session" isActive={true} link="none" />
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
