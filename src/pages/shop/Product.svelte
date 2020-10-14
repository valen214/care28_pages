

<script>
  import Button from "../components/Button.svelte";
  import AreaSelect from "../components/AreaSelect.svelte";

  export let edit;

  export let product;
  $: ({
    thumbnail, area, estate, price, status, lastUpdated
  } = product);
</script>

<style>
  .product {
    display: flex;
    height: 100px;
    width: 100%;
    margin-bottom: 15px;
    column-gap: 15px;
  }

  .product img {
    width: 16%;
    object-fit: cover;
  }

  .product > .text-input-field {
    font-size: 1.5em;
    height: 2em;
    width: 15%;
  }
  .product :global(.area-input-button) {
    font-size: 1.5em;
    height: 2em;
    width: 15%;
    justify-content: flex-start;
  }

  .product > span:first-of-type {
    margin-left: 5px
  }
  .product > span {
    width: 15%;
    font-size: 1.5em;
    padding-top: 11px;
  }
</style>

<div class="product">
  {#if edit}
    <img src={thumbnail} alt="thumbnail" />
    <AreaSelect
        className="area-input-button"
        bind:value={ product.area } />
    <input class="text-input-field" bind:value={ product.estate } />
    <input class="text-input-field" bind:value={ product.price } />
    <select class="text-input-field" bind:value={ product.status }>
      {#each ["可睇", "已售 (暫封盤)", "已售"] as status}
        <option value={status}>
          {status}
        </option>
      {/each}
    </select>
    <input class="text-input-field" bind:value={ product.lastUpdated } />
  {:else}
    <img src={thumbnail} alt="thumbnail" />
    <span>{ area }</span>
    <span>{ estate }</span>
    <span>{ price }</span>
    <span>{ status }</span>
    <span>{ lastUpdated }</span>
  {/if}
</div>