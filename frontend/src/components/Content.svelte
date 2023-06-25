<script lang="ts">
  import NewSession from "./NewSession.svelte";

  export let option: string;
</script>

<div>
  {#if option == "none"}
    <NewSession />
  {/if}
</div>

<style>
  div {
    width: calc(100% - 300px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
