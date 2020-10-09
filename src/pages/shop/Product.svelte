

<script>
  export let thumbnail;
  export let area;
  export let estate;
  export let price;
  export let status;
  export let lastUpdated;
</script>

<style>
  .product {
    display: flex;
    height: 100px;
    width: 100%;
    margin-bottom: 15px;
    column-gap: 15px;
  }

  .product img {
    width: 16%;
    object-fit: cover;
  }

  .product span:first-of-type {
    margin-left: 5px
  }
  .product span {
    width: 12%;
    font-size: 1.5em;
  }
</style>

<div class="product">
  <img src={thumbnail} alt="thumbnail" />
  <span>{ area }</span>
  <span>{ estate }</span>
  <span>{ price }</span>
  <span>{ status }</span>
  <span>{ lastUpdated }</span>
  
</div>