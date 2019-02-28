var cards = [{
    rank: "queen",
    suit: "diamonds",
    cardImage: "images/queen-of-diamonds.png"
  },
  {
    rank: "queen",
    suit: "hearts",
    cardImage: "images/queen-of-hearts.png"
  },
  {
    rank: "king",
    suit: "hearts",
    cardImage: "images/king-of-hearts.png"
  },
  {
    rank: "king",
    suit: "diamonds",
    cardImage: "images/king-of-diamonds.png"
  }
];
var score = 0;

function shuffle(arra1) {
  var ctr = arra1.length,
    temp, index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}
var randomCards = [0, 1, 2, 3];

shuffle(randomCards);



var cardsInPlay = [];
var cardNumsInPlay = [];

var checkForMatch = async function() {
  if (cardsInPlay.length === 2) {
    if (cardsInPlay[0] === cardsInPlay[1]) {
      alert("You found a match!");
      if (score > 0) {
        score *= 2;
      } else {
        score += 100;
      }
      deleteScore();
      resetScore();
    } else {
      alert("Sorry, try again.");
      if (score > 0) {
        score *= 0.25
        score = Math.round(score);
      };
      deleteScore();
      resetScore();
      await sleep(200)
      resetBoard();
    }
  } else {
    var alertPress = alert("Winner Winner!");
    alertPress;
    score *= 2;
    deleteScore();
    resetScore();
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.textContent = "Play Again?";
    var button2 = document.createElement('button');
    button2.setAttribute('type', 'button');
    button2.textContent = "Submit Score?";
    document.getElementById('reset').appendChild(button);
    document.getElementById('reset').appendChild(button2);
    button.addEventListener('click', resetBoard);
    button.addEventListener('click', deleteButton);

    button2.addEventListener('click', clearBoard);
    button2.addEventListener('click', deleteButton);
    button2.addEventListener('click', scoreZero);

  };
};

var addButton = function () {
  var button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.textContent = "Play Again?";
  document.getElementById('reset').appendChild(button);
  button.addEventListener('click', resetBoard);
  button.addEventListener('click', deleteButton);
};


var flipCard = function() {
  var cardId = this.getAttribute('data-id');

  console.log("Checking to make sure that " + cardId + "1 isn't in" + cardNumsInPlay);
  if (cardNumsInPlay.includes(cardId + 1) === false) {
    console.log("Pushing ID " + cardId + "1");
    this.setAttribute('src', cards[cardId].cardImage);
    cardsInPlay.push(cards[cardId].rank);
    cardNumsInPlay.push(cardId + 1);
    console.log("cardNumsInPlay is now = " + cardNumsInPlay);

    if (cardsInPlay.length % 2 === 0) {
      checkForMatch();
    };
  } else {
    console.log("not pushing because if failed!")
  };
};






var createBoard = function() {
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src', "images/back.png");
    cardElement.setAttribute('data-id', randomCards[i]);
    cardElement.addEventListener('click', flipCard);
    document.getElementById('game-board').appendChild(cardElement);
  };
};

var resetBoard = function() {
  for (var i = 0; i < cards.length; i++) {
    document.getElementsByTagName('img')[0].remove()
  };
  cardsInPlay = [];
  cardNumsInPlay = [];
  createBoard();
};

var clearBoard = function() {
  for (var i = 0; i < cards.length; i++) {
    document.getElementsByTagName('img')[0].remove()
  };
  cardsInPlay = [];
  cardNumsInPlay = [];
};

var sleep = function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var deleteButton = function() {
  document.querySelector('button').remove();
  document.querySelector('button').remove();
  shuffle(randomCards);
};

var deleteScore = function() {
  document.getElementsByTagName('h2')[1].remove();
}

var resetScore = function() {
  var keepScore = document.createElement('h2');
  keepScore.textContent = "CURRENT SCORE: " + score;
  document.getElementById('reset').appendChild(keepScore);
}
var topScores = [4400,4000,3600,3000,1600];
var topPlayers = ['Ben','Dr X','spy','lion','memory man'];
var rank = ['1.','2.','3.','4.','5.'];

var scoreZero = function() {
  topScores.push(score);
  topScores = topScores.sort(function (a, b) {  return a - b;  });
  topScores = topScores.reverse();
  topScores = topScores.slice(0,5);
  if (score > topScores[4]) {
    var name = prompt("You made the top 5, What is your name to add to the Leaderboard?")
    topPlayers[topScores.indexOf(score)] = name;
  } else {
    alert ("You didn't make the Leaderboard, have a look at the scores you need to aim for!")
  };
  createLeaderboard();
  score = 0;
  deleteScore();
};

var createLeaderboard = function() {
  for (var i = 0; i < rank.length; i++) {
    var rankCol = document.createElement('td');
    rankCol.textContent = rank[i];
    var playerCol = document.createElement('td');
    playerCol.textContent = topPlayers[i];
    var scoreCol = document.createElement('td');
    scoreCol.textContent = topScores[i];
    document.getElementById(i).appendChild(rankCol)
    document.getElementById(i).appendChild(playerCol)
    document.getElementById(i).appendChild(scoreCol)
    document.getElementsByTagName('table')[0].style.display = 'unset';
  };
};

createBoard()
resetScore()
