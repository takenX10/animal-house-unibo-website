<template>
  <div class="board" aria-live="polite">
    <div class="frame-wrapper" :style="frameSize">
      <p v-if="valid" class="win">You Win!</p>
      <div
        id="original"
        class="original"
        v-if="showingOriginal && image"
        @click="showingOriginal = false"
        :style="{ background: `url(${image})`, backgroundSize: 'contain' }"
      ></div>
      <div class="frame" :style="frameSize">
        <Tile
          v-for="tile in tiles"
          :key="tile.position"
          :tile="tile"
          @moving="moveTile"
          ref="tiles"
        />
      </div>
    </div>

    <div class="controls text-center">
      <MDBContainer >
        <MDBRow >
        <MDBCol class="mx-auto col-sm-6 col-md-4">
          <MDBBtn
            raised
            class="toggle-original w-100 text-light"
            @click="showingOriginal = !showingOriginal"
          >Toggle Original Image</MDBBtn>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol class="mx-auto col-sm-6 col-md-4">
          <MDBBtn raised class="shuffle w-100 text-light" @click="shuffleTiles">Reshuffle</MDBBtn>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol class="mx-auto col-sm-6 col-md-4">
          <MDBBtn raised class="reset w-100" @click="reset">Reset</MDBBtn>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol class="mx-auto col-sm-6 col-md-4">
          <MDBBtn raised class="restart w-100 text-light" @click="restart">New Game</MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  </div>
</template>


<script>
import sample from 'lodash.sample'
import Tile from '@/components/vue/games/slider/Tile.vue'
import { save_score } from '@/context/utils.jsx';
import { MDBBtn,MDBRow,MDBCol,MDBInput,MDBContainer,MDBFile, MDBSpinner } from "mdb-vue-ui-kit";

let backupTiles = null

export default {
  components: { Tile, MDBBtn,MDBRow,MDBCol,MDBInput,MDBContainer,MDBFile, MDBSpinner } ,

  data() {
    return {
      image: null,
      showingOriginal: false,
      valid: false,
      size: {
        horizontal: 0,
        vertical: 0
      },
      tiles: [],
      tileSize: {
        width: 0,
        height: 0
      }
    }
  },

  computed: {
    frameSize() {
      return {
        backgroundColor: '#FFFFFF',
        width: `${this.tileSize.width * this.size.horizontal}px`,
        height: `${this.tileSize.height * this.size.vertical}px`
      }
    },

    /**
     * The total number of tiles in the current board.
     * @return {Number}
     */
    totalTiles() {
      return this.size.horizontal * this.size.vertical
    },

    /**
     * Determine if the current board is valid (solved).
     * @return {boolean}
     */
    valid() {
      if (!this.tiles.length) {
        return false
      }

      for (let i = 0; i < this.totalTiles; ++i) {
        if (this.tiles[i].styles.order !== this.tiles[i].position) {
          return false
        }
      }
      save_score( this.MAX_SCORE - this.score, "slider");
      this.valid = true;

      //handle win
      this.score = 0;
      return true
    }
  },

  methods: {
    start({ image, size }) {
      this.valid = false;
      this.size = size
      this.image = image
      this.score = 0;
      this.MAX_SCORE = 500;

      // detect the width and height of the frame
      const img = new Image()
      img.onload = () => {
        let ratio = img.width / img.height;
        img.width = Math.min(document.querySelector(".board").clientWidth, 400);
        img.height = img.width / ratio;
        this.tileSize.width = Math.floor(img.width / size.horizontal)
        this.tileSize.height = Math.floor(img.height / size.vertical)
        this.generateTiles()
        this.shuffleTiles()
      }
      img.src = image
    },

    /**
     * Generate the tiles for the current game.
     */
    generateTiles() {
      this.tiles = []
      for (let i = 0; i < this.totalTiles; ++i) {
        this.tiles.push({
          styles: {
            background: i === 0 ? 'transparent' : `url(${this.image})`,
            backgroundPositionX: `-${(i % this.size.horizontal) * this.tileSize.width}px`,
            backgroundPositionY: `-${Math.floor(i / this.size.horizontal) * this.tileSize.height}px`,
            width: `${this.tileSize.width}px`,
            height: `${this.tileSize.height}px`,
            order: i,
            backgroundSize: `${this.tileSize.width * this.size.horizontal}px ${this.tileSize.height * this.size.vertical}px !important`,
          },
          position: i,
          isEmpty: i === 0
        })
      }
    },

    /**
     * Shuffle the generated tiles.
     */
    shuffleTiles() {
      this.score = 0;
      // To make sure the puzzle is solvable, we execute a series of random moves
      for (let i = 0, j = this.totalTiles * 5; i < j; ++i) {
        const emptyTile = this.tiles.find(t => t.isEmpty)
        const movableTiles = this.tiles.filter(t => {
          return this.getAdjacentOrders(emptyTile).indexOf(t.styles.order) > -1
        })
        this.switchTiles(emptyTile, sample(movableTiles))
      }

      // Make a backup for later reset
      backupTiles = JSON.stringify(this.tiles)
    },

    /**
     * Move a (movable) tile
     * @param  {Object} tile
     */
    moveTile(tile) {
      if (tile.isEmpty) {
        return
      }

      // Find the 4 direct (non-diagonal) adjacent tiles and see if any of them is the empty tile
      const target = this.tiles.find(t => {
        return t.isEmpty && this.getAdjacentOrders(tile).indexOf(t.styles.order) > -1
      })
      this.score++;
      // If found the empty tile, just switch the flex order and we're good.
      target && this.switchTiles(target, tile)
    },

    /**
     * Switch two tiles.
     * @param  {Object} a First tile
     * @param  {Object} b Second tile
     */
    switchTiles(a, b) {
      [a.styles.order, b.styles.order] = [b.styles.order, a.styles.order]
    },

    /**
     * Get the four direct (non-diagonal) adjacent tiles' orders of a tile.
     * @param  {Object} tile
     * @return {Array.<Number>}
     */
    getAdjacentOrders(tile) {
      const pos = tile.styles.order
      return [
        pos % this.size.horizontal ? pos - 1 : null,
        (pos + 1) % this.size.horizontal ? pos + 1 : null,
        pos - this.size.horizontal,
        pos + this.size.horizontal
      ]
    },

    /**
     * Reset the board.
     */
    reset() {
      this.score = 0;
      this.tiles = JSON.parse(backupTiles)
    },

    /**
     * Restart the game.
     */
    restart() {
      this.score = 0;
      this.$emit('restart')
    }
  }
}
</script>

<style lang="scss">
.frame-wrapper {
  margin: 0 auto;
  position: relative;
  box-shadow: 0 0 0px 10px;

  .original {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  p.win {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 40px;
    margin: 0 0;
    background: rgba(43, 181, 82, 0.7);
    text-transform: uppercase;
  }
}

.frame {
  display: flex;
  flex-wrap: wrap;
  background: #612211 url("@/assets/board.jpg");
  background-size: cover;
}

.controls {
  margin-top: 30px;

  .shuffle {
    background: #3ebb5c;
  }
  .restart {
    background: #368ba0;
  }
  .toggle-original {
    background: #d05b88 !important;
  }

  .reset {
  }
}
</style>
