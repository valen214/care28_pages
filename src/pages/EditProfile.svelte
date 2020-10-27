
<script lang="ts">
  import type { User } from "./api";
  import { getCurrentUserID } from "./api";
  import TopBar from "./components/TopBar.svelte";

  import { init } from "./edit-profile/functions";

  let message = "loading...";

  let current_user_id = getCurrentUserID();
  let user_info: User;
  let avatar_file_input: HTMLInputElement;

  (async () => {
    user_info = await init(current_user_id);

    message = "";
  })();
</script>



<TopBar />
{#if message}
  <div class="full-page-content">
    { message }
  </div>
{:else}
<div class="page-content">
  <img alt="avatar"
      class="avatar-img"
      src={user_info.avatar}
      on:click={() => {
        if(avatar_file_input){
          avatar_file_input.click();
        }
      }} />
  <input type="file"
      bind:this={avatar_file_input}
      class="avatar-file-input" />
</div>
{/if}

<style>
  .page-content {
    padding: 15px;
  }

  .avatar-img {
    cursor: pointer;
  }

  .avatar-file-input {
    display: none;
  }
</style>