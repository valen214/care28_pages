


<script lang="ts">
  import type { Agent } from "./api";
  import TopBar from "./components/TopBar.svelte";
  import Button from "./components/Button.svelte";
  import {
    getAgentIdFromQuery,
    getAgentInfo,
    submitAppointment
  } from "./appointment/functions";
  import { getCurrentUserID } from "./api/session";

  let loading = true;
  export let id = getAgentIdFromQuery();
  const TODAY: string = (d => {
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
  })( new Date() );
  let date: string = TODAY;
  let message: string = "";

  let agent: Agent;
  getAgentInfo(id).then(_agent => {
    if(_agent){
      agent = _agent;
    } else{
      
    }
    loading = false;
  });

</script>

<style>
  .page-content {
    height: 100%;
    width: 100%;
    padding: 15px;
    position: relative;

    font-size: 24px;

    display: grid;
    grid-template-areas:
        "top      client"
        "button   button";
    grid-template-rows: 600px 1fr;
    grid-template-columns: 50% 1fr;
  }
  .top-panel { grid-area: top; }
  .client-message-panel { grid-area: client; }
  .button-panel { grid-area: button; }

  .loading-screen {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
  }

  .top-panel {
    height: 200px;
    width: 100%;
  }

  .top-panel .agent-name-row {
    height: 42px;
  }

  .top-panel .date-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 80px;
  }

  .top-panel .date-row input {
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 42px;
    font-size: 24px;
    margin-left: 15px;
  }


  .content-panel {
    width: 100%;
  }

  .client-message-panel {
    height: auto;
  }

  .client-message-input {
    height: 300px;
    width: 100%;
    font-size: 24px;
    padding: 5px;
  }

  .button-panel {
    height: 180px;
  }
</style>



<TopBar />
<div class="page-content">
  {#if loading}
    <div class="loading-screen">
      Loading...
    </div>
  {/if}
  <div class="top-panel">
    <h2>Appointment</h2>
    <div class="agent-name-row">
      Agent: { agent?.name }
    </div>
    <label class="date-row">
      Date:
      <input type="date"
          bind:value={date}
          required={true}
          min={TODAY} />
    </label>
  </div>
  <div class="content-panel">
    <div class="client-message-panel">
      <span>Message to Agent:</span><br />
      <textarea class="client-message-input"
          bind:value={message} />
    </div>
  </div>
  <div class="button-panel">
    <Button on:click={async () => {
      loading = true;
      let result = await submitAppointment(id, getCurrentUserID(), date, message);
      console.log(result);
      loading = false;
    }}>
      Submit Appointment
    </Button>
  </div>
</div>