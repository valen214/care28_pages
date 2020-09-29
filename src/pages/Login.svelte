

<script>
  import Button from "./components/Button.svelte"

  let loading = false;
  let username = "";
  let password = "";

  async function login(e){
    loading = true;

    

    location = location.origin + "/profile";
  }
  function cancelLoading(e){
    loading = false;
  }
</script>


<div class="page-content">
  <div class="login-panel-positioner flex-center">
    <div class="login-panel flex-center">
      <div class="row flex-center">
        <h2 class="panel-title">Login to your Account</h2>
      </div>
      <div class="row flex-center">
        <input id="login-username" type="text"
            placeholder="username" bind:value={username} />
      </div>
      <div class="row flex-center">
        <input id="login-password" type="password"
            placeholder="password" bind:value={password} />
      </div>
      <div class="row flex-center">
        <Button id="login-button"
            hoverbgcolor="#ccf"
            on:click={login}>Login</Button>
        <a id="register-button" href="/register">register</a>
      </div>
    </div>
    <div class="loading-panel flex-center"
        style={"display:" + (loading ? "flex" : "none")}>
      Loading...
      <Button id="cancel-button"
          on:click={cancelLoading}>cancel</Button>
    </div>
  </div>
</div>


<style>
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .row {
    width: 100%;
  }
  ::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }


  .page-content {
    height: 100%;
    width: 100%;
    background: #232f3e;
  }

  .login-panel-positioner {
    height: 100%;
    width: 100%;
  }

  .loading-panel,
  .login-panel {
    height: 450px;
    width: 450px;
    background: #eee;
    margin: auto;
  }

  .login-panel {
    border-radius: 8px;
    padding: 15px;

    flex-direction: column;
  }

  .panel-title {
    margin-bottom: 60px;
  }

  #login-username,
  #login-password {
    width: 80%;
    font-size: 28px;
    height: 50px;
    border: none;
    padding: 0 8px;
  }

  #login-username {
    margin-bottom: 15px;
  }
  #login-password {
    margin-bottom: 30px;
  }

  :global(#login-button) {
    margin-left: 15%;
  }

  #register-button {
    margin: 0 15% auto auto;
  }



  .loading-panel {
    position: absolute;
    display: none;
    opacity: 0.7;
  }
  :global(#cancel-button) {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
</style>