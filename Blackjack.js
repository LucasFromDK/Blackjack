let drawnCard = 0, playerScore = 0, dealerScore = 0, playerHighAces = 0, dealerHighAces = 0;
let isStanding = false, dealerWin = false, playerWin = false, isPush = false, isBlackjack = false;
let chipScore = 1000, oldScore = 1000;
let betAmount = 50;

function preload() {
  img = loadImage('images/Table Icon.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameStart()
  ButtonInput();
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
    playerHit();

    dealerHit();

    blackjackDetector();
  }
}

function ButtonInput() {
  button = createButton("Hit");
  button.position(10, windowHeight / 2);
  button.size(100, 50);
  button.style("font-size", "24px");
  button.mousePressed(Hit);
  
  button = createButton("Stand");
  button.position(windowWidth - 110, windowHeight / 2);
  button.size(100, 50);
  button.style("font-size", "24px");
  button.mousePressed(Stand);

  button = createButton("Restart and Bet 50")
  button.position(windowWidth / 2 - 100, 120);
  button.size(200, 30);
  button.style("font-size", "20px");
  button.mousePressed(gameStart)
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

function draw() {
  background(255);
  displayText();

  playerBustDetector();
  whoWon();
}


function playerHit() {
  drawnCard = int(random(1, 14));

  if (drawnCard == 11 || drawnCard == 12 || drawnCard == 13) {
    playerScore += 10;
  } else if (drawnCard == 1) {
    playerScore += 11;
    playerHighAces++;
  } else {
    playerScore += drawnCard;
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
  FancyUI()
  Scoreboard()
  
  if (isPush) {
    text("Push", width / 2, height / 2);
    chipScore = oldScore + betAmount;
  } else if (isBlackjack) {
    text("Blackjack 🃏", width / 2, height / 2);
    chipScore = oldScore + betAmount * 2 * (3 / 2);
  } else if (dealerWin) {
    text("Dealer Wins", width / 2, height / 2);
  } else if (playerWin) {
    text("Player Wins", width / 2, height / 2);
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
  text("Blackjack | By: @LucasFromDK & @Th3-Duck", 20, 15);
  text("❌", windowWidth - 20, 15);
  //Table Image
  imageMode(CENTER)
  image (img, windowWidth/2, windowHeight/2)
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