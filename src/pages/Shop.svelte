
<script>
  import { makeApiInfoCall, REMOTE_ORIGIN, onDev, LOCAL_ORIGIN } from "./api";
  import { getCurrentUserID } from "./api/session";
  import TopBar from "./components/TopBar.svelte";
  import Button from "./components/Button.svelte";
  import Bio from "./shop/Bio.svelte";
  import Product from "./shop/Product.svelte";
  import Appointment from "./shop/Appointment.svelte";
  import {
    fetchProducts,
    fetchAppointments,
    getUserIdFromUrl,
    saveProducts
  } from "./shop/functions";

  export let id = getUserIdFromUrl() || "";
  let current_user_id = getCurrentUserID();
  let mode = false;
  let loading = true;
  let status_message = "";

  let display_name;
  let shop_ID;
  let avatarSrc;
  let description = "";

  let products;
  let old_products;
  let appointments;
  
  $: (async () => {
    console.log(
        "id:", id, typeof id,
        "shop id:", shop_ID,
        "current_user_id:", current_user_id, typeof current_user_id
    );
  })();
  $: console.log("products:", products);

  async function saveEdit(){
    mode = false;
    saveProducts(products);

  }

  function removeProductByIndex(index){
    if(products){
      products = products.filter((p, i) => i !== index);
    }
  }
  
  async function init(){
    makeApiInfoCall({
      type: "query_user",
      id,
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
      avatarSrc = REMOTE_ORIGIN + "/wp-content/uploads/avatar/" + _avatar;

      console.log("shop id:", shop_ID);

    }).then(() => {
      if(shop_ID){
        fetchProducts(
          shop_ID,
          _products => {
            products = _products;
            if(mode === "edit" || mode === "remove"){
              old_products = products.map(p => Object.assign({}, p));
            }
            status_message = "last queried at " + new Date().toLocaleString();
          }
        );

        fetchAppointments(_appointments => {
          appointments = _appointments;
        });
      } else{
        location.replace(location.origin + "/404");
      }

      loading = false;
    });
  }

  
  if(id){
    init();
  } else if(current_user_id){
    id = current_user_id;
    init();
  } else{
    location.replace(location.origin + "/404");
  }

</script>

<svelte:head>
  <base href={REMOTE_ORIGIN} />
  <title>Care28 Shop</title>
</svelte:head>


<TopBar />
<div class="root">
  {#if loading}
    <div class="loading-panel">
      loading...
    </div>
  {/if}
  <div class="top-panel">
    <div class="top-panel-left-group">
      <Bio
        name={display_name}
        avatar={avatarSrc}
        description={description}
        owner={current_user_id === id}
      />

      <h1>SHOP</h1>
    </div>
    <div class="top-panel-right-group">
      <div class="shop-action-button-panel">
        {#if current_user_id === id }
          {#if mode === "edit" || mode === "remove"}
            <Button
            className="shop-action-button"
            on:click={saveEdit}>
              Save Edit
            </Button>
            <Button
            className="shop-action-button"
            on:click={() => {
              mode = false;
              products = old_products;
            }}>
              Cancel Edit
            </Button>
          {:else}
            <Button
            className="shop-action-button"
            on:click={() => {
              mode = "edit";
              if(products){
                old_products = products.map(p => Object.assign({}, p));
              }
            }}>
              Edit Shop
            </Button>
            <Button
            className="shop-action-button">
              View Page as client
            </Button>
            <Button
            className="view-my-profile-button"
            href={LOCAL_ORIGIN + "/profile"}>
              View My Profile
            </Button>
            <Button
                className="shop-action-button"
                href={LOCAL_ORIGIN + "/create-appointment"}>
              新增預約
            </Button>
          {/if}
        {:else}
          <Button
              className="shop-action-button"
              href={LOCAL_ORIGIN + "/make-appointment?agent_id=" + id}>
            約見 Appointment
          </Button>
        {/if}
      </div>
    </div>
  </div>
  <div class="products-panel">
    <div class="products-panel-header">
      <h2>貨架</h2>
      {#if mode === "edit" || mode === "remove"}
        <Button className="add-product-button"
            on:click={() => {
              products = [...products, {}];
            }}>
          Add Product
        </Button>
        <Button className={"remove-product-button " + (
          mode === "remove" ? "finish-removing-button" : ""
        )}
            on:click={() => {
              if(mode === "edit"){
                mode = "remove";
              } else if(mode === "remove"){
                mode = "edit";
              }
            }}>
          {mode === "edit" ?
            "Remove Product" :
            "Finish Removing Product"}
        </Button>
      {/if}
      <div class="products-query-status">
        { status_message }
      </div>
    </div>
    {#if Array.isArray(products)}
      {#each products as product, index}
        <Product mode={mode}
            bind:product
            on:remove={() => {
              removeProductByIndex(index);
            }} />
      {:else}
        <div style="margin-bottom: 50px">
          未有任何產品
        </div>
      {/each}
    {:else}
      Loading
    {/if}
  </div>
  <div>
    <h2>約見評價</h2>
    {#if Array.isArray(appointments)}
      {#each appointments as appointment}
        <Appointment { ...appointment } />
      {:else}
        未有約見評價
      {/each}
    {:else}
      Loading
    {/if}
  </div>
</div>


<style>
  .root {
    padding: 15px;
    font-family: Arial, Helvetica, sans-serif;
    position: relative;
  }

  .loading-panel {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
    background: white;
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

  .shop-action-button-panel :global(.shop-action-button),
  .shop-action-button-panel :global(.view-my-profile-button) {
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

  .products-panel-header :global(.finish-removing-button) {
    background: rgba(180, 255, 180, 0.8);
  }
  .products-panel-header :global(.finish-removing-button):hover {
    background: rgba(120, 190, 120, 0.8);
  }

  .products-panel-header .products-query-status {
    font-size: 0.6em;
    font-style: italic;
    margin-right: 0;
    margin-left: auto;
  }
</style>