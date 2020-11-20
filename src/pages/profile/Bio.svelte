

<script lang="ts">
  import type { Tag } from "../../api";
  import { LOCAL_ORIGIN } from "../../api";

  export let name: string = "";
  export let avatar: string = "";
  export let className: string = "";
  export let tags: Tag[] = [];
  $: console.log("tags:", tags);

  function transfromStyleObjectToString({
    background,
    color,
  }: Tag){
    let out = [
      background && `background:${background}`,
      color && `color:${color}`,
    ];
    return out.filter(Boolean).join(";");
  }

</script>

<div class={"bio " + className}>
  <img class="avatar" src={avatar} alt="avatar" />
  <div class="info">
    <h2>Profile of { name }</h2>
  </div>
  {#if tags && tags.length}
    <div class="tags">
      {#each tags as tag}
        <div class="tag" style={transfromStyleObjectToString(tag)}>
          { tag.name }
          {#if tag.help}
            <a class="tag-help"
                title="what is this?"
                href={LOCAL_ORIGIN + tag.help}>?</a>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bio {
    height: 220px;
    font-size: 1em;

    display: grid;
    grid-template-areas:
        "avatar name"
        "avatar tags";
    grid-template-rows: 80px 1fr;
  }

  .bio .avatar {
    grid-area: avatar;
    height: 100%;
    max-width: 300px;
    object-fit: cover;
  }

  .bio .info {
    grid-area: name;
    display: inline-flex;
  }
  .bio .info h2 {
    margin: 0;
    padding: 0;
  }

  .bio .tags {
    grid-area: tags;
    display: block;
  }
  .bio .tags .tag {
    padding: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 0.5em;
  }
  .bio .tags .tag .tag-help {
    margin-left: 5px;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    
    font-family: sans-serif;
    font-weight: bold;

    width: 1.2em;
    height: 1.2em;
    font-size: 1.2em;
    line-height: 1.2em;
    border-radius: 0.6em;
    
    border: 1px solid black;
    text-decoration: none;
  }
</style>