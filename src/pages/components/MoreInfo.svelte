<script lang="ts">
  export let href: string = "";
  export let title: string = "這是甚麼";
</script>


<a class="more-info"
  { href }
  { title }><span class="question-mark">?</span></a>

<style>
  .more-info {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    
    font-family: sans-serif;
    font-weight: bold;

    font-size: 0.9em;
    width: 1em;
    height: 1em;
    border-radius: 0.5em;
    
    border: 1px solid rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }

  .more-info .question-mark {
    font-size: 0.8em;
    padding-top: 2px;
  }
</style>