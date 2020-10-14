

<script>
  import Button from "../components/Button.svelte";
  import Bio from "./Bio.svelte";

  export let client_id;
  export let client_name = "";
  export let area;
  export let estate;
  export let rating_attitude;
  export let rating_info;
  export let rating_time;
  export let rating_property;
  export let rating_overall;
  export let feedback;
  
  $: displayed_client_name = [...client_name].map((c, i) => {
      return i == 0 ? c : "X";
  }).join("");

  let reveal_rating = false;

  console.log("client_id:", client_id);
</script>

<style>
  .appointment {
    margin-bottom: 30px;
  }

  .appointment .first-row {
    display: flex;
    column-gap: 5px;
    width: 100%;
    height: 60px;
  }
  .appointment .first-row > span:not(.client-name):not(.rating-categories) {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .appointment .first-row .client-name {
    width: 16%;
    display: flex;
    align-items: center;
  }
  .appointment > .first-row > .rating-categories {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .appointment .second-row {
    display: flex;
  }

  .rating-list {

  }
</style>

<div class="appointment">
  <div class="first-row">
    <span class="client-name">客戶名稱: { displayed_client_name }</span>
    <span>{ area }</span>
    <span>{ estate }</span>
    <span>評分: { rating_overall }</span>
    <span class="rating-categories">
      <span>細項: </span>
      <Button
          hoverbgcolor="#eee"
          activebgcolor="#eee"
          on:mouseover={() => {
            reveal_rating = true;  
          }}
          on:mouseleave={() => {
            reveal_rating = false;
          }}
      >
      {#if reveal_rating}
          <div class="rating-list">
            <span>態度: { rating_attitude }</span><br />
            <span>資料: { rating_info }</span><br />
            <span>時間: { rating_time }</span><br />
            <span>樓盤: { rating_property }</span><br />
            <span>整體: { rating_overall }</span><br />
          </div>
      {:else}
        (5個)
      {/if}
    </Button></span>
  </div>
  <div class="second-row">
    客戶意見: { feedback }
  </div>
</div>