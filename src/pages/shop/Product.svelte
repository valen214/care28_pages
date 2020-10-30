

<script lang="ts">
  import type { Product } from "../api";
  import { LOCAL_ORIGIN } from "../api";
  import Button from "../components/Button.svelte";
  import AreaSelect from "../components/AreaSelect.svelte";
  import MoreInfo from "../components/MoreInfo.svelte";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
  export let mode: string;
  let file_input: HTMLInputElement;

  export let product: Product;
  $: ({
    id, thumbnail, area, estate, price, status, lastUpdated
  } = product);
</script>


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
    <div class="left-group">
      <img class="thumbnail"
          src={thumbnail} alt="thumbnail" />
    </div>
    <div class="center-group">
      
      <div class:empty={!area} >{ area || "" }</div>
      <h2 class:empty={!estate} >{ estate || ""  }</h2>
    </div>
    <div class="right-group">
      <div class:empty={!price}>
        { price ? ("銀行1估價: " + price) : "" }
      </div>
      <div class:empty={!price}>
        { price ? ("銀行2估價: " + price) : "" }
      </div>
      {#if price}
        <div class:empty={!price}>
          <MoreInfo
              href={LOCAL_ORIGIN + "/qna#關心價"}
              title="這是甚麼?"/> 關心價: { price }
        </div>
      {/if}
      <div class:empty={!status}>
        { status || ""  }
      </div>
      <div class:empty={!lastUpdated}>
        { lastUpdated ? ("最後更新於: " + lastUpdated) : "" }
      </div>
      
    </div>
    <div class="bottom-group">

    </div>
  {/if}
</div>


<style>
  h2 {
    margin: 0;
    padding: 0;
  }

  .product {
    position: relative;
    display: grid;
    grid-template-areas:
        "l c r"
        "l b b";
    grid-template-columns: 180px 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    /* height: 100px; */
    width: 100%;
    margin-bottom: 15px;
    column-gap: 15px;
  }
  .product .left-group    { grid-area: l; }
  .product .center-group  { grid-area: c; }
  .product .right-group   { grid-area: r; }
  .product .bottom-group  { grid-area: b; }

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
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
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