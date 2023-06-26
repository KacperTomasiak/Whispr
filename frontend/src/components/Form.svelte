<script lang="ts">
  import { privateKey } from "../shared/user";
  import Button from "./Button.svelte";

  export let type: string;

  const generatePrivateKey = (): void => {
    let letters: string = "abcdefghijklmnopqrstuvwxyz";
    let numbers: string = "0123456789";
    let chars: string = letters + numbers;
    $privateKey = "$whispr0x";

    for (let i = 0; i < 27; i++) {
      let num: number = Math.floor(Math.random() * chars.length);
      $privateKey += chars.substring(num, num + 1);
    }
  };
</script>

{#if type == "signup"}
  <form on:submit|preventDefault={generatePrivateKey}>
    <h2>Generate your private key</h2>
    <input
      type="text"
      name="privateKey"
      id="private-key"
      bind:value={$privateKey}
      readonly
    />
    <Button message="Generate" isActive={true} link="none" />
    <h4>Private key is a unique identifier of a user.</h4>
  </form>
{:else if type == "login"}
  <form>
    <h2>Enter your private key</h2>
    <input
      type="text"
      name="privateKey"
      id="private-key"
      bind:value={$privateKey}
    />
    <Button
      message="Log In"
      isActive={true}
      link="none"
      on:click={(e) => e.preventDefault()}
    />
    <h4>Private key is a unique identifier of a user.</h4>
  </form>
{/if}

<style>
  form {
    width: 480px;
    height: 450px;
    border-radius: 20px;
    background-color: #181d20;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 50px 0px;
  }

  h2 {
    font-size: 2.4rem;
  }

  input {
    border: none;
    border-radius: 20px;
    background-color: #131516;
    color: #06d6a0;
    width: 80%;
    height: 40px;
    font-size: 2rem;
    outline: none;
    text-align: center;
  }

  h4 {
    font-size: 1.4rem;
  }
</style>
