let drawnCard = 0, playerScore = 0, dealerScore = 0, playerHighAces = 0, dealerHighAces = 0, hasPlayerMoved = 0;
let isStanding = false, dealerWin = false, playerWin = false, isPush = false, isBlackjack = false;
let chipScore = 1000, oldScore = 1000;
let betAmount = 50;

let playerCards = [], dealerCards = [];

let surrenderButton = createButton("SURRENDER 25 CHIPS");
let noSurrenderButton = createButton("NOT AVAILABE");

function preload() {
  img = loadImage('images/Table Icon 2.png');
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
    drawnCard = 0, playerScore = 0, dealerScore = 0, playerHighAces = 0, dealerHighAces = 0, hasPlayerMoved = 0;
    isStanding = false, dealerWin = false, playerWin = false, isPush = false, isBlackjack = false
    playerCards = []
    
    chipScore = oldScore - betAmount;
    oldScore = chipScore;

    playerHit();
    playerHit();

    dealerHit();
    blackjackDetector();
  }
}

function ButtonInput() {
  //Bottom Mid
  button = createButton("Hit");
  button.position(windowWidth / 2 - 50, windowHeight - 110);
  button.size(100, 100);
  button.style("font-size", "24px");
  button.mousePressed(Hit);
  
  button = createButton("Doubledown");
  button.position(windowWidth/2 - 190, windowHeight -55);
  button.size(130, 45);
  button.style("font-size", "20px");
  button.mousePressed(doubleDown);

  //Right Side
  button = createButton("Stand");
  button.position(windowWidth / 2 - 190, windowHeight - 110);
  button.size(130, 45);
  button.style("font-size", "24px");
  button.mousePressed(Stand);

  button = createButton("Play & Bet 50");
  button.position(windowWidth / 2 + 60, windowHeight - 110);
  button.size(130, 45);
  button.style("font-size", "18px");
  button.mousePressed(gameStart);

  //Surrender + Surrencer Blocker
  if (hasPlayerMoved <= 2) {
    button = createButton("Surrender for 25");
    button.position(windowWidth / 2 + 60, windowHeight - 55);
    button.size(130, 45);
    button.style("font-size", "18px");
    button.mousePressed(Surrender);
  } else if (hasPlayerMoved > 2) {
    button = createButton("Not Availabe");
    button.position(windowWidth / 2 + 60, windowHeight - 55);
    button.size(130, 45);
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
      append(playerCards, " A")
    } else {
      playerScore += drawnCard;
      append(playerCards, str(" " + drawnCard))
    }

    if (drawnCard == 11) {
      append(playerCards, " J")
    } else if (drawnCard == 12) {
      append(playerCards, " Q")
    } else if (drawnCard == 13) {
      append(playerCards, " K")
    }

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
    append(dealerCards, " A")
  } else {
    dealerScore += drawnCard;
    append(dealerCards, str(" " + drawnCard))
  }

  if (drawnCard == 11) {
    append(dealerCards, " J")
  } else if (drawnCard == 12) {
    append(dealerCards, " Q")
  } else if (drawnCard == 13) {
    append(dealerCards, " K")
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
    text("Dealer Wins", width / 2, height / 2 + 97);
  } else if (playerWin) {
    text("Player Wins", width / 2, height / 2 + 97);
    chipScore = oldScore + betAmount * 2;
  }
}

function Scoreboard() {
  textAlign(CENTER)
  fill("black")
  textSize(24);
  text("Player: " + playerScore + ", Aces: " + playerHighAces + " 🂡"  + "\nDealer: " + dealerScore + ", Aces: " + dealerHighAces + " 🂡" + "\nChips: " + chipScore, width / 2, 45);
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
  let scale = 0.31;
  imageMode(CENTER);
  image(img, 0.5*width, 0.5*height, scale*width, scale*img.height*width/img.width);
  fill(255, 133, 27);
  textStyle(BOLD), textSize(20);
  text("Dealer Stands S17", windowWidth/2, windowHeight/2 + 160);
  textStyle(NORMAL);
}

function cardDisplay() {
  //Player
  textAlign(CENTER), textStyle(BOLD);
  text("Your Cards:" + playerCards, windowWidth / 2,  windowHeight - 120)
  text("Dealer Cards:" + dealerCards, windowWidth / 2, 130)
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