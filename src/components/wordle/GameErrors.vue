<template>
  <section class="gameerrors">
    <transition-group name="fade">
      <div v-for="(error, index) in errors" class="gameerrors__error" :key="index">{{ error }}</div>
    </transition-group>
  </section>
</template>

<script setup lang="ts">
interface Props {
  errors: string[]
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.gameerrors {
  pointer-events: none;
  z-index: 999;
  position: fixed;
  top: 5rem;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  &__error {
    font-weight: 400;
    background-color: var(--text-color);
    padding: 0.5rem;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba($color: #000000, $alpha: 0.25);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
