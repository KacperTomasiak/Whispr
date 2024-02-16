<script lang="ts">
  import Nav from "../components/Nav.svelte";
  import SidePanel from "../components/SidePanel.svelte";
  import Content from "../components/Content.svelte";
</script>

<Nav activeButton={0} />
<div id="content-wrapper">
  <SidePanel option="none" />
  <Content option="none" />
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
