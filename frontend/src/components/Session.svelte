<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentSession } from "../shared/user";

  export let title: string;

  let element: any;

  const setCurrentSession = () => {
    $currentSession = element.innerHTML;
    goto("/");
  };
</script>

<div bind:this={element} on:click={setCurrentSession}>
  {title}
</div>

<style>
  div {
    width: 80%;
    height: 60px;
    border-radius: 15px;
    background-color: #181d20;
    color: #06d6a0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 10px;
    padding: 10px;
  }

  div:hover {
    opacity: 0.8;
  }
</style>
