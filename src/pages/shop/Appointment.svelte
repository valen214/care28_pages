

<script>
  import Button from "../components/Button.svelte";

  export let client_id;
  export let client_name;
  
  let reveal_client_name = false;

  console.log("client_id:", client_id);
</script>

<style>
  .appointment {
    margin-bottom: 15px;
  }

  .appointment .first-row {
    display: flex;
    column-gap: 5px;
  }
</style>

<div class="appointment">
  <div class="first-row">
    客戶名稱: <Button on:click={(e) => {
      reveal_client_name = true;
    }}>
      {#if reveal_client_name}
        { client_name }
      {:else}&lt;已隱藏&gt;{/if}
    </Button>
  </div>
</div>