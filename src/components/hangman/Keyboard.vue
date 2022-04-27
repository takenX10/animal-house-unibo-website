<template>
  <div id="buttons" :set="l = 0">
    <div v-for="(row, r) in keys" :key="row">
      <b-button
        v-for="(key,i) in row"
        :key="key"
        :id="'hangman_btn_' + (++l)"
        size="sm"
        pill
        variant="dark"
        :disabled="usedLetters.includes(key)"
        v-on:click="click(key, $event)"
      >{{ key }}</b-button>
    </div>
    <div id="restart">
      <b-button variant="dark" v-on:click="restart">Restart</b-button>
    </div>
  </div>
</template>

<script>

let keys = ["QWERTYUIOP",
  "ASDFGHJKL",
  "ZXCVBNM"
]

let len = 0;
for (var r = 0; r < keys.length; ++r) {
  for (var c = 0; c < keys[r].length; ++c) {
    ++len;
  }
}

let l = 0;

export default {
  name: 'Keyboard',
  props: {
    usedLetters: String
  },
  data() {
    return {
      keys: keys,
      len: len,
      l: l
    }
  },
  mounted() {
    l = 0;
  },
  methods: {
    click(key, e) {
      this.$emit('key', key);
      e.target.blur();
    },
    restart(e) {
      this.$emit('restart');
      e.target.blur();
    }
  }
}
</script>

<style scoped>
button {
  font-family: Consolas, "Courier New", Courier, monospace;
  font-weight: bold;
  margin-left: 2px;
  margin-top: 3px;
}
#restart {
  margin-top: 5px;
}
</style>
