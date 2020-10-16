
<script lang="ts">
  import Button from "../components/Button.svelte";

  export let id: number | string = '';
  export let avatar: string = "";
  export let name: string = "";
  export let area: string = "";
  export let rating: number = NaN;

  $: console.log("avatar:", avatar);
</script>

<div class="agent-card">
  <img src={avatar} alt="avatar" />
  <div class="agent-info-container">
    <div class="agent-name">
      { name }
    </div>
    {#if area }
      <div>
        經營: { area }
      </div>
    {/if}
    <div>
      評分: { rating }
    </div>
    <Button
        style="white-space: initial"
        href={ id ? ( "/shop/" + id ) : undefined }
        on:click={() => {
          document.location.replace(location.origin + "/shop/" + id);
        }}>
      看有關{ name }的報告
    </Button>
  </div>
</div>

<style>
  .agent-card {
    height: 300px;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .agent-card img {
    height: 100%;
    width: 30%;
    object-fit: contain;
  }

  .agent-info-container {
    padding-left: 15px;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 15px;
  }

  .agent-name {
    margin-top: 15px;
    font-size: 1.5em;
  }
</style>