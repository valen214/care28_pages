

<script>
	import { onMount } from 'svelte';
  import Button from "./Button.svelte";
  import { LOCAL_ORIGIN, REMOTE_ORIGIN } from "../api";
  import { logout } from "../api/session";

  export let loggedin = !!localStorage.getItem("token");
  $: console.log("loggedin:", loggedin, typeof loggedin);
  let usertype = localStorage.getItem("usertype");

  let topBar;
  let centerGroup;
  let topNavObserver;

  onMount(() => {
    topNavObserver = new IntersectionObserver(() => {
      console.log("intersect");
    }, {
      root: topBar,
      rootMargin: "0px 0px 0px 0px"
    });

    topNavObserver.observe(centerGroup);

    console.log(topBar, centerGroup);
  })
</script>

<div class="top-bar" bind:this={topBar}>
  <div class="nav-left">
    <a href={LOCAL_ORIGIN + "/"} class="logo">
      <img src={ REMOTE_ORIGIN +
            "/wp-content/themes/twentytwenty/assets/images/logo.png" }
          alt="logo" />
    </a>
    
  </div>
  <div class="nav-center" bind:this={centerGroup}>
    <a href="https://care28.com/%E6%96%87%E7%AB%A0%E7%9B%AE%E9%8C%84/?cat=%E8%B2%B7%E6%A8%93"
        class="top-bar-image-link-fix">
      <img alt="" src={REMOTE_ORIGIN +
          "/wp-content/themes/twentytwenty/assets/images/" +
          "%E8%B2%B7%E6%A8%93%E5%BF%83%E5%BE%97.png"}>
    </a>
    <a class="top-bar-image-link-fix"
        href="https://care28.com/%E6%96%87%E7%AB%A0%E7%9B%AE%E9%8C%84/?cat=%E6%8C%89%E6%8F%AD">
      <img alt=""
          src={REMOTE_ORIGIN +
              "/wp-content/themes/twentytwenty/assets/images/按揭智慧.png"}>
    </a>
    <Button className="top-bar-button-fix">
      <i class="arrow"></i>睇樓報告
    </Button>
    <Button className="top-bar-button-fix">
        <i class="arrow"></i>最佳經紀
    </Button>
    <a href="https://care28.com/%e4%bb%80%e9%ba%bd%e6%98%afcare28/">
      <img alt=""
          src={REMOTE_ORIGIN +
            "/wp-content/themes/twentytwenty/assets/images/甚麼是care28.png"}>
    </a>
  </div>
  <div class="nav-right">
    {#if !loggedin}
      <Button
          className="top-bar-button-fix"
          href={LOCAL_ORIGIN + "/login"}>
        登入
      </Button>
    {:else}
      {#if usertype === "agent"}
        <Button
            className="top-bar-button-fix"
            href={LOCAL_ORIGIN + "/shop"}>
          My Shop
        </Button>
      {/if}
      <Button
          className="top-bar-button-fix"
          href={LOCAL_ORIGIN + "/profile"}>
        Profile
      </Button>
      <Button
          className="top-bar-button-fix"
          href={LOCAL_ORIGIN + "/"}
          on:click={logout}>
        登出
      </Button>
    {/if}
  </div>
</div>



<style>
  .top-bar {
    background: white;
    display: flex;
    height: 80px;
    overflow: hidden;
  }

  .top-bar :global(.top-bar-button-fix) {
    margin-bottom: 6px;
    font-weight: 700;
    /* text-shadow: rgba(0, 0, 0, 0.5) 0 0 0.1px; */
    font-size: 18px;
    font-family: "微軟正黑體", "Noto Sans CJK TC", sans-serif;
  }

  .top-bar .top-bar-image-link-fix {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo > img {
    height: 100%;
  }

  .nav-center {
    margin: auto 0 auto auto;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .nav-right {
    margin-right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  a:link,
  a:visited,
  a:active {
    text-decoration: inherit;
    color: inherit;
  }


  i.arrow {
    color: #39a348;
    font-size: 25px;
    transform: scaleX(0.8);
  }
  i.arrow::after {
    content: "\25BA ";
  }
</style>

