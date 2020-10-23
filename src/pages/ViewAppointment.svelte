<script lang="ts">
  import { writable } from "svelte/store";

  import TopBar from "./components/TopBar.svelte";
  import Button from "./components/Button.svelte";
  import Chat from "./components/chat/Chat.svelte";

  import type { TMessage } from "./components/chat";
  import { MESSAGE_TYPE } from "./components/chat";
  
  import type { Appointment } from "./api";
  import { confirmAppointment } from "./api";
  import {
    getCurrentUserID,
    makeApiAppointmentCall,
    transformPayloadToAppointment
  } from "./api";
  
  import { getAppointmentIdFromQuery } from "./view-appointment/functions";
  
  let current_user_id = getCurrentUserID();
  let appointment_id = getAppointmentIdFromQuery();
  let appointment: Appointment;
  $: status = (
    appointment?.cancelling ?
      "預約取消中 (等待客戶共識)" :
    appointment?.confirmed ?
      "已確認" :
    appointment?.finished ?
      "closed" :
      "等待確認中"
  );
  let messages = writable<TMessage[]>([]);

  let message = "Loading...";
  (async () => {
    console.log("appointment_id:", appointment_id);
    if(!appointment_id){
      message = "appointment does not exist";
      return;
    }
    let res = await makeApiAppointmentCall({
      "type": "query_appointment",
      "appointment_id": appointment_id,
    }).then(res => res.json());
    
    appointment = transformPayloadToAppointment(res.result?.[0]);
    if(!appointment){
      message = "appointment does not exist";
      return;
    }
    if(appointment.id !== appointment_id){
      message = "server responds an appointment with different id!";
      return;
    }

    console.log(appointment);

    $messages = [{
      type: MESSAGE_TYPE.SYSTEM,
      text: "user requested for appointment on " + appointment.initiated_date
    }, {
      type: MESSAGE_TYPE.LEFT,
      text: "hello I would like to have more info on XXXXX"
    }];

    message = null;
  })().catch(e => {
    console.error(e);
  });

  type ON_MESSAGE_EVENT_TYPE = {
    detail: { text: string }
  };
  function onNewMessage({ detail: { text } }: ON_MESSAGE_EVENT_TYPE){
    $messages = [
      ...$messages, {
        type: MESSAGE_TYPE.RIGHT,
        text: text
      }
    ]
  }

  function onConfirmAppointment(){
    let newMessage = {
      type: MESSAGE_TYPE.SYSTEM,
      text: "agent confirmed the appointment on " + new Date().toLocaleString()
    };
    confirmAppointment(appointment.id, newMessage.text);
    $messages = [
      ...$messages,
      newMessage
    ];
    appointment.confirmed = true; 
  }
  function onCancelAppointment(){
    let newMessage = {
      type: MESSAGE_TYPE.SYSTEM,
      text: "agent requested to cancel the appointment on " + new Date().toLocaleString()
    };
    $messages = [
      ...$messages,
      newMessage
    ];
    appointment.cancelling = true; 
  }


</script>

<svelte:head>
  <title>Care28 - View Appointment</title>
</svelte:head>

<TopBar />
{#if message}
  <div class="fullpage-screen">
    { message || "" }
  </div>
{:else}
  <div class="page-content">
    <div class="top-panel">
      <div class="appointment-details">
        <h2>
          預約
        </h2>
        <div>
          經紀名稱: { appointment?.agent_name || "" }
        </div>
        <div>
          客戶名稱: { appointment?.client_name || "" }
        </div>
        <div>
          預約日期: { appointment?.requested_date || "待設定" }
        </div>
        <div>
          預約狀態: { status }
        </div>
      </div>
      <div class="action-button-panel">
        {#if appointment.cancelling}
          <Button className="cancelling-button">
            預約取消中 (等待客戶共識)
          </Button>
        {:else if appointment.confirmed}
          <Button on:click={onCancelAppointment}>取消預約</Button>
        {:else}
          <Button>要求更改預約日期</Button>
          <Button on:click={onConfirmAppointment}>確認預約</Button>
          <Button>拒絕預約</Button>
        {/if}
      </div>
    </div>
    <Chat
        className="chat-container"
        messages={$messages}
        on:message={onNewMessage} />
  </div>
{/if}




<style>
  :global(body) {
    font-size: 24px;
  }

  .fullpage-screen {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .page-content {
    width: 100%;
    height: auto;
  }

  .top-panel {
    width: 100%;
    height: auto;
    display: flex;
  }

  .appointment-details {
    padding: 15px;
    display: grid;
    row-gap: 15px;
    width: 50%;
  }

  .action-button-panel {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 15px;
  }
  .action-button-panel :global(.cancelling-button) {
    background: rgba(255, 50, 50, 1.0);
    color: white;
  }

  .page-content :global(.chat-container) {
    min-height: 500px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
</style>