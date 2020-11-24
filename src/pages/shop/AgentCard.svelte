
<script lang="ts">
  import { AVATAR_BASE_PATH, LOCAL_ORIGIN } from "../../api";

  import Button from "../components/Button.svelte";

  export let id: number | string = '';
  export let shop_id: string | number = "";
  export let avatar: string = "";
  export let name: string = "";
  export let area: string = "";
  export let rating: number = NaN;

  $: parsed_avatar_src = !avatar ? "" :
      avatar.startsWith("http") ? avatar :
      AVATAR_BASE_PATH + avatar;

  $: make_appointment_href = (
    LOCAL_ORIGIN + "/make_appointment" +
    (q => q ? "?" + q : "")([
      id && ("agent=" + id),
      shop_id && ("shop=" + shop_id)
    ].filter(Boolean).join("&"))
  );

  $: console.log("avatar:", avatar);
</script>

<div class="agent-card">
  <img src={parsed_avatar_src} alt="avatar" />
  <div class="agent-info-container">
    <div class="agent-name">
      { name }
    </div>
    {#if area }
      <div>
        經營: { area }
      </div>
    {/if}
    <div>
      評分: { rating }
    </div>
    <Button
        style="white-space: initial"
        href={ make_appointment_href }>
      預約睇樓
    </Button>
  </div>
</div>

<style>
  .agent-card {
    height: 300px;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .agent-card img {
    height: 100%;
    width: 30%;
    object-fit: contain;
    object-position: top;
  }

  .agent-info-container {
    padding-left: 15px;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 15px;
  }

  .agent-name {
    margin-top: 15px;
    font-size: 1.5em;
  }
</style>