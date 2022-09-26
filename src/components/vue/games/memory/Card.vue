
<script>

import { computed } from "vue";

export default {
  props: {
    position: {
      type: Number,
      required: true,
    },
    matched: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const flippedStyles = computed(() => {
      if (props.visible) {
        return 'is-flipped'
      }
      else return ''
    });

    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value,
      });
    };
    return {
      flippedStyles,
      selectCard,
    };
  },
};
</script>

<template>
  <div class="card" :class="flippedStyles" @click="selectCard">
    <div class="card-face is-front">
      <img :src="`/images/${value}.png`" :alt="value" />
    </div>
    <div class="card-face is-back"></div>
  </div>
</template>

<style>
.card {
  position: relative;
}

.card.is-flipped {
  transform: rotateY(180deg);
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d;
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  border-radius: 10px;
  backface-visibility: hidden;
}

.card-face.is-front {
  /* background-color: red; */
  color: white;
  transform:rotateY(180deg);
}

.card-face.is-back {
  background-image: url("@/@/public/images/back-bg.png");
  color: white;

}
</style>