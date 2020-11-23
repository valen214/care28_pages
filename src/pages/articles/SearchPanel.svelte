<script>
  import { REMOTE_ORIGIN } from "../../api";
  import Button from "../components/Button.svelte";

</script>

<div class="search-panel">
  <img src={
        REMOTE_ORIGIN +
        "/wp-content/themes/twentytwenty/assets/images/home-banner-image.png"
      }
      style="
        position: absolute;
        z-index: -1000;
        object-fit: contain;
        width: 100%;"
      alt=""/>
  <div class="input-button-row">
    <input type="text" class="search-input" />
    <Button
        style="border-radius: 0 5px 5px 0; border: 1px solid rgba(0, 0, 0, 0.2)">
      搜尋文章
    </Button>
  </div>
</div>




<style>
  .search-panel {
    width: 100%;
    height: 80px;
    padding-top: 15px;
  }

  .input-button-row {
    display: flex;
    align-items: stretch;
    justify-content: center;
    height: 53px;
  }

  .search-input {
    height: 53px;
    padding: 0 10px 0px 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 15px 0 0 15px;
    font-size: 24px;

    float: left;

    transition: border-bottom-left-radius 0.5s;
  }
</style>