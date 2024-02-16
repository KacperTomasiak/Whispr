<script lang="ts">
  import Button from "./Button.svelte";
</script>

<form>
  <div id="close-button">x</div>
  <h2>Generate new session</h2>
  <input
    type="text"
    name="generatedSessionId"
    id="generated-session-id"
    value="0fx9-d4h7-ay87-94bc-ytf8-gh41-qw21"
    readonly
  />
  <textarea name="sessionLink" id="session-link" cols="30" rows="10" readonly>
    app.whispr.com/session/0fx9-d4h7-ay87-94bc-ytf8-gh41-qw21
  </textarea>
  <Button
    message="Generate session"
    isActive={true}
    link="none"
    on:click={(e) => e.preventDefault()}
  />
  <h2>Join new session</h2>
  <input
    type="text"
    name="newSessionId"
    id="new-session-id"
    value="0fx9-d4h7-ay87-94bc-ytf8-gh41-qw21"
  />
  <Button
    message="Join session"
    isActive={true}
    link="none"
    on:click={(e) => e.preventDefault()}
  />
</form>

<style>
  form {
    width: 500px;
    height: 600px;
    border-radius: 20px;
    background-color: #181d20;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 50px 0px;
    position: relative;
  }

  #close-button {
    font-size: 5rem;
    position: absolute;
    cursor: pointer;
    top: 25px;
    right: 25px;
  }

  h2 {
    font-size: 2.4rem;
  }

  input,
  textarea {
    border: none;
    border-radius: 20px;
    background-color: #131516;
    color: #06d6a0;
    width: 80%;
    height: 40px;
    font-size: 2rem;
    outline: none;
    text-align: center;
  }
</style>
