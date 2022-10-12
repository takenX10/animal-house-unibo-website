
<script>

export default {
  mounted() {
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

#about {
  color: #ff00ff;
}
</style>


<template>
  <div class="container">
    <div class="row justify-content-text">
      <div class="col-3 mx-auto card text-center">
        <div class="card-header">Featured</div>
        <div class="card-body">
          <h5 class="card-title primary">Special title treatment</h5>
          <p class="card-msg">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        <div class="card-footer text-muted">2 days ago</div>
      </div>
    </div>
  </div>
</template>
