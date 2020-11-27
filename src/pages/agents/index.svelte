<script lang="ts">
  import type { Agent } from "../../api";
  import { getOutstandingAgents } from "../../api/agents";
  import TopBar from "../components/TopBar.svelte";
  import AgentCard from "../home/AgentCard.svelte";

  let agents: { [id: string]: Agent } = {};

  getOutstandingAgents(
  ).then(_agents => {
    agents = _agents;
  });

</script>



<TopBar />
<div class="page-content">
  <h2>最佳經紀</h2>
  {#each Object.values(agents) as agent}
    <AgentCard { ...agent } />
  {/each}
</div>


<style>
  .page-content {
    padding: 15px;
  }
</style>