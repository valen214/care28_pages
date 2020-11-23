<script lang="ts">
  import { getAllPosts, LOCAL_ORIGIN } from "../../api";

  import TopBar from "../components/TopBar.svelte";
  import SearchPanel from "./SearchPanel.svelte";

  let articles = [];
  getAllPosts().then(_posts => {
    articles = _posts;
  })
</script>

<TopBar />
<div class="page-content">
  <SearchPanel />
  <div>
    {#each articles as article}
      <a href={ LOCAL_ORIGIN + "/article/" + article.id }
          style="
          display: block;
          padding: 15px;
          background: rgba(255, 255, 255, 0.8);
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);">
        { article.title }
      </a>
    {/each}
  </div>
</div>


<style>

</style>