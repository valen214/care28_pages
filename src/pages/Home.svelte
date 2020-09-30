

<script>
  import TopBar from "./components/TopBar.svelte";
  import Card from "./components/Card.svelte";
  import Button from "./components/Button.svelte";
  import AgentCard from "./home/AgentCard.svelte";

  let loggedin = localStorage.getItem("token");

  let showSearchDropDown = false;
  let activeDistrictIndex = 0;

  export let outstanding_agents = {
    "1": {
      name: "Agent 312",
      rating: 4.6,
      area: "天水圍",
      images: [
        "/wp-content/uploads/avatar/avatar1.png",
        "/wp-content/uploads/avatar/C7djvi-" +
        "6bda7a8828925a0a8485037bfef2b2c0d7e88e4eddbb1f465a19a815fe7c2b74.jpg",
        "/wp-content/uploads/avatar/cx86Z3GqBz-",
      ]
    },
    "2": {
      name: "Agent 4123",
      rating: 4.6,
      area: "西區",
      images: [
        "/wp-content/uploads/avatar/avatar2.png",
        "/wp-content/uploads/avatar/ZUKEFY-" +
        "1c3d94776234ac83cdd5060c27a36e4980b66345761eaa343888efb3828da650.jpg",
      ]
    }
  };

  export let products = {
    "1": {
      name: "product NAME",
      description: "HELLO WORLD! product description",
      images: [
        "/wp-content/uploads/avatar/cx86Z3GqBz-",
        "/wp-content/uploads/avatar/C7djvi-" +
        "6bda7a8828925a0a8485037bfef2b2c0d7e88e4eddbb1f465a19a815fe7c2b74.jpg",
      ]
    },
    "2": {
      name: "PRODUCT TWO",
      description: "PRODUCT TWO DESCRIPTION",
      images: [
        "/wp-content/uploads/avatar/ZUKEFY-" +
        "1c3d94776234ac83cdd5060c27a36e4980b66345761eaa343888efb3828da650.jpg",
      ]
    }
  };

  $: if(typeof products === "string"){
    try {
      products = JSON.parse(products);
    } catch(e){
      products = {};
    }
  }

  let searchButtonHeight;
  $: console.log('search buttong height:', searchButtonHeight);
</script>

<svelte:head>
  <title>Care 28</title>
</svelte:head>

<style>
  .page-content {
    background: #00c771;
    
    display: grid;
    grid-template-areas:
        "banner banner"
        "agents reports"
        "agents reports";
    grid-template-rows: 600px auto 1fr;
    grid-template-columns: 40% 1fr;
  }
  .banner-container {
    grid-area: banner;
  }
  .outstanding-agents {
    grid-area: agents;
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

<TopBar {loggedin} ></TopBar>
<div class="page-content">
  <div class="banner-container"
      style={"background: center / cover no-repeat " +
      "url(/wp-content/themes/twentytwenty/assets/images/home-banner-image.png);"}>
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
      <a href="/#" class="more">
        更多
      </a>
    </div>
    {#each Object.entries(outstanding_agents) as [ id, { name, rating, area, images }] }
      <AgentCard
        { ...{ name, rating, area }}
        avatar={images[0]}
        />
    {/each}
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