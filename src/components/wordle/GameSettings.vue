<template>
  <main class="gamesettings">
    <div class="gamesettings__text">
      <section class="gamesettings__settings">
        <article class="gamesettings__settings__setting">
          <span>Current Word: </span>
          <span>
            <blurred-word @unblur="emits('checkedword')">{{ word }}</blurred-word>
          </span>
        </article>
        <article class="gamesettings__settings__setting">
          <span>Word Length:</span>
          <span>
            <select name="wordlengths" :value="length" @input="emitUpdateLength($event.target)">
              <option v-for="(l, index) of availableLengths" :value="l" :key="index">
                {{ l }}
              </option>
            </select>
          </span>
        </article>
        <span class="gamesettings__settings__accent">
          Changing the length will allow you restarting mid game. Stats will not be counted.
        </span>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import BlurredWord from "@/components/wordle/BlurredWord.vue"

interface Props {
  word: string
  length: number
  availableLengths: number[]
}

defineProps<Props>()

const emits = defineEmits<{
  (e: "checkedword"): void
  (e: "update:length", value: number): void
}>()

function emitUpdateLength(target: EventTarget | null) {
  emits("update:length", Number((target as HTMLFormElement).value))
}
</script>

<style scoped lang="scss">
.gamesettings {
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start !important;
  align-items: center;
  overflow: auto;
  @media only screen and (max-width: 400px) {
    padding: 0.5rem;
  }
  &__text {
    color: var(--text-accent-color);
  }
  &__settings {
    &__setting {
      padding-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 1rem;
      }
    }
    &__accent {
      padding-top: 1rem;
      display: block;
      color: var(--text-accent-color);
    }
  }
}
</style>
