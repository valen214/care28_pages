<script lang="ts">
  import type {
    Agent,
    Product as TProduct
  } from "../../api";
  
  import TopBar from "../components/TopBar.svelte";
  import Button from "../components/Button.svelte";
  import Product from "./Product.svelte";
  
  import { getShopInfo } from "./functions";

  let active_tab_index: 0 | 1 | 2 = 1;

  let agents: Agent[] = [];
  let products: TProduct[] = [];

  getShopInfo(1).then((
    [ _agents, _products, _reports ]
  ) => {
    agents = _agents;
    products = _products;
  });

</script>


<TopBar />
<div class="page-content">
  <img alt="banner" class="banner"
      src={"https://www.mtrmalls.com/mesln_files_upload/" +
          "shop/images/midland_realty_logo_color.jpg"} />
  <div class="address">
    美聯荃新天地鋪1
  </div>
  <div class="tabs">
    {#each [
      "有關代理",
      "有關產品",
      "有關報告",
    ] as tab_title, i}
      <Button
        style="width: 100%"
        background={ i === active_tab_index ? "rgba(0, 0, 0, 0.1)" : null}
        on:click={() => {
          if( i === 0 || i === 1 || i === 2){
            active_tab_index = i;
          }
        }}
        >{tab_title}</Button>
      { i < 2 ? "|" : "" }
    {/each}
  </div>
  <div class="tab-content">
    {#if active_tab_index === 0}
      {#each agents as agent}
        <div>
          { agent.name }
        </div>
      {/each}
    {:else if active_tab_index === 1}
      {#each products as product}
        <Product { product } />
      {/each}
    {/if}
  </div>
</div>



<style>
  .banner {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 300px;
  }

  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }


</style>