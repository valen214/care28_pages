

<script lang="ts">
  import type { Product } from "../../api";
  import { LOCAL_ORIGIN, IMAGE_BASE_PATH } from "../../api";
  import Button from "../components/Button.svelte";
  import AreaSelect from "../components/AreaSelect.svelte";
  import MoreInfo from "../components/MoreInfo.svelte";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
  let file_input: HTMLInputElement;

  export let product: Product;
  export let agent_id: string | number = "";
  export let shop_id: string | number = "";
  $: ({
    id, thumbnail, area, estate, price, status, lastUpdated,
    valuation1_name, valuation1,
    valuation2_name, valuation2,
    last_transaction_date,
    last_transaction_price,
    block, flat, floor, saleable_area,
    partition, unit_rate, agent_remark,
    recent_similar_transaction, hand
  } = product);

  $: parsed_image_src = !thumbnail ? "" : 
      thumbnail.startsWith("http") ? thumbnail :
      IMAGE_BASE_PATH + thumbnail;

      
  $: make_appointment_href = (
    LOCAL_ORIGIN + "/make_appointment" +
    (q => q ? "?" + q : "")([
      id && ("product=" + id),
      agent_id && ("agent=" + agent_id),
      shop_id && ("shop=" + shop_id)
    ].filter(Boolean).join("&"))
  );
</script>


<div class="product">
  <div class="left-group">
    <img class="thumbnail"
        src={parsed_image_src} alt="thumbnail" />
  </div>
  <div class="center-group">
    
    <div class:empty={!area} >{ area || "" }</div>
    <h2 class="w100" class:empty={!estate} >{ estate || ""  }</h2>
    {#if block}<span class="w30">座: {block}</span>{/if}
    {#if flat}<span class="w30">室: {flat}</span>{/if}
    {#if floor}<span class="w30">層: {floor}</span>{/if}<span class="break-flex"></span>
    {#if partition}<div class="w30">間隔: {partition}</div>{/if}
    {#if saleable_area}<div class="w30">實積: {saleable_area}</div>{/if}
  </div>
  <div class="right-group">
    <div class:empty={!price}>
      {
        valuation1_name && valuation1 ?
          `${valuation1_name}: ${valuation1}` :
          ""
      }
    </div>
    <div class:empty={!price}>
      {
        valuation2_name && valuation2 ?
          `${valuation2_name}: ${valuation2}` :
          ""
      }
    </div>
    {#if price}
      <div class:empty={!price}>
        <MoreInfo
            href={LOCAL_ORIGIN + "/qna#關心價"}
            title="這是甚麼?"/> 關心價 ($百萬): { price }
      </div>
    {/if}
    {#if unit_rate}
      <div>呎價: {unit_rate}</div>
    {/if}
    {#if recent_similar_transaction}
      <div>近期同座不同層單位成交: {recent_similar_transaction}</div>
    {/if}
    <div class:empty={!status}>
      { status || ""  }
    </div>
    <div class:empty={!lastUpdated}>
      { lastUpdated ? ("最後更新於: " + lastUpdated) : "" }
    </div>
    
  </div>
  <div class="bottom-group">
    <Button style={{
        "align-self": "center",
        "justify-self": "flex-end",
        // "transform": "translateY(-67%)",
        "margin-right": "30px",
      }}
      background="rgba(80, 230, 80, 1.0)"
      hoverbgcolor="rgba(40, 200, 40, 1.0)"
      href={make_appointment_href}>預約睇樓</Button>
  </div>
</div>


<style>
  .w30 {
    display: inline-block;
    width: 30%;
  }
  .w100 {
    width: 100%;
  }
  .break-flex {
    page-break-after: always;
    break-after: always;
  }

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

  .product .center-group {
    display: flex;
    flex-wrap: wrap;
    row-gap: 5px;
  }

  .product .bottom-group {
    display: grid;
  }
</style>