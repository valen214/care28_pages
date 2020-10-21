

<script lang="ts">
  import type { Appointment } from "../api";
  import Button from "../components/Button.svelte";
  
  export let appointment: Appointment;
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
  {#if viewAs === "agent"}
  <div>
    客戶名稱: { appointment?.local?.client_name || "" }
  </div>
  {:else}
    經紀名稱: { appointment?.local?.agent_name }
  {/if}
  <div>
    預約日期: { appointment?.requested_date || "待設定" }
  </div>
  <div>
    狀態: { status }
  </div>
  <Button className="view-appointment-details">
    查看或更改預約內容
  </Button>
  {#if viewAs === "agent"}
    {#if !appointment.confirmed}
      <Button className="confirm-appointment">
        確認預約
      </Button>
    {/if}
    <Button className="w50">
      拒絕預約
    </Button>
  {/if}
</div>

<style>
  .appointment {
    display: grid;
    row-gap: 15px;
    padding: 15px;
    font-size: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  :global(.w50) {
    width: 50%;
  }

  :global(.view-appointment-details) {
    width: 50%;
  }

  :global(.confirm-appointment) {
    width: 50%;
  }
</style>