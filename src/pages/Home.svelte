

<script>
  import TopBar from "./components/TopBar.svelte";
  import Card from "./components/Card.svelte";

  let loggedin = localStorage.getItem("session");

  export let products = {
    "1": {
      name: "product NAME",
      description: "HELLO WORLD! product description"
    },
    "2": {
      name: "PRODUCT TWO",
      description: "PRODUCT TWO DESCRIPTION"
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


<style>
  .page-content {
    padding: 15px 20px 0;
  }
</style>

<TopBar {loggedin} ></TopBar>
<div class="page-content">
  {#each Object.entries(products) as [ id, { name, description }] }
    <Card class="card" style="margin:5px;">
      <span slot="name">
        {name}
      </span>
      <span slot="description">
        {description}
      </span>
    </Card>
  {/each}
</div>