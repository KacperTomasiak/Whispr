<div id="content-wrapper">
  <h2>Themes</h2>
  <div id="themes">
    <div class="theme active">
      <div class="first-color first-theme" />
      <div class="second-color first-theme" />
    </div>
    <div class="theme">
      <div class="first-color second-theme" />
      <div class="second-color second-theme" />
    </div>
    <div class="theme">
      <div class="first-color third-theme" />
      <div class="second-color third-theme" />
    </div>
  </div>
</div>

<style>
  #content-wrapper {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }

  h2 {
    font-size: 2.8rem;
  }

  #themes {
    width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .theme {
    width: 220px;
    height: 150px;
    border-radius: 20px;
    border: 3px dashed white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    cursor: pointer;
  }

  .first-color {
    width: 50%;
    height: 100%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .second-color {
    width: 50%;
    height: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .first-color.first-theme {
    background-color: #06d6a0;
  }

  .second-color.first-theme {
    background-color: #131516;
  }

  .first-color.second-theme {
    background-color: #38a3a5;
  }

  .second-color.second-theme {
    background-color: #22577a;
  }

  .first-color.third-theme {
    background-color: #fdd545;
  }

  .second-color.third-theme {
    background-color: #202628;
  }

  .theme.active {
    border: 3px solid white;
  }
</style>
