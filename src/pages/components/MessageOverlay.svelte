<script lang="ts">
  import { writable } from "svelte/store";

  export let show: boolean = false;
  export let message: string = "";
  export let style: any = {
    "background": "white",
  };
  $: parsed_style = ((): string => {
    if(typeof style === "string"){
      return style;
    } else {
      return `--style-background: ${style.background}`;
    }
  })();

  let overlay_base = writable<HTMLDivElement>(null);
  let unsubscriber = overlay_base.subscribe((elem) => {
    if(!elem){
      console.log("MessageOverlay: bind this is set to null");
      return;
    }
    let pos = elem.parentElement.style.position;
    if(pos === "absolute" || pos === "relative"){
      unsubscriber();
    } else{
      console.warn(
          "MessageOverlay parent is not absolutely positioned:",
          pos);
    }
  })
  
</script>

{#if show}
  <div bind:this={$overlay_base}
      class="overlay-base"
      style={parsed_style}>
    { message || "" }
    <slot></slot>
  </div>
{/if}

<style>
  .overlay-base {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: var(--style-background);

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>