<script lang="ts">
  import Nav from "../components/Nav.svelte";
  import SidePanel from "../components/SidePanel.svelte";
  import NewSession from "../components/NewSession.svelte";
  import Content from "../components/Content.svelte";
  import Title from "../components/Title.svelte";
  import { isVisible } from "../shared/visibility";
</script>

<Title title="Whispr | Chat" />
<Nav activeButton={0} />
<div id="content-wrapper">
  {#if $isVisible == true}
    <NewSession />
  {/if}
  <SidePanel option="none" />
  <Content option="session" />
</div>

<style>
  #content-wrapper {
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
