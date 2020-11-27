<script lang="ts">
  import { getPost, LOCAL_ORIGIN, makeApiCall, makeFormPost } from "../../api";
  import type { Post } from "../../api";
  import Button from "../components/Button.svelte";

  import TopBar from "../components/TopBar.svelte";
  import { getArticleID } from "./functions";

  let article_id: number = getArticleID();
  let post: Post = {};

  let loading = true;
  getPost(article_id).then(_post => {
    post = _post;
    loading = false;
  });
</script>


<TopBar />
{#if loading}
  <div class="loading-overlay">
    Loading...
  </div>
{:else}
  <div class="page-content">
    <Button href={LOCAL_ORIGIN + "/articles"}>返回所有文章</Button>
    <h2>{ post.title }</h2>
    <div>
      {@html post.content }
    </div>
  </div>
{/if}


<style>
  .loading-overlay {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .page-content {
    padding: 15px;
  }
</style>