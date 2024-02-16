<script lang="ts">
  import { isVisible } from "../shared/visibility";
  import { currentSession } from "../shared/user";
  import UserInformation from "./UserInformation.svelte";
  import Statistics from "./Statistics.svelte";
  import Themes from "./Themes.svelte";
  import SessionLength from "./SessionLength.svelte";
  import Chat from "./Chat.svelte";
  import LoadingScreen from "./LoadingScreen.svelte";

  export let option: string;
</script>

<div class:blur={$isVisible}>
  <LoadingScreen />
  {#if option == "profile"}
    <UserInformation />
    <Statistics />
  {:else if option == "settings"}
    <Themes />
    <SessionLength />
  {:else if option == "session" && $currentSession != ""}
    <Chat />
  {/if}
</div>

<style>
  div {
    width: calc(100% - 300px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    overflow-y: auto;
  }

  .blur {
    filter: blur(8px);
    -webkit-filter: blur(8px);
  }
</style>
