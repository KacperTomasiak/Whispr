<div id="content-wrapper">
  <h2>Statistics</h2>
  <div id="statistics">
    <div id="number-of-sessions">
      <h3>Number of sessions</h3>
      <div class="block">0</div>
    </div>
    <div id="account-age">
      <h3>Account age (days)</h3>
      <div class="block">0</div>
    </div>
  </div>
</div>

<style>
  #content-wrapper {
    width: 100%;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    margin-top: 80px;
  }

  h2 {
    font-size: 2.8rem;
  }

  #statistics {
    width: 80%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  h3 {
    font-size: 2rem;
  }

  #number-of-sessions,
  #account-age {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    height: 100%;
  }

  .block {
    background-color: #06d6a0;
    color: #131516;
    width: auto;
    height: auto;
    padding: 20px;
    border-radius: 10px;
    font-size: 4.8rem;
  }
</style>
