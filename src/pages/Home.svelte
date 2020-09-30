

<script>
  import TopBar from "./components/TopBar.svelte";
  import Card from "./components/Card.svelte";
  import Button from "./components/Button.svelte";

  let loggedin = localStorage.getItem("token");

  let showSearchDropDown = false;

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
</script>

<svelte:head>
  <title>Care 28</title>
</svelte:head>

<style>
  .page-content {
    background: #00c771;
  }

  .page-content :global(.top-agent-interact-button) {
    font-size: 12px;
  }

  .banner-container {
    height: 600px;
  }

  .banner-text {
    margin-left: 15%;
    padding-top: 50px;

    font-family: "Arial";
    font-size: 24px;
    font-weight: bolder;
  }

  .search-panel {
    height: 300px;
    width: 75%;
    margin-top: 50px;
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
            ( showSearchDropDown ? "border-bottom-left-radius: 0;" : "")
          }
      /><Button style="border-radius: 0"
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
            區域:
            {#each "全部 港島 九龍 新界東 新界西".split(" ") as district}
              <Button>{ district }</Button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="height: 50px;width: 100%"></div>
  <div>

  </div>
  {#each Object.entries(products) as [ id, { name, description, images }] }
    <Card class="card" style={"margin:5px;" +
        `background: center / cover no-repeat url(${images[0]});` +
        "min-height: 300px; color: white;"
        }>
      <span slot="name">
        {name}
      </span>
      <span slot="description">
        {description}
      </span>
    </Card>
  {/each}
</div>