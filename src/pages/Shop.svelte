



<script>
  import { makeApiInfoCall, ORIGIN } from "./api";
  import TopBar from "./components/TopBar.svelte";
  import Bio from "./shop/Bio.svelte";
  import Product from "./shop/Product.svelte";
  import Appointment from "./shop/Appointment.svelte";
  import {
    fetchProducts,
    fetchAppointments
  } from "./shop/functions";

  export let id = null;

  let display_name;
  let shop_ID;
  let avatarSrc;
  let description;

  let products;
  let appointments;
  if(!id){
    id = 4;
  }

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
  }
</style>

<TopBar loggedin={true} />
<div class="root">
  <div class="top-panel">

    <Bio
      name={display_name}
      avatar={avatarSrc}
      description={description}
    />

    <h1>SHOP</h1>
  </div>
  <div>
    <h2>貨架</h2>
    {#each products as product}
      <Product { ...product } />
    {/each}
  </div>
  <div>
    <h2>約見評價</h2>
    {#each appointments as appointment}
      <Appointment { ...appointment } />
    {/each}
  </div>
</div>

