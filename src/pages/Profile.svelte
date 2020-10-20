
<script lang="ts">
  import { writable } from "svelte/store";

  import { getCurrentUserID } from "./api/session";
  import TopBar from "./components/TopBar.svelte";
  import { init } from "./profile/functions";
  import Bio from "./profile/Bio.svelte";
  import Appointment from "./profile/Appointment.svelte";

  let loading = true;
  let current_user_id = getCurrentUserID();

  let name = writable("");
  let avatar = writable("");
  let pending_appointments = writable([]);


  (async function(){

    if(current_user_id){
      await init(
        current_user_id,
        name,
        avatar,
        pending_appointments
      );
      loading = false;
    } else {
      location.href = location.origin + "/login";
    }
  })();


</script>


<TopBar />
{#if loading}
  <div class="w100 h100 flex-center">
    Loading...
  </div>
{:else}
  <div>
    <Bio name={$name} avatar={$avatar} />
  </div>
  <h2>Appointments</h2>
  <h3>Pending Appointments</h3>
  {#each $pending_appointments as appointment}
    <Appointment appointment={appointment} />
  {:else}
    <div>
      No pending appointments
    </div>
  {/each}
{/if}


<style>
  :global(body) {
    font-size: 24px;
  }

  .w100 {
    width: 100%;
  }
  .h100 {
    height: 100%;
  }
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>