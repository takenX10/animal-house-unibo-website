<template>
  <div id="letters" aria-live="polite" aria-atomic="true" >
    <button variant="primary" size="sm" class="letters btn" v-for="item in letters" v-bind:key="item.index">{{item}}</button>
  </div> 

</template>

<script>
export default {
  name: 'Letters',
  props: {
    letters: String 
  }
}
</script>

<style scoped>
button {
  font-family: Consolas, 'Courier New', Courier, monospace;
  margin-left: 4px; 
  pointer-events: none;
}
</style>
