<script lang="ts">
  import type { TMessage } from "./types";
  import { MESSAGE_TYPE } from "./types";
  export let message: TMessage;

  $: system = message.type === MESSAGE_TYPE.SYSTEM;
  $: center = system || message.type === MESSAGE_TYPE.CENTER;

  console.log(message.type === MESSAGE_TYPE.SYSTEM);
</script>

<div
    class={"message"}
    class:center
    class:system
    class:left={message.type === MESSAGE_TYPE.LEFT}
    class:right={message.type === MESSAGE_TYPE.RIGHT}>
  { message?.text || "" }
</div>

<style>
  .message {
    padding: 5px 0;
    display: flex;
    align-items: center;
  }

  .message.center {
    width: 100%;
    justify-content: center;
  }
  .message.left {
    justify-content: left;
  }
  .message.right {
    justify-content: right;
    align-self: flex-end;
  }

  .message.left,
  .message.right {
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    min-width: 40%;
    max-width: 80%;
    padding: 8px;
  }

  .message.system {
    font-size: 0.75em;
    color: rgba(125, 125, 125, 1.0);
    font-style: italic;
  }
</style>