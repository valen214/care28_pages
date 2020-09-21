
<svelte:options tag="my-app"/>

<script lang="ts">

  import Home from "./pages/Home.svelte";
  import Profile from "./pages/Profile.svelte";
  
  let target: string;
  switch(location.pathname.split("/")[1]){
  case "profile":
    target = Profile;
    break;
  case "home":
  default:
    target = Home;
    break;
  }
  

</script>
<style>
  body {
    background: #000;
  }
</style>

<svelte:component tag={target} />