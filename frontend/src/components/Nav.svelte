<script lang="ts">
  import Logo from "./Logo.svelte";
  import Button from "./Button.svelte";

  export let activeButton: number;
</script>

<nav>
  <Logo />
  <div id="buttons">
    {#if activeButton == 1}
      <Button message="Log In" isActive={true} link="login" />
      <Button message="Sign Up" isActive={false} link="signup" />
    {:else if activeButton == 2}
      <Button message="Log In" isActive={false} link="login" />
      <Button message="Sign Up" isActive={true} link="signup" />
    {/if}
  </div>
</nav>

<style>
  nav {
    width: 100%;
    height: 80px;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #buttons {
    width: 280px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
