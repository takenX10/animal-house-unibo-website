<template>
  <section class="gamekeyboard">
    <div class="gamekeyboard__row" v-for="(keyset, index) in keyboardLayout" :key="index">
      <game-keyboard-key
        v-for="value in keyset"
        @click="handleKeypress"
        :kkey="value.key"
        :state="value.state"
        :key="value.key"
      ></game-keyboard-key>
    </div>
  </section>
</template>

<script setup lang="ts">
import GameKeyboardKey from "@/components/wordle/GameKeyboardKey.vue"
import { ValidKey } from "@/assets/js/wordle/types"
import type { Keyboard } from "@/assets/js/wordle/keyboard"
import {onMounted, onUnmounted, computed} from 'vue';

interface Props {
  keyboard: Partial<Keyboard>
  disabled?: boolean
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: "backspace"): void
  (e: "enter"): void
  (e: "keypress", key: ValidKey): void
}>()

onMounted(() => {
  window.addEventListener("keyup", handleKeyupEvent)
})

onUnmounted(() => {
  window.removeEventListener("keyup", handleKeyupEvent)
})

const keyboardLayout = computed(() => {
  if (props.keyboard.state) {
    return [props.keyboard.state.slice(0, 10), props.keyboard.state.slice(10, 19), props.keyboard.state.slice(19, 29)]
  }
  return []
})

function handleKeypress(key: ValidKey) {
  if (props.disabled) {
    return
  }
  switch (key) {
    case ValidKey.BACKSPACE:
      emits("backspace")
      break
    case ValidKey.ENTER:
      emits("enter")
      break
    default:
      emits("keypress", key)
      break
  }
}

function handleKeyupEvent(event: KeyboardEvent) {
  const key = event.key.toUpperCase()
  // if the key is not valid
  if (!(key in ValidKey)) {
    return
  }
  handleKeypress(key as ValidKey)
}
</script>

<style scoped lang="scss">
.gamekeyboard {
  margin-top: 1rem;
  &__row {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
    @media only screen and (max-width: 600px) {
      gap: 5px;
      margin-bottom: 5px;
    }
  }
}
</style>
