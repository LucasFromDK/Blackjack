let bjScore = 0;
let drawnCard = 0;
let playerScore = 0;
let dealerScore = 0;
let stand = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  CardManager()
}

function CardManager(){
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

function draw() {
  background(255);
  UserInterface();

  if (playerScore > 21) {
    text("Dealer Win", width / 2 , height / 2);
  }
  if ((playerScore > dealerScore || dealerScore > 21) && stand == true) {
    text("You Win", width / 2 - 100, height / 2);
  } else if (dealerScore > playerScore && stand == true && playerScore < 22) {
    text("Dealer Win", width / 2 - 100, height / 2);
  } else if (dealerScore == playerScore && stand == true) {
    text("Push", width / 2 - 100, height / 2);
  }
}

function mouseClicked() {
  if (mouseX < width / 2) {
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
  } else {
    dealerTurn();
    stand = true;
  }
}

function dealerTurn() {
  while (dealerScore < 17) {
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
    if (dealerScore > 21) {
      dealerScore = dealerScore + ", Dealer Bust";
    }
  }
}

function UserInterface() {
  fill("green")
  rect(0, 0, width, 20)
  textSize(12)
  fill("white")
  text("🃏 Blackjack | By: @LucasFromDK & @Th3-Duck", 1, 15)
  text("❌", windowWidth - 20, 15)
  //Scores
  fill("black")
  textSize(24);
  text("Your Hand: " + playerScore, windowWidth / 2 - 100, 40);
  text("Dealer Hand: " + dealerScore, windowWidth / 2 - 100, 60);
  text("Hit", 10, height / 2);
  text("Stand", width - 80, height / 2);
}