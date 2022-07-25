<template>
  <div
    class="gameboard__cell"
    :class="[`gameboard__cell--${state}`, { 'gameboard__cell--animate': value }, { 'gameboard__cell--flip': flip }]"
  >
    {{ value }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { EvaluationState, ValidKey } from "@/assets/js/wordle/types"

interface Props {
  value: ValidKey
  state: EvaluationState
}

const props = defineProps<Props>()

const flip = computed<boolean>(() => {
  return [EvaluationState.ABSENT, EvaluationState.PRESENT, EvaluationState.MULTIPLE, EvaluationState.CORRECT].includes(
    props.state
  )
})
</script>

<style scoped lang="scss">
.gameboard {
  &__cell {
    user-select: none;
    width: 60px;
    height: 60px;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    font-size: 2rem;
    display: grid;
    place-items: center;
    &--absent {
      background-color: var(--absent-color);
      border: none !important;
    }
    &--present {
      background-color: var(--present-color);
      border: none !important;
    }
    &--correct {
      background-color: var(--correct-color);
      border: none !important;
    }
    &--multiple {
      background: linear-gradient(
        135deg,
        var(--correct-color),
        var(--correct-color) 50%,
        var(--present-color) 50%,
        var(--present-color) 100%
      );
      border: none !important;
    }
    &--animate {
      animation: scale 0.2s;
      animation-iteration-count: 1;
    }
    &--flip {
      animation: flip 0.5s;
      animation-iteration-count: 1;
    }
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes flip {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
