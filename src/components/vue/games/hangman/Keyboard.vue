<template>
  <div id="buttons" :set="len = 0">
    <div v-for="row in keys" :key="row">
      <MDBBtn color="dark"
        v-for="key in row"
        :key="key"
        :id="'hangman_btn_' + calcOffset(key)"
        size="sm"
        :disabled="usedLetters.includes(key)"
        aria-controls="badge"
        v-on:click="click(key, $event)"
      >{{ key }}</MDBBtn>
    </div>
    <div id="restart">
      <MDBBtn color="dark" id="restart" v-on:click="restart">Restart</MDBBtn><br>
       <label for="restart">Press Space to restart</label>
    </div>
  </div>
</template>

<script>
import { MDBBtn} from "mdb-vue-ui-kit";

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
  components: {
    MDBBtn
  },
  data() {
    return {
      keys: keys,
      len: len,
      l: l
    }
  },
  computed() {
    len = 0
  },
  methods: {
    click(key, e) {
      this.$emit('key', key);
      e.target.blur();
    },
    restart(e) {
      this.$emit('restart');
      e.target.blur();
    },
    calcOffset(letter) {
      let l = 0
      for (var r = 0; r < keys.length; ++r) {
        for (var c = 0; c < keys[r].length; ++c) {
          if (keys[r][c] == letter) return l;
          ++l;
        }
      }
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
