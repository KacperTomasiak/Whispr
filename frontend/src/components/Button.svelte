<script lang="ts">
  export let message: string;
  export let isActive: boolean;
  export let link: string;
</script>

{#if link == "none"}
  <button class:active={isActive} on:click>{message}</button>
{:else}
  <a href="/{link}"><button class:active={isActive}>{message}</button></a>
{/if}

<style>
  a {
    text-decoration: none;
  }

  button {
    width: auto;
    padding: 0px 10px;
    margin: 10px;
    height: 40px;
    border-radius: 20px;
    border: none;
    font-size: 2.4rem;
    background-color: transparent;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.8;
  }

  .active {
    color: var(--second-color);
    background-color: var(--first-color);
  }
</style>
