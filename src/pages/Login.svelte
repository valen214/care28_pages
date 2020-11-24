

<script>
  import TopBar from "./components/TopBar.svelte";
  import Button from "./components/Button.svelte"
  import { login as __login } from "../api/session";

  let loading = false;
  let username = "";
  let password = "";

  let showWrongInfoMessage = false;

  async function login(){
    if(loading){
      console.log("waiting for the previous request to finish");
      return;
    }
    loading = true;

    let res = await __login(username, password);
    if(res && res.status === "success"){
      if(res.usertype === "agent"){
        document.location.replace(document.location.origin + "/shop");
      } else{
        document.location.replace(document.location.origin);
      }
    } else {
      showWrongInfoMessage = true;
      loading = false;
    }
  }

  function cancelLoading(e){
    loading = false;
  }
</script>

<div class="page-content">
  <TopBar />
  <div class="login-panel-positioner flex-center">
    <div class="login-panel flex-center">
      <div class="row flex-center">
        <h2 class="panel-title">Login to your Account</h2>
      </div>
      {#if showWrongInfoMessage}
        <div class="error-message">
          wrong username or password
        </div>
      {/if}
      <div class="row flex-center">
        <input id="login-username" type="text"
            style={showWrongInfoMessage ? "border-color: rgba(255, 0, 0, 0.2);" : ""}
            placeholder="username"
            on:input={() => {
              if(showWrongInfoMessage){
                showWrongInfoMessage = false;
              }
            }}
            disabled={loading}
            bind:value={username} />
      </div>
      <div class="row flex-center">
        <input id="login-password" type="password"
            style={showWrongInfoMessage ? "border-color: rgba(255, 0, 0, 0.2);" : ""}
            placeholder="password"
            on:input={() => {
              if(showWrongInfoMessage){
                showWrongInfoMessage = false;
              }
            }}
            on:keyup={e => {
              if(e.code === "Enter"){
                login();
              }
            }}
            disabled={loading}
            bind:value={password} />
      </div>
      <div class="row flex-center">
        <Button id="login-button"
            background="#08f"
            hoverbgcolor="#ccf"
            disabled={loading}
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
    background: #00c771;
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

  .error-message {
    color: red;
    margin-bottom: 15px;
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