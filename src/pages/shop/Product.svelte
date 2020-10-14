

<script>
  import Button from "../components/Button.svelte";
  import AreaSelect from "../components/AreaSelect.svelte";

  export let edit;
  let file_input;

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

  .product .thumbnail {
    width: 16%;
    object-fit: cover;
  }
  .product .thumbnail.edit {
    cursor: pointer;
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


  .product > span.empty {
    border: 1px solid rgba(255, 0, 0, 0.5);
  }
</style>

<div class="product">
  {#if edit}
    <input type="file" style="display:none" bind:this={file_input}/>
    <img src={thumbnail}
        class="thumbnail edit"
        alt="thumbnail"
        on:click={() => {
          if(file_input){
            file_input.click();
          }
        }} />
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
    <img class="thumbnail"
        src={thumbnail} alt="thumbnail" />
    <span class:empty={!area} >{ area || "" }</span>
    <span class:empty={!estate} >{ estate || ""  }</span>
    <span class:empty={!price} >{ price || ""  }</span>
    <span class:empty={!status} >{ status || ""  }</span>
    <span class:empty={!lastUpdated} >{ lastUpdated || ""  }</span>
  {/if}
</div>