<script lang="ts">
  import Button from "./Button.svelte";
  import { sessionLength, changeSessionLength } from "../shared/security";
</script>

<div id="content-wrapper">
  <h2>Session Length</h2>
  <h4>This refers to the time after which you will be logged out.</h4>
  <div id="session-length">
    <Button
      message="15 minutes"
      isActive={$sessionLength == 15}
      link="none"
      on:click={() => changeSessionLength(15)}
    />
    <Button
      message="30 minutes"
      isActive={$sessionLength == 30}
      link="none"
      on:click={() => changeSessionLength(30)}
    />
    <Button
      message="1 hour"
      isActive={$sessionLength == 60}
      link="none"
      on:click={() => changeSessionLength(60)}
    />
  </div>
</div>

<style>
  #content-wrapper {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    text-align: center;
    margin-top: 80px;
  }

  h2 {
    font-size: 2.8rem;
    margin: 10px 40px;
  }

  h4 {
    font-size: 1.4rem;
    margin: 10px 40px;
  }

  #session-length {
    width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 10px;
  }
</style>
