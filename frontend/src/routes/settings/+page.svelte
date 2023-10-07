<script lang="ts">
  import Nav from "../../components/Nav.svelte";
  import SidePanel from "../../components/SidePanel.svelte";
  import Content from "../../components/Content.svelte";
  import NewSession from "../../components/NewSession.svelte";
  import Title from "../../components/Title.svelte";
  import Warning from "../../components/Warning.svelte";
  import { isVisible } from "../../shared/visibility";
</script>

<Title title="Whispr | Settings" />
<Nav activeButton={0} />
<Warning />
<div id="content-wrapper">
  {#if $isVisible == true}
    <NewSession />
  {/if}
  <SidePanel option="settings" />
  <Content option="settings" />
</div>

<style>
  #content-wrapper {
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 750px) {
    #content-wrapper {
      display: none;
    }
  }
</style>
