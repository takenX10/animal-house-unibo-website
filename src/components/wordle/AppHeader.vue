<template>
  <header class="appheader">
    <p class="appheader__text typed-out">VVurdle</p>
  </header>
</template>

<style scoped lang="scss">
.appheader {
  &__text {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: var(--text-color);
    font-size: 3rem;
    font-weight: bold;
  }
}

body {
  background-color: #141516;
}

:root {
  --text-color: #ffffff;
  --text-accent-color: #818384;
  --bg-color: #1c1e20;
  --bg-accent-color: #818384;
  --border-color: #444c56;
  --bg-transparent-color: rgba(#141516, 0.75);
  --shadow-color: 5px 5px 5px rgba(#0f0f0f21, 0.25);
  --absent-color: #3a3a3c;
  --present-color: #b59f3b;
  --correct-color: #538d4e;
  --incorrect-color: #ec5d5d;
}
</style>
