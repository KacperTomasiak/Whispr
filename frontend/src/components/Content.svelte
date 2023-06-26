<script lang="ts">
  import { isVisible } from "../shared/visibility";
  import NewSession from "./NewSession.svelte";
  import UserInformation from "./UserInformation.svelte";
  import Statistics from "./Statistics.svelte";
  import Themes from "./Themes.svelte";
  import SessionLength from "./SessionLength.svelte";

  export let option: string;
</script>

<div>
  {#if $isVisible == true}
    <NewSession />
  {/if}
  {#if option == "profile"}
    <UserInformation />
    <Statistics />
  {:else if option == "settings"}
    <Themes />
    <SessionLength />
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
</style>
