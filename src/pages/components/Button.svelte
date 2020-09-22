

<svelte:options tag="component-button" />

<script>
  // https://svelte.dev/tutorial/actions

  export let id;
  export let background;
  export let hoverbgcolor;
  export let style;

  console.log(hoverbgcolor);
</script>



<button {id} on:click
    style={
      `background: ${background};` +
      `--hover-bg-color: ${hoverbgcolor};` +
      style
    }>
  <slot></slot>
</button>


<style>
  button {
    background: white;
    border: none;
    box-shadow: none;
    padding: 15px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  button:hover {
    background: var(--hover-bg-color, #ccc);
  }
  button:active {
    background: var(--active-bg-color, #aaa);
  }

</style>