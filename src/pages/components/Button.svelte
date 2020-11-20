


<script lang="ts">
  // https://svelte.dev/tutorial/actions

  export let id = "";
  export let href = undefined;
  export let background = "";
  export let hoverbgcolor = "";
  export let activebgcolor = "";
  export let style: object | string = {};
  $: _style = (
    typeof style === "object"
  ) && Object.entries(
    style
  ).reduce((l, [k, v]) => {
    return l + `${k}: ${v};`;
  }, "");
  export let className = "";
  export let self: HTMLAnchorElement = null;

  export let clientHeight = 0;
</script>



<a { id } { href } on:click
    class={["button-class", className].join(" ")}
    bind:this={self}
    bind:clientHeight
    on:mouseover
    on:mouseleave
    style={[
      background && `--background: ${background}`,
      hoverbgcolor && `--hover-bg-color: ${hoverbgcolor}`,
      activebgcolor && `--active-bg-color: ${activebgcolor}`,
      (typeof style === "string") && style,
      _style,
    ].filter(Boolean).join(";")}>
  <slot></slot>
</a>


<style>
  .button-class {
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
  .button-class:hover {
    background: var(--hover-bg-color, #ccc);
  }
  .button-class:active {
    background: var(--active-bg-color, #aaa);
  }
</style>