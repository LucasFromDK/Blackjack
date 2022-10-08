let drawnCard = 0;
let playerScore = 0;
let dealerScore = 0;
let playerHighAces = 0;
let dealerHighAces = 0;
let isStanding = false;
let dealerWin = false;
let playerWin = false;
let isPush = false;
let isBlackjack = false;

function preload() {
  img = loadImage('images/Table Icon.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  playerHit();
  playerHit();
  dealerHit();

  blackjackDetector();

  ButtonInput()
}

function ButtonInput() {
  button = createButton("Hit");
  button.position(10, windowHeight / 2);
  button.size(100, 50)
  button.style("font-size", "24px");
  button.mousePressed(Hit);
  
  button = createButton("Stand");
  button.position(windowWidth - 110, windowHeight / 2);
  button.size(100, 50)
  button.style("font-size", "24px");
  button.mousePressed(Stand);
}

function Hit() {
  if (playerScore < 21 && isStanding == false) {
    playerHit()
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

  textAlign(CENTER)
  fill("black")
  textSize(24);
  text("Player: " + playerScore + "\n" + "Dealer: " + dealerScore, width / 2, 45);
  if (isPush) {
    text("Push", width / 2, height / 2);
  } else if (isBlackjack) {
    text("Blackjack 🃏", width / 2, height / 2);
  } else if (dealerWin) {
    text("Dealer Wins", width / 2, height / 2);
  } else if (playerWin) {
    text("Player Wins", width / 2, height / 2);
  }
}

function FancyUI() {
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