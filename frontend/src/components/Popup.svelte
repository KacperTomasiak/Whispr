<script lang="ts">
  import { fly } from "svelte/transition";

  export let title: string;
  export let show: boolean;
</script>

{#if show == true}
  <div transition:fly={{ delay: 200, duration: 1500, x: 300, opacity: 0.5 }}>
    {title}
  </div>
{/if}

<style>
  div {
    width: 300px;
    height: auto;
    color: var(--second-color);
    background-color: var(--first-color);
    font-size: 2rem;
    border-radius: 10px;
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
  }
</style>
