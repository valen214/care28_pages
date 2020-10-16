


<script>
  import TopBar from "./components/TopBar.svelte";
  import { REMOTE_ORIGIN } from "./api";

</script>

<svelte:head>
  <base href={REMOTE_ORIGIN} />
</svelte:head>

<TopBar />
<div>

  PAGE NOT FOUND
</div>