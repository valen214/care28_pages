
<script lang="ts">
  import { writable, derived } from "svelte/store";

  import { LOCAL_ORIGIN, getCurrentUserID } from "./api";
  import TopBar from "./components/TopBar.svelte";
  import Button from "./components/Button.svelte";
  import { init } from "./profile/functions";
  import Bio from "./profile/Bio.svelte";
  import Appointment from "./profile/Appointment.svelte";

  let loading = true;
  let current_user_id = getCurrentUserID();

  let name = writable("");
  let avatar = writable("");
  let usertype = writable("");
  let appointments = writable([]);
  let pending_appointments = derived(
    appointments,
    $appointments => $appointments.filter(
      (appointment: any) => !appointment.confirmed
    )
  );
  let view_all_appointments = false;


  (async function(){

    if(current_user_id){
      await init(
        current_user_id,
        name,
        avatar,
        usertype,
        appointments
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
  <div class="top-panel w100">
    <Bio className="profile-bio" 
        name={$name} avatar={$avatar} />
    <div class="top-panel-button-panel">
      <Button className="w100"
          href={LOCAL_ORIGIN + "/shop"}>View My Shop</Button>
      <Button className="w100"
          href={LOCAL_ORIGIN + "/edit-profile"}>Edit Profile</Button>
    </div>
  </div>
  <h2>Appointments</h2>
  {#if view_all_appointments}
    <h3 class="inline-block">
      All Appointments
    </h3>
    <Button on:click={() => {
      view_all_appointments = false;
    }}>View Only Pending Appointments</Button>
  {:else}
    <h3 class="pending-appointments-title">
      Pending Appointments
    </h3>
    <Button on:click={() => {
      view_all_appointments = true;
    }}>View All Appointments</Button>
  {/if}
  {#each (view_all_appointments ?
      $appointments :
      $pending_appointments
  ) as appointment}
    <Appointment
        viewAs={$usertype}
        appointment={appointment}
    />
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
  .inline-block {
    display: inline-block;
  }

  .top-panel :global(.profile-bio){
    width: 70%;
  }

  :global(.w100) {
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


  .top-panel {
    display: flex;
  }

  .top-panel-button-panel {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 15px;
  }

  .pending-appointments-title {
    display: inline-block;
  }
</style>