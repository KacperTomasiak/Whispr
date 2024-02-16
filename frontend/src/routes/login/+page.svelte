<script lang="ts">
  import Nav from "../../components/Nav.svelte";
  import Form from "../../components/Form.svelte";
  import Footer from "../../components/Footer.svelte";
</script>

<Nav activeButton={1} />
<div id="form-wrapper">
  <Form type="login" />
</div>
<Footer />

<style>
  #form-wrapper {
    width: 100%;
    height: calc(100% - 150px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
