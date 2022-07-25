<template>
  <form id="optionsForm" @submit.prevent="start">
    <img class="preview" :src="image" v-if="image" />
    <ui-spinner v-if="!image" active></ui-spinner>
    <div >
      <ui-grid>
        <ui-grid-cell columns="12">
          <ui-file 
            accept="image/gif, image/jpeg, image/png"
            id="file"
            type="file"
            @change="fileChanged"
          ></ui-file>
        </ui-grid-cell>
      </ui-grid>
      <ui-grid >
        <ui-grid-cell columns="12">
          <ui-textfield
            inputType="number"
            name="width"
            min="2"
            max="10"
            v-model.number="size.horizontal"
            outlined
          >Width</ui-textfield> ×
          <ui-textfield
            inputType="number"
            name="height"
            min="2"
            max="10"
            v-model.number="size.vertical"
            outlined
          >Height</ui-textfield>
        </ui-grid-cell>
      </ui-grid>
      <ui-button raised v-if="image" @click="start">Start</ui-button>
    </div>
  </form>
</template>

<script>
import loadImage from 'blueimp-load-image'


const imageUrlToBase64 = async url => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((onSuccess, onError) => {
    try {
      const reader = new FileReader();
      reader.onload = function () { onSuccess(this.result) };
      reader.readAsDataURL(blob);
    } catch (e) {
      onError(e);
    }
  });
};

export default {
  data() {
    return {
      image: null,
      size: {
        horizontal: 3,
        vertical: 3
      }
    }
  },
  mounted() {
    this.fetchNewImage()
  },
  methods: {
    fetchNewImage() {
      fetch("http://192.168.1.8:8000/api/randomimagebase64")
        .then((data) => data.json())
        .then((json) => {
          this.image = json.image;
        })
    },
    fileChanged(e) {
      if (!e.target.files.length) {
        this.image = null
        return
      }

      loadImage(e.target.files[0], canvas => {
        this.image = canvas.toDataURL();
      }, {
        maxWidth: 400,
        maxHeight: 400,
        minWidth: 400,
        minHeight: 400,
        canvas: true
      })

      // imageUrlToBase64("https://cdn.shibe.online/shibes/55063d82b7e8bd7dd6596f01db464cf8be2f1511.jpg")
      // .then((data) => this.image = data);

    },

    /**
     * Start the game by emitting the event.
     */
    start() {
      this.$emit('gameStart', {
        image: this.image,
        size: this.size
      })
    },

    /**
     * Reset the options.
     */
    reset() {
      this.image = null
      document.querySelector('#optionsForm').reset()
      this.fetchNewImage();
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  border: 1px solid #ccc;
  margin-bottom: 8px;
}

label[for="file"] {
  color: #368ba0;
  cursor: pointer;
  display: inline-block;
  margin-right: 12px;
}

input[type="number"] {
  height: 24px;
  font-size: 14px;
  border: 1px solid #ccc;
}

input[type="file"] {
  display: none;
}

button {
  -webkit-appearance: none;
  padding: 6px 12px;
  background: #1ca76a;
  color: #fff;
  border-radius: 3px;
  border: 0;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
