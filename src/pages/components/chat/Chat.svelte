
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  
  import type { TMessage } from "./types";
  import Message from "./Message.svelte";

  import Button from "../Button.svelte";

  const dispatch = createEventDispatcher();

  export let className: string = "";
  export let messages: TMessage[];

  let message_input_field: HTMLInputElement;

  function onNewMessage(){
    if(message_input_field){
      if(message_input_field.value){
        dispatch("message", {
          text: message_input_field?.value
        });
        message_input_field.value = "";
        message_input_field.focus();
      }
    }
  }
</script>

<div class={"chat-container " + className}>
  <div class={"message-container "}>
    {#each messages as m}
      <Message message={m} />
    {/each}
    <div class="message-container-padding-bottom"></div>
  </div>
  <div class="input-box">
    <input class="message-input-field"
        type="text"
        bind:this={message_input_field}/>
    <Button className="message-input-enter-button"
        on:click={onNewMessage}>&gt;</Button>
  </div>
</div>



<style>
  .chat-container {
    display: grid;
  }

  .chat-container .message-container {
    display: flex;
    flex-direction: column;
    max-height: 500px;
    overflow: auto;
    row-gap: 8px;
    padding: 15px;
  }

  .message-container .message-container-padding-bottom {
    height: 50px;
    flex-shrink: 0;
  }

  .chat-container .input-box {
    display: grid;
    grid-template-columns: 1fr 50px;
    height: 50px;
    align-self: flex-end;
  }

  .input-box .message-input-field {
    grid-column: 1;

    border: 1px solid rgba(0, 0, 0, 0.2);
    padding-left: 5px;
    font-size: 25px;
  }

  .input-box :global(.message-input-enter-button) {
    grid-column: 2;

    height: 50px;
    font-size: 25px;
    font-weight: 900;
  }
</style>