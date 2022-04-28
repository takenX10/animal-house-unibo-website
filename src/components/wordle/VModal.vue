<template>
  <main class="vmodal">
    <section class="vmodal__section">
      <p class="vmodal__heading">{{ title }}</p>
      <ph-x :size="28" @click="emits('close')" class="vmodal__close"></ph-x>
      <slot></slot>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue"
import { PhX } from "phosphor-vue"

interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), { title: "" })

const emits = defineEmits<{
  (e: "close"): void
}>()

onMounted(() => {
  window.addEventListener("keyup", handleKeyupEvent)
})

onBeforeUnmount(() => {
  window.removeEventListener("keyup", handleKeyupEvent)
})

const handleKeyupEvent = (event: KeyboardEvent) => {
  if (event.code === "Escape") {
    emits("close")
  }
}
</script>

<style lang="scss" scoped>
.vmodal {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba($color: #141516, $alpha: 0.75);
  &__section {
    width: 400px;
    height: max-content;
    max-height: calc(100% - 15rem);
    background-color: var(--bg-color);
    margin-top: 5rem;
    padding: 2rem;
    padding-top: 3rem;
    border-radius: 0.5rem;
    box-shadow: var(--shadow-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  &__heading {
    color: var(--text-color);
    position: absolute;
    font-size: 1.5rem;
    top: 1rem;
    left: 2rem;
    margin: 0;
  }
  &__close {
    cursor: pointer;
    color: var(--text-color);
    position: absolute;
    top: 1rem;
    right: 1rem;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
