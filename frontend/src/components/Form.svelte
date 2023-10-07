<script lang="ts">
  import { enhance } from "$app/forms";
  import { privateKey } from "../shared/user";
  import { goto } from "$app/navigation";
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

  const sendData = async (): Promise<void> => {
    const api: string = "http://localhost:3000";
    let response = await fetch(`${api}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privateKey: $privateKey,
      }),
    });
    if (response.status == 200) {
      localStorage.privateKey = $privateKey;
      goto("/");
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
  <form
    method="post"
    use:enhance
    on:submit|preventDefault={async () => {
      if ($privateKey.length == 36 && $privateKey.startsWith("$whispr0x")) {
        await sendData();
      }
    }}
  >
    <h2>Enter your private key</h2>
    <input
      type="text"
      name="privateKey"
      id="private-key"
      bind:value={$privateKey}
    />
    <Button message="Log In" isActive={true} link="none" />
    <h4>Private key is a unique identifier of a user.</h4>
  </form>
{/if}

<style>
  form {
    width: 480px;
    height: 450px;
    border-radius: 20px;
    background-color: var(--third-color);
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 50px 0px;
    animation: animation 1s;
  }

  h2 {
    font-size: 2.4rem;
  }

  input {
    border: none;
    border-radius: 20px;
    background-color: var(--second-color);
    color: var(--first-color);
    width: 80%;
    height: 40px;
    font-size: 2rem;
    outline: none;
    text-align: center;
  }

  h4 {
    font-size: 1.4rem;
  }

  @keyframes animation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
