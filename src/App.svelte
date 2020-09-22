
<svelte:options tag="my-app"/>

<script>
  let path = location.pathname.split("/")[1];
  let props = {};

  console.log("path:", path);

  // search passing props to custom element
</script>





{#if path === "login"}
  <pages-login />
{:else if path === "profile"}
  <pages-profile {...{
    username: "Valen",
    usertype: "client"
  }} />
{:else}
  <pages-home products={JSON.stringify({
    "5": {
      "name": "2",
      "description": "3"
    }
  })} />
{/if}