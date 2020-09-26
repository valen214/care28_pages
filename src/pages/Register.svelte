
<svelte:options tag="pages-register" />

<script>

  let error_message;
  let password_not_match = false;
  $: {
    if(password_not_match){
      error_message = "password not match";
    } else{
      error_message = "";
    }
  }

  let username;
  let password, repassword;
  let usertype = "client";
  let email;

  $: console.log(usertype);

  async function onSubmit(e){
    if(password !== repassword){
      password_not_match = true;
      console.error("password not match on submit");
      return;
    }

    let url = location.origin + "/wp-json/api/v1/user";
    url = "//18.166.176.71/wp-json/api/v1/user";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "action": "register",
        username,
        password,
        usertype,
        email
      })
    });
    res = await res.json();
    console.log(res);
  }
</script>

<style>
  .page-content {
    padding: 15px;
  }

  .error-message {
    color: red;
  }

  input {
    height:50px;
    width: 300px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 28px;
    padding: 0 0 0 8px;
  }
  
  label {
    display: inline-block;
    width: 140px;
    text-align: left;
  }

  label.radio {
    width: 150px;
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  label.radio > input {
    width: 30px;
  }

  .row {
    display: block;
    margin-bottom: 15px;
  }
</style>

<top-bar></top-bar>
<div class="page-content">
  {#if error_message }
    <div class="row error-message">
      { error_message }
    </div>
  {/if}
  <div class="row">
    <label>
      Username
      <input id="input-username" type="text" bind:value={username} />
    </label>
  </div>
  <div class="row">
    <label>
      Password
      <input id="input-password"
          type="password"
          bind:value={password}
          on:input={(e) => {
            password_not_match = (repassword !== password)
          }} />
    </label>
  </div>
  <div class="row">
    <label>
      Retype Password
      <input id="input-repassword"
          type="password"
          style={password_not_match ? "border-color: red;" : ""}
          bind:value={repassword}
          on:input={(e) => {
            password_not_match = (repassword !== password)
          }} />
    </label>
  </div>
  <div class="row">
    <label class="radio">
      <input id="input-usertype-client"
          type="radio" name="usertype"
          value="client" bind:group={usertype} />
      Client
    </label>
    <label class="radio">
      <input id="input-usertype-agent"
          type="radio" name="usertype"
          value="agent" bind:group={usertype} />
      Agent
    </label>
  </div>
  <div class="row">
    <label>
      Email
      <input id="input-email" type="text" bind:value={email} />
    </label>
  </div>
  <div class="row">
    <component-button
        _style="border: 1px solid rgba(0, 0, 0, 0.2)"
        on:click={onSubmit}
    >Submit</component-button>
  </div>
</div>
