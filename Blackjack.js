let bjScore = 0;
let drawnCard = 0;
let cardScore = 0;
let dealScore = 0;
let stand = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  CardManager()
}

function CardManager(){
  drawnCard = int(random(13));
  if (drawnCard == 11 || drawnCard == 12 || drawnCard == 13) {
    cardScore += 10;
  } else if (drawnCard == 1 && cardScore <= 10) {
    cardScore += 11;
  } else if (drawnCard == 1 && cardScore > 10) {
    cardScore += 1;
  } else {
    cardScore += drawnCard;
  }

  drawnCard = int(random(13));
  if (drawnCard == 11 || drawnCard == 12 || drawnCard == 13) {
    cardScore += 10;
  } else if (drawnCard == 1 && cardScore <= 10) {
    cardScore += 11;
  } else if (drawnCard == 1 && cardScore > 10) {
    cardScore += 1;
  } else {
    cardScore += drawnCard;
  }

  drawnCard = int(random(13));
  if (drawnCard == 11 || drawnCard == 12 || drawnCard == 13) {
    dealScore += 10;
  } else if (drawnCard == 1 && dealScore <= 10) {
    dealScore += 11;
  } else if (drawnCard == 1 && dealScore > 10) {
    dealScore += 1;
  } else {
    dealScore += drawnCard;
  }
}

function draw() {
  background(255);
  standartText();
  if (cardScore > 21) {
    text("Dealer Win", width / 2 , height / 2);
  }
  if ((cardScore > dealScore || dealScore > 21) && stand == true) {
    text("You Win", width / 2 - 100, height / 2);
  } else if (dealScore > cardScore && stand == true && cardScore < 22) {
    text("Dealer Win", width / 2 - 100, height / 2);
  } else if (dealScore == cardScore && stand == true) {
    text("Push", width / 2 - 100, height / 2);
  }
}

function mouseClicked() {
  if (mouseX < width / 2) {
    drawnCard = int(random(13));
    if (drawnCard == 11 || drawnCard == 12 || drawnCard == 13) {
      cardScore += 10;
    } else if (drawnCard == 1 && cardScore <= 10) {
      cardScore += 11;
    } else if (drawnCard == 1 && cardScore > 10) {
      cardScore += 1;
    } else {
      cardScore += drawnCard;
    }
  } else {
    dealerTurn();
    stand = true;
  }
}

function dealerTurn() {
  while (dealScore < 17) {
    drawnCard = int(random(13));
    if (drawnCard == 11 || drawnCard == 12 || drawnCard == 13) {
      dealScore += 10;
    } else if (drawnCard == 1 && dealScore <= 10) {
      dealScore += 11;
    } else if (drawnCard == 1 && dealScore > 10) {
      dealScore += 1;
    } else {
      dealScore += drawnCard;
    }
    if (dealScore > 21) {
      dealScore = " Over";
    }
  }
}

function standartText() {
  textSize(24);
  text("Your Hand:" + cardScore, width / 2 - 100, 20);
  text("Dealer Hand:" + dealScore, width / 2 - 100, 40);
  text("Hit", 10, height / 2);
  text("Stand", width - 80, height / 2);
}