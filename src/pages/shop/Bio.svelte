

<script>
  export let name;
  export let avatar;
  export let description;

  export let owner = false;
</script>

<style>
  .bio {
    height: 220px;
    display: flex;
    font-size: 2em;
  }
  .bio img {
    height: 100%;
    max-width: 300px;
    object-fit: cover;
  }
  .bio .info {
    display: inline-flex;
    row-gap: 15px;
    flex-direction: column;

    height: 100%;
    padding-left: 30px;
    padding-top: 15px;
  }

  .info h3 {
    margin: 0;
    display: inline;
  }
</style>

<div class="bio">
  <img src={avatar} alt="avatar" />
  <div class="info">
    <div>
      <h3>{name}{ owner ? " (您)" : ""}</h3> 的商店
    </div>
    {#if description }
      <div>
        <h3>簡介:</h3> { description }
      </div>
    {/if}
  </div>
</div>