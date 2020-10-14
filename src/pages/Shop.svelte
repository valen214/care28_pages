



<script>
  import { makeApiInfoCall, ORIGIN, onDev } from "./api";
  import { getCurrentUserID } from "./api/session";
  import TopBar from "./components/TopBar.svelte";
  import Button from "./components/Button.svelte";
  import Bio from "./shop/Bio.svelte";
  import Product from "./shop/Product.svelte";
  import Appointment from "./shop/Appointment.svelte";
  import {
    fetchProducts,
    fetchAppointments,
    getShopIdFromUrl,
  } from "./shop/functions";
import AgentCard from "./home/AgentCard.svelte";
import Card from "./components/Card.svelte";

  export let id = getShopIdFromUrl() || "";
  let current_user_id = getCurrentUserID();
  let edit_mode = false;
  console.log("id:", id);

  $: console.log("IDDDDD:", id);

  let display_name;
  let shop_ID;
  let avatarSrc;
  let description = "";

  let products;
  let old_products;
  let appointments;
  onDev(() => {
    if(!id){
      id = 4;
    }
    if(!current_user_id){
      current_user_id = 4;
    }
  });

  makeApiInfoCall({
    type: "query_user",
    fields: [
      "user_nicename",
      "display_name",
      "usertype",
      "shop_ID",
      "avatar",
    ]
  }).then(res => {
    return res.json();
  }).then((info) => {
    let {
      display_name: _display_name,
      shop_ID: _shop_ID,
      avatar: _avatar
    } = info;
    display_name = _display_name;
    shop_ID = _shop_ID;
    avatarSrc = ORIGIN + "/wp-content/uploads/avatar/" + _avatar;
  });

  fetchProducts(_products => {
    products = _products;
  });
  fetchAppointments(_appointments => {
    appointments = _appointments;
  });


</script>

<svelte:head>
  <base href={ORIGIN} />
</svelte:head>

<style>
  .root {
    padding: 15px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .top-panel {
    height: 300px;
  }
  .top-panel-left-group {
    float: left;
    width: 70%;
  }
  .top-panel-right-group {
    display: inline-block;
    width: 30%;
    height: 100%;
  }

  .top-panel-right-group .shop-action-button-panel {
    width: 100%;
  }

  .shop-action-button-panel :global(.shop-action-button) {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .products-panel-header {
    height: 75px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .products-panel-header > h2 {
    display: inline-block;
  }
  :global(.add-product-button) {
    margin-left: 120px;
    height: 50px;
  }
</style>

<TopBar loggedin={true} />
<div class="root">
  <div class="top-panel">
    <div class="top-panel-left-group">
      <Bio
        name={display_name}
        avatar={avatarSrc}
        description={description}
      />

      <h1>SHOP</h1>
    </div>
    <div class="top-panel-right-group">
      <div class="shop-action-button-panel">
        {#if current_user_id === id }
          {#if edit_mode}
            <Button className="shop-action-button"
                on:click={() => {
                  edit_mode = false;
                }}>
              Save Edit
            </Button>
            <Button className="shop-action-button"
                on:click={() => {
                  edit_mode = false;
                  products = old_products;
                }}>
              Cancel Edit
          </Button>
          {:else}
            <Button className="shop-action-button"
                on:click={() => {
                  edit_mode = true;
                  old_products = products.map(p => Object.assign({}, p));
                }}>
              Edit Shop
            </Button>
          {/if}
          <Button className="shop-action-button">View Page as client</Button>
        {:else}
          <Button className="shop-action-button">約見 Appointment</Button>
        {/if}
      </div>
    </div>
  </div>
  <div class="products-panel">
    <div class="products-panel-header">
      <h2>貨架</h2>
      {#if edit_mode}
        <Button className="add-product-button"
            on:click={() => {
              products = [...products, {}];
            }}>
          Add Product
        </Button>
      {/if}
    </div>
    {#each products as product}
      <Product edit={edit_mode} bind:product />
    {/each}
  </div>
  <div>
    <h2>約見評價</h2>
    {#each appointments as appointment}
      <Appointment { ...appointment } />
    {/each}
  </div>
</div>

