function cardMaker (value, suit) {
  return {
    value: value,
    suit: suit
  }
}

balckjackard/deckmaker

function deckMaker() {
  var deck = [];
  var values = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  var suits = ['S','D','H','C'];

  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < values.length; j++) {
      deck.push(cardMaker(values[j], suits[i]));
    }
  }
  return deck;
}

function playerMaker(name) {
  return {
    name: name,
    hand: []
  }
}

function displayCard (card) {
  var display = '';

  var faceCards = {
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K'
  };

  if (faceCards[card.value]) {
    display += faceCards[card.value];
  } else {
    display += card.value;
  }
  return display += card.suit;;
}

function displayDeck (deck) {
  var display = '';
  for (var i = 0; i < deck.length; i++) {
    display += displayCard(deck[i]) + ' ';
    if (i % 5 === 4) {
      display += '\n';
    }
  }
  return display;
}

function shuffle (deck) {
  var shuffled = [];
  var count = deck.length;
  for (var i = 0; i < count; i++) {
    shuffled.push(deck.splice(Math.floor(Math.random() * deck.length),1)[0]);
  }
  return shuffled;
}

function deal (deck, player) {
  if (deck.length === 0) {
    return false;
  }
  player.hand.push(deck.splice(0,1)[0]);
  return player.hand[player.hand.length - 1];
}

function handValue(hand) {
  var totalValue = 0;
  hand.sort(function(a,b){return b.value > a.value});
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].value === 1) {
      if (totalValue + 10 > 21) {
        totalValue += 1;
      } else {
        totalValue += 10;
      }
    } else if (hand[i].value >=10) {
      totalValue += 10;
    } else {
      totalValue += hand[i].value;
    }
  }
  return totalValue;
}

function displayPlayerHand (player) {
  var display = player.name + " - ";
  var handToJoin = [];
  for (var i = 0; i < player.hand.length; i++) {
    handToJoin.push(displayCard(player.hand[i]));
  }
  return display += handToJoin.join(', ') + " : " + handValue(player.hand);
}

function play() {
  var deck = shuffle(deckMaker());

}

var deck = shuffle(deckMaker());
var player1 = playerMaker("Noel");
deal(deck, player1);
deal(deck, player1);
deal(deck, player1);
console.log(displayPlayerHand(player1));
