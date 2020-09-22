



<svelte:options tag={"home-card"} />

<script>
  export let style;
  export let padding = "50px";

</script>

<style>
  * {
    box-sizing: border-box;
  }

  div {
    display: inline-block;
    padding: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),
                0 1px 1px 0 rgba(0,0,0,.14),
                0 1px 3px 0 rgba(0,0,0,.12);
  }
</style>
<!-- when it doesn't work
https://svelte.dev/repl/ff94ad9fbb18495099f2e6e31b86bc9e?version=3.9.2
-->
<div style="{style};{'padding:' + padding}">
  <slot name="name"></slot><br />
  <slot name="description"></slot>
</div>