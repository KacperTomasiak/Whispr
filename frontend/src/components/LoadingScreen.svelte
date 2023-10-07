<div id="wrapper">
  <div class="custom-loader" />
</div>

<style>
  #wrapper {
    width: 80%;
    height: 100%;
    background-color: var(--second-color);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    opacity: 0;
    visibility: hidden;
    animation: animation 2s;
  }

  .custom-loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 8px solid;
    border-color: var(--first-color) var(--second-color);
    animation: loader-animation 1s infinite;
  }

  @keyframes loader-animation {
    to {
      transform: rotate(0.5turn);
    }
  }

  @keyframes animation {
    from {
      opacity: 1;
      visibility: visible;
    }
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
</style>
