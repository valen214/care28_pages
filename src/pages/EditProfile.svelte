
<script lang="ts">
  import type { User } from "../api";
  import { makeApiCall } from "../api";
  import { LOCAL_ORIGIN, getCurrentUserID } from "../api";
  import TopBar from "./components/TopBar.svelte";
  import Button from "./components/Button.svelte";

  import { init } from "./edit-profile/functions";

  let message = "loading...";

  let current_user_id = getCurrentUserID();
  let user_info: User;
  let original_user_info: User;
  let avatar_file_input: HTMLInputElement;

  (async () => {
    user_info = await init(current_user_id);
    original_user_info = Object.assign({}, user_info);

    message = "";
  })();
</script>



<TopBar />
<div class="page-content">
  {#if message}
    <div class="message-overlay">{ message }</div>
  {:else}
    <div class="edit-profile-panel">
      <div class="avatar">
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
      <div class="displayed-name">
        <span class="field-label">
          Displayed Name:
        </span>
        <input type="text" bind:value={user_info.name} />
      </div>
      <div class="phone-number">
        <span class="field-label">
          Phone Number:
        </span>
        <input type="text" bind:value={user_info.phone} />
      </div>
      <div class="license-upload">
        <span class="field-label">
          License:
        </span>
        <input type="file" />
      </div>
      <div class="default-location p15">
        <span class="field-label">
          Location:
        </span>
        <input type="text" bind:value={user_info.location}  />
      </div>
      <div class="buttons-panel">
        <Button on:click={async () => {
              message = "loading...";

              let fields = Object.entries(
                user_info
              ).reduce((out, [key, value]) => {
                if(value !== original_user_info[key]){
                  out[key] = value;
                }
                return out;
              }, {})

              let a = await makeApiCall("/wp-json/api/v2/info", {
                "type": "edit_user",
                "fields": fields
              }).catch(console.error);

              location.href = LOCAL_ORIGIN + "/edit-profile"; // reload
              message = "upload completed! reloading...";
            }}>Confirm Edit</Button>
        <Button href={LOCAL_ORIGIN + "/profile"}>Cancel Edit</Button>
      </div>
    </div>
  {/if}
</div>


<style>
  input {
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 24px;
    height: 50px;
  }

  .p15 {
    padding: 15px;
  }

  .page-content {
    padding: 15px;
    font-size: 24px;
  }
  .message-overlay {
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .field-label {
    width: 30%;
    display: inline-block;
  }

  .edit-profile-panel {
    display: grid;
  }

  .displayed-name {
    padding: 15px;
  }

  .phone-number {
    padding: 15px;
  }

  .license-upload {
    padding: 15px;
  }

  .avatar-img {
    cursor: pointer;
    height: 300px;
    object-fit: contain;
  }

  .avatar-file-input {
    display: none;
  }
</style>