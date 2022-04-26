<script>
import 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js'
import 'https://cdn.jsdelivr.net/sweetalert2/3.0.3/sweetalert2.min.js'
import * as code from '@/assets/js/memory/script'


export default {
  data() {
    return {
      cards: code.cards
    }
  },
  mounted() {
    code.setJqueryBind()
    code.deck.on('click', ':not(".match, .open")', function (event) {
      event.stopPropagation()
      if ($('.show').length > 1) { return true; }

      var $this = $(this), card = this.outerHTML;
      $this.addClass('open show');
      //code.opened.push(card);
      code.pushOpened(card);

      // Compare with opened card
      if (code.opened.length > 1) {
        if (card === code.opened[0]) {
          code.deck.find('.open').addClass('match animated infinite rubberBand');
          setTimeout(function () {
            code.deck.find('.match').removeClass('open show animated infinite rubberBand');
          }, code.delay);
          //code.match++;
          code.incMatch();
        } else {
          console.log("WRONG")
          console.log(code.deck.find('.open'))
          code.deck.find('.open').addClass('notmatch animated infinite wobble');
          setTimeout(function () {
            code.deck.find('.open').removeClass('animated infinite wobble');
          }, code.delay / 1.5);
          setTimeout(function () {
            code.deck.find('.open').removeClass('open show notmatch animated infinite wobble');
          }, code.delay);
        }
        //code.opened = [];
        code.resetOpened();
        //code.moves++;
        code.incMoves();
        code.setRating(code.moves);
        code.$moveNum.html(code.moves);
      }

      // End Game if match all cards
      if (code.gameCardsQTY === code.match) {
        code.setRating(code.moves);
        var score = code.setRating(code.moves).score;
        setTimeout(function () {
          code.endGame(code.moves, score);
        }, 500);
      }
    });
  }
}
</script>

<style scoped>
@import "https://pro.fontawesome.com/releases/v5.9.0/css/all.css";
@import "https://fonts.googleapis.com/css?family=Coda";
@import "https://cdn.jsdelivr.net/sweetalert2/3.0.3/sweetalert2.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css";
@import "@/assets/css/memory/style.css";
</style>


<template>
  <div class="container">
    <div id="score-panel">
      <ul class="stars">
        <li>
          <i class="fa fa-star"></i>
        </li>
        <li>
          <i class="fa fa-star"></i>
        </li>
        <li>
          <i class="fa fa-star"></i>
        </li>
      </ul>
      <span class="moves">0</span> Moves
      <div class="restart">
        <i class="fa fa-repeat"></i>
      </div>
    </div>
    <ul class="deck row justify-content-center">
      <li class="col-3 mx-auto" v-for="c in this.cards">
        <i class="card fa" :class="['fa-' + c]"></i>
      </li>
    </ul>
  </div>
</template>