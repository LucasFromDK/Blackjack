let drawnCard = 0, playerScore = 0, dealerScore = 0, playerHighAces = 0, dealerHighAces = 0, hasPlayerMoved = 0;
let isStanding = false, dealerWin = false, playerWin = false, isPush = false, isBlackjack = false;
let chipScore = 1000, oldScore = 1000;
let betAmount = 50;

let playerCardOne = 0
let playerCardTwo = 1

let surrenderButton = createButton("SURRENDER 25 CHIPS");
let noSurrenderButton = createButton("NOT AVAILABE");

function preload() {
  img = loadImage('images/New Logo 1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameStart()
}

function draw() {
  background(255);
  displayText();

  playerBustDetector();
  whoWon();
}

function gameStart() {
  betAmount = 50;

  oldScore = chipScore;
  if (chipScore >= betAmount) {
    drawnCard = 0;
    playerScore = 0;
    dealerScore = 0;
    playerHighAces = 0;
    dealerHighAces = 0;
    isStanding = false;
    dealerWin = false;
    playerWin = false;
    isPush = false;
    isBlackjack = false;
    hasPlayerMoved = 0;
    chipScore = oldScore - betAmount;
    oldScore = chipScore;

    playerHit();
    showCardOne()
    
    playerHit();
    showCardTwo()

    dealerHit();

    blackjackDetector();
  }
}

function showCardOne() {
    playerCardOne = drawnCard  
    if (drawnCard == 1) {
    playerCardOne = "🂡"
    } else if (drawnCard == 11) {
      playerCardOne = "Jack"
    } else if (drawnCard == 12) {
      playerCardOne = "Queen"
    } else if (drawnCard == 13) {
      playerCardOne = "King"
    }
}

function showCardTwo() {
    playerCardTwo = drawnCard  
    if (drawnCard == 1) {
    playerCardTwo = "🂡"
    } else if (drawnCard == 11) {
      playerCardTwo = "Jack"
    } else if (drawnCard == 12) {
      playerCardTwo = "Queen"
    } else if (drawnCard == 13) {
      playerCardTwo = "King"
    }
}

function ButtonInput() {
  //Left Side
  button = createButton("Hit");
  button.position(10, windowHeight / 2);
  button.size(100, 50);
  button.style("font-size", "24px");
  button.mousePressed(Hit);
  
  button = createButton("Doubledown");
  button.position(10, windowHeight / 2 + 60);
  button.size(130, 50);
  button.style("font-size", "20px");
  button.mousePressed(doubleDown);

  //Right Side
  button = createButton("Stand");
  button.position(windowWidth - 110, windowHeight / 2);
  button.size(100, 50);
  button.style("font-size", "24px");
  button.mousePressed(Stand);

  //Middle
  button = createButton("Restart and Bet 50");
  button.position(windowWidth / 2 - 100, 110);
  button.size(200, 25);
  button.style("font-size", "18px");
  button.mousePressed(gameStart);

  //Surrender + Surrencer Blocker
  if (hasPlayerMoved <= 2) {
    button = createButton("Surrender for 25");
    button.position(windowWidth / 2 - 100, 140);
    button.size(200, 25);
    button.style("font-size", "18px");
    button.mousePressed(Surrender);
  } else if (hasPlayerMoved > 2) {
    button = createButton("Not Availabe");
    button.position(windowWidth / 2 - 100, 140);
    button.size(200, 25);
    button.style("font-size", "18px");
  }
}

function Hit() {
  if (playerScore < 21 && isStanding == false) {
    playerHit();
  }
}

function Stand() {
  if(playerScore <= 21) {
    dealerTurn()
    isStanding = true
    }
}

function playerHit() {
  if (!isStanding) {
    drawnCard = int(random(1, 14));

    if (drawnCard == 11 || drawnCard == 12 || drawnCard == 13) {
      playerScore += 10;
    } else if (drawnCard == 1) {
      playerScore += 11;
      playerHighAces++;
    } else {
      playerScore += drawnCard;
    }
    console.log(drawnCard)
    hasPlayerMoved++;
  }
}

function dealerHit() {
  drawnCard = int(random(1, 14));

  if (drawnCard == 11 || drawnCard == 12 || drawnCard == 13) {
    dealerScore += 10;
  } else if (drawnCard == 1) {
    dealerScore += 11;
    dealerHighAces++;
  } else {
    dealerScore += drawnCard;
  }
}

function dealerTurn() {
  while (dealerScore <= 17) {
    dealerHit();

    if (dealerScore > 21) {
      if (dealerHighAces > 1) {
        dealerScore -= 10;
        dealerHighAces--;
      } else {
        playerWin = true;
      }
    }
  }
}

function whoWon() {
  if (playerScore > dealerScore && isStanding == true && dealerWin == false) {
    playerWin = true;
  } else if (
    playerScore < dealerScore &&
    isStanding == true &&
    playerWin == false
  ) {
    dealerWin = true;
  } else if (playerScore == dealerScore && isStanding == true) {
    isPush = true;
  }
}

function displayText() {
  TableImage()
  FancyUI()
  Scoreboard()
  ButtonInput()
  cardDisplay()

  textAlign(CENTER)
  if (isPush) {
    text("Push", width / 2, height / 2 + 15);
    chipScore = oldScore + betAmount;
  } else if (isBlackjack) {
    text("Blackjack 🃏", width / 2, height / 2 + 15);
    chipScore = oldScore + betAmount * 2 * (3 / 2);
  } else if (dealerWin) {
    text("Dealer Wins", width / 2, height / 2 + 100);
  } else if (playerWin) {
    text("Player Wins", width / 2, height / 2 + 100);
    chipScore = oldScore + betAmount * 2;
  }
}

function Scoreboard() {
  textAlign(CENTER)
  fill("black")
  textSize(24);
  text("Chips: " + chipScore + "\nPlayer: " + playerScore + ", Aces: " + playerHighAces + " 🂡"  + "\nDealer: " + dealerScore + ", Aces: " + dealerHighAces + " 🂡", width / 2, 45);
}

function FancyUI() {
  textAlign(LEFT)
  fill("green");
  rect(0, 0, width, 20);
  textSize(16)
  text("🃏", 1, 16);
  textSize(12);
  fill("white");
  text("Blackjack | By: @LucasFromDK & @AugmentedDuck", 20, 15);
  text("❌", windowWidth - 20, 15);
}

function TableImage() {
  imageMode(CENTER)
  image(img, windowWidth/2, windowHeight/2)
  fill("Black")
  textSize(24)
}

function cardDisplay() {
  textAlign(LEFT)
  text("Your cards: " + playerCardOne + ", " + playerCardTwo, 10,  windowHeight/2 - 10)
}

function playerBustDetector() {
  if (playerScore > 21) {
    if (playerHighAces > 1) {
      playerScore -= 10;
      playerHighAces--;
    } else {
      dealerWin = true;
      isStanding = true;
    }
  }
}

function blackjackDetector() {
  if (playerScore == 21) {
    dealerHit();

    if (dealerScore == 21) {
      isPush = true;
      isStanding = true;
    } else {
      isBlackjack = true;
      isStanding = true;
    }
  }
}

function doubleDown() {
  if (chipScore >= betAmount && isStanding == false) {
    chipScore -= 50;
    betAmount = 100;
    playerHit();
    playerStand();
  }
}

function Surrender() {
  if (hasPlayerMoved <= 2) {
    chipScore += betAmount / 2;
    gameStart();
  }
}