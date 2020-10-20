

<script lang="ts">
  import type { Appointment } from "../api/TAppointment";
  import Button from "../components/Button.svelte";
  
  export let appointment: Appointment;

  $: status = (
    appointment.confirmed ?
      "confirmed by agent" :
    appointment.finished ?
      "closed" :
      "pending for agent approval"
  );
</script>

<div class="appointment">
  <div>
    target agent: { appointment.agent_ID }
  </div>
  <div>
    status: { status }
  </div>
  <Button className="view-appointment-details">
    View Appointment Details
  </Button>
</div>

<style>
  .appointment {
    display: grid;
    row-gap: 15px;
    padding: 15px;
    font-size: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  :global(.view-appointment-details) {
    width: 50%;
  }
</style>