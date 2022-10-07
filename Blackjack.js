let bjScore = 0, drawnCard = 0, playerScore = 0, dealerScore = 0;
let stand = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  CardManager();
  ButtonInput();
}

function CardManager() {
  cardDrawer()
  cardDrawer()
  dealerDrawer()
}

function cardDrawer() {
  drawnCard = int(random(13));
  if (drawnCard == 11 || drawnCard == 12 || drawnCard == 13) {
    playerScore += 10;
  } else if (drawnCard == 1 && playerScore <= 10) {
    playerScore += 11;
  } else if (drawnCard == 1 && playerScore > 10) {
    playerScore += 1;
  } else {
    playerScore += drawnCard;
  }
}

function dealerDrawer() {
  drawnCard = int(random(13));
  if (drawnCard == 11 || drawnCard == 12 || drawnCard == 13) {
    dealerScore += 10;
  } else if (drawnCard == 1 && dealerScore <= 10) {
    dealerScore += 11;
  } else if (drawnCard == 1 && dealerScore > 10) {
    dealerScore += 1;
  } else {
    dealerScore += drawnCard;
  }
}

function ButtonInput() {
  button = createButton("Hit");
  button.position(10, windowHeight / 2);
  button.mousePressed(Hit);
  
  button = createButton("Stand");
  button.position(windowWidth - 75, windowHeight / 2);
  button.mousePressed(Stand);
}

function draw() {
  background(255);
  UserInterface();
  winnerText();
}

function winnerText() {
  if (playerScore > 21) {
    text("Dealer Win", width / 2, height / 2);
  } if ((playerScore > dealerScore || dealerScore > 21) && stand == true) {
    text("You Win", width / 2 - 100, height / 2);
  } else if (dealerScore > playerScore && stand == true) {
    text("Dealer Win", width / 2 - 100, height / 2);
  } else if (dealerScore == playerScore && stand == true) {
    text("Push", width / 2 - 100, height / 2);
  }
}

function Hit() {
  if (playerScore < 22 && stand == false) {
    cardDrawer()
  }
}

function Stand() {
  dealerTurn()
  stand = true
}

function dealerTurn() {
  while (dealerScore < 17) {
  dealerDraw()
  }
}

function UserInterface() {
  fill("green");
  rect(0, 0, width, 20);
  textSize(16)
  text("🃏", 1, 16);
  textSize(12);
  fill("white");
  text("Blackjack | By: @LucasFromDK & @Th3-Duck", 20, 15);
  text("❌", windowWidth - 20, 15);
  //Scores
  fill("black");
  textSize(24);
  text("Your Hand: " + playerScore, windowWidth / 2 - 100, 40);
  text("Dealer Hand: " + dealerScore, windowWidth / 2 - 100, 60);
}