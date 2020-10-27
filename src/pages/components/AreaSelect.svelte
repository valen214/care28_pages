
<script>
  import { stations } from "./AreaSelectData";
  import Button from "./Button.svelte";
  import { onMount } from 'svelte';
  export let className = "";
  export let value = "";

  let fullpage_popup;
  let show = false;
  let selected_line = "";
  let selected_station = "";
  $: if(selected_station){
    value = selected_station;
  }

  $: if(fullpage_popup) {
    document.body.appendChild(fullpage_popup);
  }
  
  onMount(() => {
    if(fullpage_popup) document.body.appendChild(fullpage_popup);
  });
</script>

<style>
  .fullpage-popup {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.5);
    display: none;
  }
  .fullpage-popup.show {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .area-select-panel {
    height: 50vh;
    width: 50vw;
    background: white;
    position: relative;
  }

  :global(.ok-button) {
    position: absolute;
    right: 15px;
    bottom: 15px;
  }
</style>

<Button { className } on:click={() => {
      show = true;
    }}>
  { value }
</Button>

{#if show}
  <div
      bind:this={fullpage_popup}
      class="fullpage-popup {show ? 'show' : ''}"
      on:click={e => {
        if(e.target === fullpage_popup){
          show = false;
        }
      }}>
    <div class="area-select-panel">
      {#each Object.keys(stations) as line}
        <Button
            on:click={() => {
              selected_line = line;
            }}
            style={(
                selected_line === line ?
                "background:#428bca;color:white;" :
                ""
            )}>
          { line }
        </Button>
      {/each}
      <hr />
      <div class="station-select-panel">
        {#if stations[selected_line]}
          {#each stations[selected_line] as station}
            <Button
                on:click={() => {
                  selected_station = station;
                }}
                style={(
                    selected_station && selected_station === station ?
                    "background:#428bca;color:white;" :
                    ""
                )}>
              { station }
            </Button>
          {/each}
        {/if}
      </div>
      <Button
          className="ok-button"
          on:click={() => {
            show = false;
          }}>
        OK
      </Button>
    </div>
  </div>
{/if}