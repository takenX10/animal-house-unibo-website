<template>
  <section class="gamekeyboard">
    <div class="gamekeyboard__row" v-for="(keyset, index) in keyboardLayout" :key="index">
      <game-keyboard-key
        class="btn btn-dark"
        tabindex="0"
        v-for="value in keyset"
        @click="handleKeypress"
        :id="'wordle_btn_' + calcOffset(value.key)"
        :kkey="value.key"
        :state="value.state"
        :key="value.key"
      ></game-keyboard-key>
    </div>
  </section>
</template>

<script setup lang="ts">
import GameKeyboardKey from "@/components/vue/games/wordle/GameKeyboardKey.vue"
import { ValidKey } from "@/assets/js/wordle/types"
import type { Keyboard } from "@/assets/js/wordle/keyboard"
import { onMounted, onUnmounted, computed } from 'vue';

interface Props {
  keyboard: Partial<Keyboard>
  disabled?: boolean
}

const props = defineProps<Props>()
let focusKey = 0;

const emits = defineEmits<{
  (e: "backspace"): void
  (e: "enter"): void
  (e: "keypress", key: ValidKey): void
  (e: "arrow", key: String): void
  (e: "space"): void
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

function isArrow(key) {
  key = key.toLowerCase();
  return key == "arrowleft" || key == "arrowright"
}

function isSpace(key) {
  key = key.toLowerCase();
  return key == " "
}

function calcOffset(k) {
  let keyboard = props.keyboard.state
  keyboard = keyboard.slice(0, keyboard.length)
  for (var i = 0; i < keyboard.length; i++) {
    if (keyboard[i].key == k) return i
  }
}

function handleKeyupEvent(event: KeyboardEvent) {
  const key = event.key.toUpperCase()
  if (isArrow(key)) {
    emits("arrow", key);
    return
  }
  if (isSpace(key)) {
    emits("space");
    return
  }

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
