// Challenge 1: Your Age in Days

function ageInDays(){
  var birthYear = prompt('what year were you born... Goo friend?');
  var ageInDayss = (2018 - birthYear) * 365;
  var h1 = document.createElement('h1');
  var textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old');
  h1.setAttribute('id', 'ageInDays');
  h1.appendChild(textAnswer); 
  document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
  document.getElementById('ageInDays').remove();
}

//challegen 2: Cat Generator 
function generateCat(){
  var image = document.createElement('img');
  var div = document.getElementById('flex-cat-gen');
  image.src = "https://cdn2.thecatapi.com/images/a74.gif"
  div.appendChild(image);
}

//challegen 3: Rock, Paper, Scissors
function rpsGame(yourChoice){
  console.log(yourChoice);
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  console.log('Computer choice', botChoice);
  
  //[0, 1] human lost | bot won
  results = decideWinner(humanChoice, botChoice); 
  console.log(results);
  
  // {message: 'You Won!', 'color': 'green'}
  message = finalMessage(results);  
  console.log(message);

  rpsFrontEnd(yourChoice.id, botChoice, message); 
}

function randToRpsInt(){
  return Math.floor(Math.random() *3);
}

function numberToChoice(number){
  return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
  var rpsDatabase = {
    'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
    'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0 },
    'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
  };
  var yourScore = rpsDatabase[yourChoice][computerChoice];

  var computerScore = rpsDatabase[computerChoice] [yourChoice];
  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
  if (yourScore === 0){
    return {'message': 'You lost', 'color': 'red'};
  } else if (yourScore === 0.5){
    return {'message': 'You tied', 'color': 'yellow'};
  } else {
    return {'message': 'You won!', 'color': 'green'};
  }

}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
  var imagesDatabase = {
    //.src gives you the source of image
    'rock' : document.getElementById('rock').src,
    'paper' : document.getElementById('paper').src,
    'scissors' : document.getElementById('scissors').src
  }
  // let's remove all the images
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var messagetDiv = document.createElement('div');
  
  //construct HTML with JS to give the img element the value of parameter of the function 
  humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' heigth=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"

  messagetDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size: 60px; padding:30; '>" + finalMessage['message'] + "</h1>"

  botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' heigth=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"


  document.getElementById('flex-box-rps-div').appendChild(humanDiv);

  document.getElementById('flex-box-rps-div').appendChild(messagetDiv);

  document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// Chaleenge 4: Change the COlor of All Buttons

// Gonna construt a array with all buttons in the page 
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++){
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
  if(buttonThingy.value === 'red'){
    buttonsRed();
  } else if(buttonThingy.value === 'green'){
    buttonsGreen();
  } else if(buttonThingy.value === 'reset'){
    buttonsColorReset();
  }else if(buttonThingy.value === 'random'){
    randomColors();
  }
}

function buttonsRed() {
  for (let i=0; i < all_buttons.length; i++){
    // will remove all the seconds classes 
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    // will replace all the seconds class with the bt-danger(red button)
    all_buttons[i].classList.add('btn-danger');
  }
}

function buttonsGreen() {
  for (let i=0; i < all_buttons.length; i++){
    // will remove all the seconds classes 
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    // will replace all the seconds class with the bt-danger(red button)
    all_buttons[i].classList.add('btn-success');
  }
}

function buttonsColorReset(){
  for (let i=0; i < all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]); 
  }
}

function randomColors(){
  var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

  for (let i=0; i < all_buttons.length; i++){
    var randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}

// Chaleenge 5: Blackjack
// querySelector CSS selector - is way easier because you avoid to code in html "onclick, onchange ..."

let blackjackGame = {
  'you': {
    'scoreSpan': '#your-blackjack-result', 
    'div': '#your-box', 
    'score': 0
  },
  'dealer': {
    'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 
    'score': 0
  },
  'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],

  'cardsMap': {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
    '7': 7, '8': 8, '9': 9, '10': 10, 
    'K': 10, 'J': 10, 'Q': 10, 'A': [1,11]
  },

  'wins': 0,
  'losses': 0,
  'draws': 0,

  'isStand': false,
  'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

//create a const with the sound for the bottun 
const hitSound = new Audio('static/sounds/swish.m4a');

const winSound = new Audio('static/sounds/cash.mp3');

const lossSound = new Audio('static/sounds/aww.mp3');


//if you hit the button with that "id" it call the function 
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackHit() {
  if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    
  } 
}

function randomCard(){
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
  if (activePlayer['score'] <= 21){
    //create image element in HTML
    let cardImage = document.createElement('img');
    
    //with the argument "${}" you can use a variable to pic your card inside of a folder
    cardImage.src = `static/images/${card}.png`;

    //adding the image element to the div  
    document.querySelector(activePlayer['div']).appendChild(cardImage);

    //argument to play the hitSound
    hitSound.play();
  }
}

function blackjackDeal(){
  if (blackjackGame['turnsOver'] === true){

    blackjackGame['isStand'] = false;

    // it will select "your-box" and all images that "your-box" as that moment
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');  
    
    for (i=0; i < yourImages.length; i++){
      yourImages[i].remove();
    }

    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');  
    
    for (i=0; i < dealerImages.length; i++){
      dealerImages[i].remove();
    }

    // will change the score of the player to 0
    YOU['score'] = 0;
    DEALER['score'] = 0;

    // it will change the text content to 0 
    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector('#blackjack-result').textContent = "Let's Play"
    document.querySelector('#blackjack-result').style.color = 'black';  

    blackjackGame['turnsOver'] = true;
  }
}
 
function updateScore(card, activePlayer){
  //statement if the card is a 'A'
  if (card === 'A') {

    //if adding 11 keeps below 21, add 11. Otherwise, add 1.
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
      activePlayer['score'] += blackjackGame['cardsMap'][card][1]; 
    } else   {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    } 
  } else{
    //get wich player is and the score of the player and then increment the score by the cardsMap dictionary and we give the key value as the random card that appeares 
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
}

function showScore(activePlayer){
  //BUST LOGIC
  // when the score it reaches higher then 21 it will change the spanScore to "BUST!" with color red
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';

    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else {
    //querry to the select active player scoreSpan and then update the textContent with the activePlayer score
    
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

function sleep(ms){
  //
  return new Promise(resolve => setTimeout(resolve,ms));
}

// async is for your code running leneary, for the browser doens't freeze, that means that the program is not running on this quee system 

async function dealerLogic() {
  blackjackGame['isStand'] = true;

  while (DEALER['score'] < 16 && blackjackGame['isStand']=== true){
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000)
  }

  blackjackGame['turnsOver'] = true;
  let winner = computeWinner();
  showResult(winner);

}

// compute winner and return who just won
// update the winds, draws mad losses

function computeWinner(){
  let winner;

  if (YOU['score'] <= 21){
    // condition: higher score than dealer or when dealer busts but your're 2
    if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
      blackjackGame['wins']++;
      winner = YOU;

    } else if (YOU['score'] < DEALER['score']){
      blackjackGame['losses']++;
      winner = DEALER;

    } else if (YOU['score'] === DEALER['score']){
      blackjackGame['draws']++;

    }

  // condition: when user busts but dealer doesn't
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21){
    blackjackGame['losses']++;
    winner = DEALER;

  // condition: when you AND the dealer busts
  } else if (YOU['score'] > 21 && DEALER['score']>21){
    blackjackGame['draws']++;

  }

  console.log(blackjackGame);
  return winner;
}

function showResult(winner){
  let message, messageColor;
  
  if (blackjackGame['turnsOver'] === true){
    if (winner === YOU){
      document.querySelector('#wins').textContent = blackjackGame['wins'];
      message = 'You won!';
      messageColor = 'green';
      winSound.play();

    } else if (winner === DEALER){
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = 'You lost!';
      messageColor = 'red';
      lossSound.play();

    } else {
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = 'You drew!';
      messageColor = 'black';

    }

    document.querySelector('#blackjack-result').textContent = message;  
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}

// Changellenge 6: AJAX & API's with Javascript

// Get 10 random users
const url = 'https://randomuser.me/api/?results=10'; 

// Getting url from the constant "url"
fetch(url)

// Turn the data from the constant as JSON data like a group of objects
  .then(resp => resp.json())  

// with that data with gonna manupillate to appear only the image of the profile and the first and last name 
  .then(data => {
    let authors = data.results;

    console.log(authors);

    for (i=0; i < authors.length; i++){
      let div = document.createElement('div');
      let image = document.createElement('img');
      let p = document.createElement('p');

      p.appendChild(document.createTextNode(`${title(authors[i].name.first)} ${title(authors[i].name.last)}`));

      image.src = authors[i].picture.large;

      div.appendChild(image);
      div.appendChild(p);

      document.querySelector('.container-6 .flex-ajax-row-1').appendChild(div);
      
    }

  });

  let title = str => str[0].toUpperCase(1) + str.slice(1);















