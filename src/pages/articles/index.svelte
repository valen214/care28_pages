<script lang="ts">
  import { getAllPosts, LOCAL_ORIGIN } from "../../api";

  import TopBar from "../components/TopBar.svelte";
  import SearchPanel from "./SearchPanel.svelte";

  let search_string = "";

  let articles = [];
  let loading = true;
  getAllPosts().then(_posts => {
    articles = _posts;
    loading = false;
  })

  $: processed_articles = ((search_string) => {
    return articles.filter(article => {
      return (
        article?.title?.toLowerCase().includes(search_string) ||
        article?.content?.toLowerCase().includes(search_string)
      );
    });
  })(search_string.toLowerCase());

  $: console.log(search_string);
</script>

<TopBar />
<div class="page-content">
  <SearchPanel bind:search_string={search_string} />
  <div>
    {#if loading}
      <div style="width:100%;height:300px;
                  display:flex;
                  justify-content:center;
                  align-items:center">
        Loading...
      </div>
    {:else}
      {#each processed_articles as article}
        <a href={ LOCAL_ORIGIN + "/article/" + article.id }
            style="
            display: block;
            padding: 15px;
            background: rgba(255, 255, 255, 0.8);
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);">
          { article.title }
        </a>
      {:else}
        無文章結果
      {/each}
    {/if}
  </div>
</div>


<style>

</style>