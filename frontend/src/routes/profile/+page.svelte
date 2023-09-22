<script lang="ts">
  import Nav from "../../components/Nav.svelte";
  import SidePanel from "../../components/SidePanel.svelte";
  import Content from "../../components/Content.svelte";
  import NewSession from "../../components/NewSession.svelte";
  import { isVisible } from "../../shared/visibility";
</script>

<Nav activeButton={0} />
<div id="content-wrapper">
  {#if $isVisible == true}
    <NewSession />
  {/if}
  <SidePanel option="profile" />
  <Content option="profile" />
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
