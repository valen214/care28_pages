


<script lang="ts">
  import type { Agent } from "../api";
  import TopBar from "./components/TopBar.svelte";
  import Button from "./components/Button.svelte";
  import {
    getAgentIdFromQuery,
    getProductIdFromQuery,
    getShopIdFromQuery,
    getAgentInfo,
    submitAppointment
  } from "./appointment/functions";
  import { getCurrentUserID } from "../api/session";

  let loading = true;
  export let agent_id = getAgentIdFromQuery();
  export let product_id = getProductIdFromQuery();
  export let shop_id = getShopIdFromQuery();
  $: console.log("shop_id:", shop_id);

  const TODAY: string = (d => {
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
  })( new Date() );
  let date: string = TODAY;
  let message: string = "";

  let agent: Agent;
  getAgentInfo(agent_id).then(_agent => {
    if(_agent){
      agent = _agent;
    } else{
      
    }
    loading = false;
  });

</script>


<TopBar />
<div class="page-content">
  {#if loading}
    <div class="page-covering-screen">
      { message || "Loading..." }
    </div>
  {/if}
  <div class="info-panel">
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
    <div class="product-name-row">
      Product: <input type="text" value={"product id: " + product_id}/>
    </div>
  </div>
  <div class="map-panel">
    MAP
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
      message = "loading...";
      loading = true;
      let result = await submitAppointment(
          agent_id, getCurrentUserID(), date, message);
      console.log(result);
      if(result.status === "success"){
        function appointmentSuccessMessage(remaining_seconds = 5){
          if(remaining_seconds <= 0){
            location.href = location.origin + "/shop/" + agent_id;
            return;
          }
          message = "appointment submitted! " +
              "redirecting page back to shop in " +
              remaining_seconds + " seconds";
          setTimeout(appointmentSuccessMessage, 1000, remaining_seconds-1);
        }
        appointmentSuccessMessage();

        setTimeout(() => {
        }, 5000);
      } else{
        message = "failed to submit appointment";
        console.log("failed to submit appointment, result:", result);
        setTimeout(() => {
          loading = false;
        }, 5000);
      }
    }}>
      Submit Appointment
    </Button>
  </div>
</div>


<style>
  .page-content {
    height: calc(100% - 100px);
    width: 100%;
    padding: 15px;
    position: relative;

    font-size: 24px;

    display: grid;
    grid-template-areas:
        "info       map"
        "client     client"
        "button     null";
    grid-template-rows: 400px 300px 100px;
    grid-template-columns: 50% 1fr;
  }
  .map-panel { grid-area: map; }
  .info-panel { grid-area: info; }
  .client-message-panel { grid-area: client; }
  .button-panel { grid-area: button; }

  .page-covering-screen {
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

  .info-panel {
    height: 200px;
    width: 100%;
  }

  .info-panel .agent-name-row {
    height: 42px;
  }

  .info-panel .date-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 80px;
  }

  .info-panel .date-row input {
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 42px;
    font-size: 24px;
    margin-left: 15px;
  }
  .product-name-row input {
    font-size: 1em;
  }


  .content-panel {
    width: 100%;
  }

  .client-message-panel {
    height: auto;
  }

  .client-message-input {
    height: 200px;
    max-height: 250px;

    width: 100%;
    font-size: 24px;
    padding: 5px;
  }

  .button-panel {
    height: 180px;
  }
</style>

