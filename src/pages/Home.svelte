

<svelte:options tag={"pages-home"} />

<script>

  export let products = {
    "1": {
      name: "product NAME",
      description: "HELLO WORLD! product description"
    }
  };
</script>


<style>
  .top-bar {
    height: 80px;
  }
  div {
    border: 1px solid black;
  }
</style>

<div class="top-bar">

</div>
<div>
  {#each Object.entries(products) as [ id, { name, description }] }
    <home-card class="card" style="width:100px">
      <span slot="name">
        {name}
      </span>
      <span slot="description">
        {description}
      </span>
    </home-card>
  {/each}
</div>