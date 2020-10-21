

<script lang="ts">
  import type { Product } from "../api";
  import Button from "../components/Button.svelte";
  import AreaSelect from "../components/AreaSelect.svelte";
	import { createEventDispatcher } from 'svelte';
  import type { login } from "../api/session";

	const dispatch = createEventDispatcher();
  export let mode: string;
  let file_input: HTMLInputElement;

  export let product: Product;
  $: ({
    id, thumbnail, area, estate, price, status, lastUpdated
  } = product);
</script>

<style>
  .product {
    display: flex;
    height: 100px;
    width: 100%;
    margin-bottom: 15px;
    column-gap: 15px;
    position: relative;
  }

  .product .remove-mode-cover {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    
    z-index: 1000;
    background: rgba(255, 180, 180, 0.8);
    cursor: pointer;
    font-size: 30px;
  }
  .product .remove-mode-cover:hover {
    background: rgba(240, 100, 100, 0.8);
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
  {#if mode === "edit"}
    <input type="file"
        style="display:none"
        bind:this={file_input}
        on:change={() => {
          console.log("on file change");
        }}
        on:input={() => {
          console.log('on file input');
          product.upload = {
            thumbnail: file_input.files[0]
          };
        }}/>
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
    {#if mode === "remove"}
      <div class="remove-mode-cover"
          on:click={() => {
            dispatch("remove", {
              id: id
            });
          }}>
        Click to remove
      </div>
    {/if}
    <img class="thumbnail"
        src={thumbnail} alt="thumbnail" />
    <span class:empty={!area} >{ area || "" }</span>
    <span class:empty={!estate} >{ estate || ""  }</span>
    <span class:empty={!price} >{ price || ""  }</span>
    <span class:empty={!status} >{ status || ""  }</span>
    <span class:empty={!lastUpdated} >{ lastUpdated || ""  }</span>
  {/if}
</div>