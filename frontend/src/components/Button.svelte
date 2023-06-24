<script lang="ts">
  export let message: string;
  export let isActive: boolean;
  export let link: string;
</script>

<a href="/{link}"><button class:active={isActive}>{message}</button></a>

<style>
  a {
    text-decoration: none;
  }

  button {
    width: 120px;
    height: 40px;
    border-radius: 20px;
    border: none;
    font-size: 2.4rem;
    background-color: transparent;
    cursor: pointer;
  }

  .active {
    color: #131516;
    background-color: #06d6a0;
  }
</style>
