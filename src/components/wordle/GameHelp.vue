<template>
  <main class="gamehelp">
    <div class="gamehelp__text">
      <p>The goal is to guess the word in n + 1 guesses (Where n is the word length).</p>
      <p>Each guess must be a valid word, of correct length.</p>
      <div class="gamehelp__squares">
        <div class="gamehelp__squares__square">H</div>
        <div class="gamehelp__squares__square">E</div>
        <div class="gamehelp__squares__square">L</div>
        <div class="gamehelp__squares__square">L</div>
        <div class="gamehelp__squares__square">O</div>
      </div>
      <p>After each guess, the color of the tiles will change to show how close your guess was.</p>
      <div class="gamehelp__squares">
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">T</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">A</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">S</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">T</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">E</div>
      </div>
      <p>A dark grey letter indicates that the letter is not in the word.</p>
      <div class="gamehelp__squares">
        <div class="gamehelp__squares__square gamehelp__squares__square--correct">V</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">A</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">L</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">U</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">E</div>
      </div>
      <p>A green letter indicates that the letter is in the correct position.</p>
      <div class="gamehelp__squares">
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">W</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">A</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--present">T</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">E</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">R</div>
      </div>
      <p>A yellow letter indicates that the letter is in the word, but not in that specific position.</p>
      <div class="gamehelp__squares">
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">V</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">A</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">L</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--absent">V</div>
        <div class="gamehelp__squares__square gamehelp__squares__square--multiple">E</div>
      </div>
      <p>
        A green and yellow letter indicates that the letter is in the correct spot, but there is also the same letter
        somewhere else in the word.
      </p>
    </div>
  </main>
</template>

<style scoped lang="scss">
.gamehelp {
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start !important;
  align-items: center;
  overflow: auto;
  padding: 1rem;
  padding-top: 0;
  @media only screen and (max-width: 400px) {
    padding: 0.5rem;
  }
  &__text {
    color: var(--text-accent-color);
  }
  &__squares {
    display: flex;
    gap: 5px;
    &__square {
      width: 40px;
      height: 40px;
      border: 1px solid var(--border-color);
      color: var(--text-color);
      font-size: 1.5rem;
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
    }
  }
}
</style>
