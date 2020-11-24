<script lang="ts">
  import { getCurrentUserInfo } from "../../api";
  import type {
      Agent,
      Product as TProduct
  } from "../../api";
  
  import TopBar from "../components/TopBar.svelte";
  import Button from "../components/Button.svelte";
  import AgentCard from "./AgentCard.svelte";
  import Product from "./Product.svelte";
  
  import { getShopInfo } from "./functions";

  let active_tab_index: 0 | 1 | 2 = 1;

  export let id = null;
  $: console.log("viewing shop id:", id);
  let agents: Agent[] = [];
  let products: TProduct[] = [];
  let shop_info: any = {};

  (async function onPageLoad(){
    if(!id){
      let res = (await getCurrentUserInfo().then(res => res.json()));
      // console.log(res);
      id = res["shop_ID"];
    }
    getShopInfo(id).then((
      [ _agents, _products, _reports, _shop_info ]
    ) => {
      agents = _agents;
      products = _products;
      shop_info = _shop_info;
    });
  })();

</script>


<div class="page-content">
  <TopBar />
  <img alt="banner" class="banner"
      src={"https://www.mtrmalls.com/mesln_files_upload/" +
          "shop/images/midland_realty_logo_color.jpg"} />
  {#if shop_info && shop_info.address}
    <div class="address">
      { shop_info.address }
    </div>
  {:else}
    <div class="address">
      <i>( 未有提供地址 )</i>
    </div>
  {/if}
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
        <AgentCard { ...{
          ...agent,
          ID: undefined,
          id: agent["ID"]
        } } />
      {/each}
    {:else if active_tab_index === 1}
      {#each products as product}
        <Product { product }
            shop_id={id}
            agent_id={agents[0]["ID"] } />
      {/each}
    {/if}
  </div>
</div>



<style>
  .page-content {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .banner {
    object-fit: contain;
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