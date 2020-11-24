<script lang="ts">
  import { LOCAL_ORIGIN } from "../../api";


  export let post: any = {};

</script>


<div class="post">
  <a class="title-link"
      href={LOCAL_ORIGIN + "/article/" + post.id}>
    { post.title || "" }
  </a>
  {#if post.date}
    <i class="upload-date">
      上載於 { post.date }
    </i>
  {/if}
</div>


<style>
  .post {
    display: flex;
    align-items: center;
    padding: 5px 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .title-link {
    width: 50%;
    height: 40px;
    display: flex;
    align-items: center;
  }

  .upload-date {
    margin: 0 0 0 auto;
  }
</style>