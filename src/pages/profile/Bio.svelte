

<script lang="ts">

  export let name: string = "";
  export let avatar: string = "";


</script>

<div class="bio">
  <img class="avatar" src={avatar} alt="avatar" />
  <div class="info">
    <h2>Profile of { name }</h2>
  </div>
</div>

<style>
  .bio {
    height: 220px;
    display: flex;
    font-size: 1em;
  }

  .bio .avatar {
    height: 100%;
    max-width: 300px;
    object-fit: cover;
  }

  .bio .info {
    display: inline-flex;
  }
</style>