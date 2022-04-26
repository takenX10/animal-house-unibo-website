<template>
  <main class="gameheader">
    <section class="gameheader__section">
      <ph-question :size="28" @click="emits('openhelp')"></ph-question>
      <ph-chart-bar :size="28" @click="emits('openstats')"></ph-chart-bar>
      <ph-gear :size="28" @click="emits('opensettings')"></ph-gear>
      <ph-arrow-counter-clockwise :size="28" @click="emits('reset')"></ph-arrow-counter-clockwise>
    </section>
  </main>
</template>

<script setup lang="ts">
import { PhQuestion, PhGear, PhChartBar, PhArrowCounterClockwise } from "phosphor-vue"

const emits = defineEmits<{
  (e: "openhelp"): void
  (e: "openstats"): void
  (e: "opensettings"): void
  (e: "reset"): void
}>()
</script>

<style scoped lang="scss">
.gameheader {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  &__section {
    width: 340px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-accent-color);
  }
  svg {
    cursor: pointer;
    &:hover {
      opacity: 0.75;
    }
  }
}
</style>
