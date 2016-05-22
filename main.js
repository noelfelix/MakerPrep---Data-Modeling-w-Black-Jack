function extend (obj1, obj2) {
  for (var key in obj2) {
    obj1[key] = obj2[key];
  }
  return obj1;
}

function cardMaker (rank, suit) {
  return {
    rank: rank,
    suit: suit
  }
}

function blackjackCardMaker (rank, suit, value) {
  return extend(cardMaker(rank,suit), {value: value});
}

function deckMaker() {
  var deck = [];
  var ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  var values = [0,2,3,4,5,6,7,8,9,10,10,10,10];
  var suits = ['S','D','H','C'];

  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < ranks.length; j++) {
      deck.push(blackjackCardMaker(ranks[j], suits[i], values[j]));
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
  return card.rank + card.suit;;
}

function displayDeck (deck) {
  var display = '';
  for (var i = 0; i < deck.length; i++) {
    display += displayCard(deck[i]) + ' ';
    if (i % 13 === 12) {
      display += '\n';
    }
  }
  return display;
}

function shuffle (deck) {
  var shuffled = [];
  var cards = deck.length;
  for (var i = 0; i < cards; i++) {
    shuffled.push(deck.splice(Math.floor(Math.random() * deck.length),1)[0]);
  }
  return shuffled;
}

function shuffle2 (deck) {
  for (var i = 0; i < deck.length; i++) {
    deck.push(deck.splice(Math.floor(Math.random() * deck.length - i), 1)[0]);
  }
  return deck;
}

//Best
function shuffle3 (deck) {
  var randInd1, randInd2, temp;
  for (var i = 0; i < 30; i++) {
    randInd1 = Math.floor(Math.random() * deck.length);
    randInd2 = Math.floor(Math.random() * deck.length);
    temp = deck[randInd1];
    deck[randInd1] = deck[randInd2];
    deck[randInd2] = temp;
  }
  return deck;
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
  var isAce = false;
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].rank === 'A') {
      isAce = true;
    } else {
      totalValue += hand[i].value;
    }
  }
  if (isAce) {
    if (totalValue < 11) {
      totalValue += 11;
    } else {
      totalValue += 1;
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
  var value = handValue(player.hand);
  var status = '';
  if (value > 21) {
    status = ' BUST';
  }
  if (value === 21) {
    status === " BLACKJACK";
  }
  return display += handToJoin.join(', ') + " : " + value + status;
}

function play() {
  var deck = shuffle3(deckMaker());
  var player1 = playerMaker('Player One');
  var player2 = playerMaker('Player Two');

  while (handValue(player1.hand) < 17) {
    deal(deck, player1);
  }
  while (handValue(player2.hand) < 17) {
    deal(deck, player2);
  }
  console.log(displayPlayerHand(player1));
  console.log(displayPlayerHand(player2));

  var p1 = handValue(player1.hand);
  var p2 = handValue(player2.hand);

  if(p1 > 21 && p2 > 21) {
    console.log("\nGAME OVER - BOTH BUSTED!");
  } else if (p1 > 21 || p2 > 21) {
    console.log("\nGAME OVER - " + (p1 > 21 ? player2.name : player1.name) + " WINS!");
  } else if (p1 === p2) {
    console.log("\nGAME OVER - TIED!");
  } else {
    console.log("\nGAME OVER - " + (p1 > p2 ? player1.name : player2.name) + " WINS!!");
  }
}

play();

//Testing shuffle speeds
// function shuffleTest (shuf, count) {
//   var deck = deckMaker();
//   var start = new Date();
//   for (var i = 0; i < count; i++) {
//     deck = shuf(deck);
//   }
//   return "\nCount: " + count + '\nTime: ' + (new Date() - start);
// }
//
// console.log(shuffleTest(shuffle3, 100000));
// console.log(shuffleTest(shuffle2, 100000));
// console.log(shuffleTest(shuffle, 100000));
