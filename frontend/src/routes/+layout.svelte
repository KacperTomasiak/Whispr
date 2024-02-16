<script lang="ts">
  import "../style.css";
  import { activeTheme } from "../shared/visibility";
</script>

<svelte:head>
  {#if $activeTheme == 0}
    <link rel="stylesheet" href="/themes/firstTheme.css" />
    <link rel="icon" href="/icons/first_icon.png" />
    <link
      rel="apple-touch-icon"
      sizes="57x57"
      href="/icons/first_apple_icon.png"
    />
  {:else if $activeTheme == 1}
    <link rel="stylesheet" href="/themes/secondTheme.css" />
    <link rel="icon" href="/icons/second_icon.png" />
    <link
      rel="apple-touch-icon"
      sizes="57x57"
      href="/icons/second_apple_icon.png"
    />
  {:else}
    <link rel="stylesheet" href="/themes/thirdTheme.css" />
    <link rel="icon" href="/icons/third_icon.png" />
    <link
      rel="apple-touch-icon"
      sizes="57x57"
      href="/icons/third_apple_icon.png"
    />
  {/if}
</svelte:head>

<slot />
