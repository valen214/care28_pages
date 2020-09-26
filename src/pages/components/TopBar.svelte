

<script>
  export let loggedin = false;
  $: console.log("loggedin:", loggedin, typeof loggedin);
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .top-bar {
    background: #232f3e;
    display: flex;
    color: white;
    height: 80px;
  }

  .nav-left {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .logo {
    margin: 0 0 0 15px;
    padding: 15px 35px 15px 15px;
    cursor: pointer;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-center {
    margin: auto;
    height: 100%;
  }

  .search-bar {
    height: 100%;
    padding: 15px;
  }
  .search-bar > input {
    height: 100%;
    width: 35vw;
    font-size: 28px;
  }

  .nav-right {
    margin-left: auto;
  }

  .sign-in-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    height: 100%;
    cursor: pointer;
    text-decoration: inherit;
    color: inherit;
  }
</style>


<div class="top-bar">
  <div class="nav-left">
    <h2 class="logo">Care28</h2>
  </div>
  <div class="nav-center">
    <div class="search-bar">
      <input type="text" />
    </div>
  </div>
  <div class="nav-right">
    {#if !loggedin}
      <a class="sign-in-button"
          href="/login">
        Sign In
      </a>
    {/if}
  </div>
</div>