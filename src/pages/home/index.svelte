

<script>
  import {
    REMOTE_ORIGIN,
    getRecentPosts,
    getOutstandingAgents
  } from "../../api";
  import TopBar from "../components/TopBar.svelte";
  import Button from "../components/Button.svelte";
  import AgentCard from "./AgentCard.svelte";
  import Post from "./Post.svelte";

  let showSearchDropDown = false;
  let activeDistrictIndex = 0;

  export let outstanding_agents = {};
  getOutstandingAgents().then(agents => {
    outstanding_agents = agents;
    console.log("outstanding_agents:", agents);
  });

  export let posts = [];
  getRecentPosts().then(_posts => {
    posts = _posts;
  });

  let searchButtonHeight;
  $: console.log('search buttong height:', searchButtonHeight);
</script>

<svelte:head>
  <title>Care 28</title>
</svelte:head>

<TopBar />
<div class="page-content">
  <div class="banner-container"
      style={"background: center / cover no-repeat " +
      "url(" + REMOTE_ORIGIN +
      "/wp-content/themes/twentytwenty/assets/images/home-banner-image.png);"}>
    <div class="banner-text">
      最好評價的經紀都在 CARE28
    </div>
    <div class="search-panel">
      <input type="text" class="banner-search-input"
          style={
            ( showSearchDropDown ? "border-bottom-left-radius: 0;" : "") +
            ( searchButtonHeight ? `height: ${searchButtonHeight}px;` : "" )
          }
      /><Button style="border-radius: 0"
          bind:clientHeight={searchButtonHeight}
          on:click={() => {
            showSearchDropDown ^= true;
          }}>
        更多選項
      </Button><Button
          background="#ff1a1a"
          style="border-radius: 0 5px 5px 0;color: white;font-weight: bolder;">
        網上查詢
      </Button>
      <div class={
            "search-drop-down-transition-container " +
            ( showSearchDropDown ? "show" : "")
          }>
        <div class={
            "search-drop-down "
          }>
          <div class="district-section">
            地區:
            {#each "全部 港島 九龍 新界東 新界西".split(" ") as district, i}
              <Button
                style={ ( activeDistrictIndex === i ? "background:#428bca" : "" ) }
                on:click={() => {
                  activeDistrictIndex = i;
                }}
              >{ district }</Button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="height: 50px;width: 100%"></div>
  <div class="outstanding-agents">
    <div class="outstanding-agents-header">
      <h2>出色經紀</h2>
      <a href="/agents" class="more">
        更多
      </a>
    </div>
    {#each Object.entries(outstanding_agents) as [ id, {
        images, ...props
      }] }
      <AgentCard
        { ...{ id, images, ...props }}
        avatar={images?.[0]} />
    {:else}
      Loading...
    {/each}
  </div>
  <div class="posts">
    <div class="posts-header">
      <h2>最新文章</h2>
      <a href="/articles" class="more">
        更多
      </a>
    </div>
    <div class="posts-container">
      {#each posts as post}
        <Post { post } />
      {:else}
        Loading...
      {/each}
    </div>
  </div>
  <div class="reports">
    <div class="reports-header">
      <h2>睇樓報告</h2>
      <a href="/#" class="more">
        更多
      </a>
    </div>
    <div class="reports-content-container">

    </div>
  </div>
</div>


<style>
  .page-content {
    background: #00c771;
    
    display: grid;
    grid-template-areas:
        "banner banner"
        "agents posts"
        "agents reports";
    grid-template-rows: 600px 1fr 1fr;
    grid-template-columns: 40% 1fr;
  }
  .banner-container {
    grid-area: banner;
  }
  .outstanding-agents {
    grid-area: agents;
  }
  .posts {
    grid-area: posts;
  }
  .reports {
    grid-area: reports;
  }

  .page-content :global(.top-agent-interact-button) {
    font-size: 12px;
  }

  .banner-container {
    height: 600px;
  }

  .banner-text {
    margin-left: 15%;
    padding-top: 20px;

    font-family: "Arial";
    font-size: 24px;
    font-weight: bolder;
  }

  .search-panel {
    height: 300px;
    width: 75%;
    margin-top: 80px;
    margin-left: 15%;
  }

  .banner-search-input {
    height: 53px;
    padding: 0 10px 0px 10px;
    border: none;
    border-radius: 15px 0 0 15px;
    font-size: 24px;

    float: left;

    transition: border-bottom-left-radius 0.5s;
  }

  .search-drop-down-transition-container {
    background: white;
    width: 500px;
    padding-left: 15px;

    transform-origin: top;
    padding-bottom: 0;
    transition: padding-bottom 0.5s;
    
    overflow: hidden;
    position: relative;
  }
  .search-drop-down-transition-container.show {
    padding-bottom: 200px;
  }

  .search-drop-down {
    position: absolute;
  }

  .district-section {
    height: 100px;
    color: black;
    font-size: 20px;
    font-weight: 900;
  }

  .outstanding-agents {
    background: white;
  }

  .outstanding-agents-header {
    display: flex;
    flex-direction: row;
    align-items: center;

    min-height: 80px;
    padding: 15px 30px;
  }

  .outstanding-agents-header > h2 {
    user-select: none;
    margin: 0;
  }

  .outstanding-agents-header > .more {
    margin: 0 0 0 auto;
    user-select: none;
  }

  .posts {
    background: white;
  }
  .posts-header {
    display: flex;
    flex-direction: row;
    align-items: center;

    min-height: 80px;
    padding: 15px 30px;
  }
  .posts-header > h2 {
    user-select: none;
    margin: 0;
  }
  .posts-header > .more {
    margin: 0 0 0 auto;
    user-select: none;
  }


  .reports {
    background: white;
  }
  .reports-header {
    display: flex;
    flex-direction: row;
    align-items: center;

    min-height: 80px;
    padding: 15px 30px;
  }
  .reports-header > h2 {
    user-select: none;
    margin: 0;
  }
  .reports-header > .more {
    margin: 0 0 0 auto;
    user-select: none;
  }


  .reports-content-container {
    display: grid;
  }
</style>
