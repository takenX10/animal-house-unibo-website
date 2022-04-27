// Card Js by James Pickering
let delay = 500; //delay the effect
let fadetime = 500; // fade in time
var clicked = false; // set flag for clicked state
//lastClicked = ""; // last card clicked
let suit = ["clubs", "hearts", "diamonds", "spades"];
let deck = ["ace",2,3,4,5,6,7,8,9,10,"jack","queen","king"];

// Modified Shuffle by Chris Coyier
// https://css-tricks.com/snippets/javascript/shuffle-array/
function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

// Random suit
function getSuit() {
  var x = parseInt(Math.random() * 4);
  return suit[x];
}

// Deal new card from deck
function getCards() {
  for(var i=0; i<=deck.length; i++) {
    var str = ".card" + i;
    var str2 = " .front";
    var el = str.concat(str2);
    var output = deck[i] + " of " +getSuit(); 
    $(el).text(output);
  }
}

// Deal cards in sequence
function deal(){
  $('.card').hide();
  clicked = false; // set flag for clicked state
  shuffle(deck);
  getCards();
  $('.card1').delay(delay).fadeIn(fadetime);
  $('.card2').delay(delay*2).fadeIn(fadetime);
  $('.card3').delay(delay*3).fadeIn(fadetime);
  $('.card4').delay(delay*4).fadeIn(fadetime);
  $('.card5').delay(delay*5).fadeIn(fadetime);
}
deal();

$('.deal').click(function(){
	deal();
});

$('.card').click(function(){
  $(this).toggleClass('flip');
});