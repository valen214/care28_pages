


<script>
  // https://svelte.dev/tutorial/actions

  export let id = "";
  export let href = undefined;
  export let background = "";
  export let hoverbgcolor = "";
  export let activebgcolor = "";
  export let style = "", _style = "";
  export let className = "";

  export let clientHeight = 0;
</script>



<a { id } { href } on:click
    class={[className].join(" ")}
    bind:clientHeight
    on:mouseover
    on:mouseleave
    style={[
      background && `--background: ${background}`,
      hoverbgcolor && `--hover-bg-color: ${hoverbgcolor}`,
      activebgcolor && `--active-bg-color: ${activebgcolor}`,
      style,
      _style,
    ].filter(Boolean).join(";")}>
  <slot></slot>
</a>


<style>
  a {
    background: var(--background, white);
    border: none;
    box-shadow: none;
    padding: 15px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
    white-space: nowrap;
    user-select: none;

    text-decoration: none;
    color: inherit;

    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  a:hover {
    background: var(--hover-bg-color, #ccc);
  }
  a:active {
    background: var(--active-bg-color, #aaa);
  }
</style>