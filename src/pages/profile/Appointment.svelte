

<script lang="ts">
  import type { Appointment as TAppointment } from "../api";
  import { confirmAppointment } from "../api";
  import Button from "../components/Button.svelte";
  
  export let appointment: TAppointment;
  export let viewAs: string = "client";

  $: status = (
    appointment.confirmed ?
      "已確認" :
    appointment.finished ?
      "closed" :
      "等待確認中"
  );
</script>

<div class="appointment">
  <div class="appointment-details-panel">
    {#if viewAs === "agent"}
      <div class="flex-start-center">
        客戶名稱: { appointment?.client_name || "" }
      </div>
    {:else}
      <div class="flex-start-center">
        經紀名稱: { appointment?.agent_name }
      </div>
    {/if}
    <div class="flex-start-center">
      預約日期: { appointment?.requested_date || "待設定" }
    </div>
    <div
        class="flex-start-center"
        class:confirmed={appointment.confirmed}
        class:awaiting-confirmation={!appointment.confirmed && !appointment.finished}>
      狀態: { status }
    </div>
  </div>
  <div class="appointment-action-buttons-panel">
    <Button
        className="view-appointment-details"
        href={"/view-appointment?id=" + appointment.id}>
      查看或更改預約內容
    </Button>
    {#if viewAs === "agent"}
      {#if !appointment.confirmed}
        <Button className="confirm-appointment"
            background="rgba(45, 208, 45, 0.5)"
            hoverbgcolor="rgba(15, 128, 15, 0.5)"
            on:click={async () => {
              let res = await confirmAppointment(
                appointment.id,
                "agent confirmed the appointment on " + new Date().toLocaleString()
              );
              console.assert(res.status === "appointment confirmed");
              appointment.confirmed = true;
            }}>
          確認預約
        </Button>
      {/if}
      <Button className="w50">
        拒絕預約
      </Button>
    {/if}
  </div>
</div>

<style>
  .flex-start-center {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .appointment {
    display: grid;
    padding: 15px;
    font-size: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    grid-template-columns: 50% 1fr;
  }
  .appointment-details-panel {
    grid-column: 1;

    display: grid;
    row-gap: 15px;
  }
  .appointment-action-buttons-panel {
    grid-column: 2;

    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  :global(.w50) {
    width: 50%;
  }

  :global(.view-appointment-details) {
    width: 50%;
    color: white;
  }

  :global(.confirm-appointment) {
    width: 50%;
  }

  .confirmed {
    background: rgba(45, 238, 45, 0.2);
  }
  .awaiting-confirmation {
    background: rgb(238, 238, 15, 0.7);
  }
</style>