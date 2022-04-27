// Card Js by James Pickering
let delay = 500; //delay the effect
let fadetime = 500; // fade in time
var clicked = false; // set flag for clicked state
//lastClicked = ""; // last card clicked
let suit = ["clubs", "hearts", "diamonds", "spades"];
let deck = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];

// Modified Shuffle by Chris Coyier
// https://css-tricks.com/snippets/javascript/shuffle-array/
function shuffle(o) {
  for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

// Random suit
function getSuit() {
  var x = parseInt(Math.random() * 4);
  return suit[x];
}

// Deal new card from deck
function getCards() {
  for (var i = 0; i <= deck.length; i++) {
    var str = ".card" + i;
    var str2 = " .front";
    var el = str.concat(str2);
    var output = deck[i] + " of " + getSuit();
    $(el).text(output);
  }
}

// Deal cards in sequence
function deal() {
  $('.card').hide();
  clicked = false; // set flag for clicked state
  shuffle(deck);
  getCards();
  $('.card1').delay(delay).fadeIn(fadetime);
  $('.card2').delay(delay * 2).fadeIn(fadetime);
  $('.card3').delay(delay * 3).fadeIn(fadetime);
  $('.card4').delay(delay * 4).fadeIn(fadetime);
  $('.card5').delay(delay * 5).fadeIn(fadetime);
}
deal();

$('.deal').click(function () {
  deal();
});

$('.card').click(function () {
  $(this).toggleClass('flip');
});

var itemsMainDiv = ('.MultiCarousel');
var itemsDiv = ('.MultiCarousel-inner');
var itemWidth = "";


//this function define the size of the items
export function ResCarouselSize() {
  var incno = 0;
  var dataItems = ("data-items");
  var itemClass = ('.item');
  var id = 0;
  var btnParentSb = '';
  var itemsSplit = '';
  var sampwidth = $(itemsMainDiv).width()
  var bodyWidth = $('body').width();
  console.log(sampwidth)
  $(itemsDiv).each(function () {
    id = id + 1;
    var itemNumbers = $(this).find(itemClass).length;
    btnParentSb = $(this).parent().attr(dataItems);
    itemsSplit = btnParentSb.split(',');
    $(this).parent().attr("id", "MultiCarousel" + id);


    if (bodyWidth >= 1200) {
      incno = itemsSplit[3];
      itemWidth = sampwidth / incno;
    }
    else if (bodyWidth >= 992) {
      incno = itemsSplit[2];
      itemWidth = sampwidth / incno;
    }
    else if (bodyWidth >= 768) {
      incno = itemsSplit[1];
      itemWidth = sampwidth / incno;
    }
    else {
      incno = itemsSplit[0];
      itemWidth = sampwidth / incno;
    }
    $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
    $(this).find(itemClass).each(function () {
      $(this).outerWidth(itemWidth);
    });

    $(".leftLst").addClass("over");
    $(".rightLst").removeClass("over");

  });
}

export let runOnReady = function () {

  $('.leftLst, .rightLst').click(function () {
    var condition = $(this).hasClass("leftLst");
    if (condition)
      click(0, this);
    else
      click(1, this)
  });

  $(window).resize(function () {
    ResCarouselSize();
  });

  //this function used to move the items
  function ResCarousel(e, el, s) {
    var leftBtn = ('.leftLst');
    var rightBtn = ('.rightLst');
    var translateXval = '';
    var divStyle = $(el + ' ' + itemsDiv).css('transform');
    var values = divStyle.match(/-?[\d\.]+/g);
    var xds = Math.abs(values[4]);
    if (e == 0) {
      translateXval = parseInt(xds) - parseInt(itemWidth * s);
      $(el + ' ' + rightBtn).removeClass("over");

      if (translateXval <= itemWidth / 2) {
        translateXval = 0;
        $(el + ' ' + leftBtn).addClass("over");
      }
    }
    else if (e == 1) {
      var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
      translateXval = parseInt(xds) + parseInt(itemWidth * s);
      $(el + ' ' + leftBtn).removeClass("over");

      if (translateXval >= itemsCondition - itemWidth / 2) {
        translateXval = itemsCondition;
        $(el + ' ' + rightBtn).addClass("over");
      }
    }
    $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
  }

  //It is used to get some elements from btn
  function click(ell, ee) {
    var Parent = "#" + $(ee).parent().attr("id");
    var slide = $(Parent).attr("data-slide");
    ResCarousel(ell, Parent, slide);
  }

}