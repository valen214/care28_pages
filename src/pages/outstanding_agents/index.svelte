<script lang="ts">
  import TopBar from "../components/TopBar.svelte";
  import { makeApiInfoCall } from "../../api";

  let agents;

  makeApiInfoCall({
    type: 'query_outstanding_agents'
  }).then(res => res.json()
  ).then(res => {
    agents = res;
  });
  
</script>


<TopBar />
<div class="page-content">
  <pre>
    { agents && JSON.stringify(agents, null, 2) }
  </pre>
</div>

<style>


</style>