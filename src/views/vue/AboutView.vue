
<script>

function addScript(src) {
  let s = document.createElement('script')
  s.setAttribute('src', src)
  document.head.appendChild(s)
}

function addCSS(src) {
  let s = document.createElement('link')
  s.setAttribute('href', src)
  document.body.appendChild(s)
}

function getBoostrapComponentInBrowser() {
  var scripts = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js'
  ]

  for (var i = 0; i < scripts.length; i++) {
    addScript(scripts[i])
  }


  var css = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
  ]

  for (var i = 0; i < css.length; i++) {
    addCSS(css[i])
  }
}

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
