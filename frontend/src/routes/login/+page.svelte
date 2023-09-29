<script lang="ts">
  import Nav from "../../components/Nav.svelte";
  import Form from "../../components/Form.svelte";
  import Footer from "../../components/Footer.svelte";
  import Title from "../../components/Title.svelte";
</script>

<Title title="Whispr | Log In" />
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
