

<script>
  import TopBar from "./components/TopBar.svelte";
  import Card from "./components/Card.svelte";
  import Button from "./components/Button.svelte";

  let loggedin = localStorage.getItem("token");

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
    padding: 15px 20px 0;
    background: #00c771;
  }

  .top-agent-section {
    color: white;
  }
  .page-content :global(.top-agent-interact-button) {
    font-size: 12px;
  }

  .search-panel-container {
    height: 500px;
    background: rgba(0, 0, 0, 0);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-panel {
    height: 300px;
    width: 75%;
    background: #08f;
  }

  .district-section {
    height: 100px;
    color: white;
    font-size: 30px;
    font-weight: 900;
  }
</style>

<TopBar {loggedin} ></TopBar>
<div class="page-content">
  <div class="search-panel-container">
    <div class="search-panel">
      <div>

      </div>
      <div class="district-section">
        區域: 全部 港島 九龍 新界東 新界西 
      </div>
    </div>
  </div>
  <div class="top-agent-section">
    <h2>最受歡迎經紀</h2>
    <span>24 appointments</span><br />
    <span>5 done transactions</span><br />
    <Button class="top-agent-interact-button">
      和他/她預約
    </Button>
    <Button class="top-agent-interact-button">
      瀏覽他/她的樓盤
    </Button>
  </div>
  <div style="height: 50px;width: 100%"></div>
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