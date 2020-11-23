<script lang="ts">
  import { LOCAL_ORIGIN } from "../../api";


  export let post: any = {};
  console.log(post);

</script>


<div class="post">
  <a href={LOCAL_ORIGIN + "/article/" + post.id}>
    { post.title || "" }
  </a>
</div>


<style>
  .post {
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
</style>