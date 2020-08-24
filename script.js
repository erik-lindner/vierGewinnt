var redBluePlayer = true; //red=true blue=false
var redDiv = "<div class='playerActiveRed'></div>";
var blueDiv = "<div class='playerActiveBlue'></div>";
var round = 2;

//get all slideInFields
var slideInFields = document.querySelectorAll(".slideInField");
//get all fieldItems and convert it to an ARRAY
var fieldItems = Array.from( document.querySelectorAll(".fieldItem"));
var fieldItemsMatrix = [];
//copy all fieldItems to fieldItemsMatrix
for(let i = 0; i < 6; i++){
  var matrixRow = fieldItems.splice(0, 7);
  fieldItemsMatrix.push(matrixRow);
}

var fieldItemsMatrixSimplified = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""]
];

//get INFO Element
var info = document.querySelector(".info");

//get RESET button
var buttonReset = document.querySelector(".info button");
buttonReset.addEventListener("click", resetGame);

//add MOUSEOVER event to all slideInFields
slideInFields.forEach(function(item, index){
  item.addEventListener("mouseenter", function(){
    //add active PLAYER to field
    if(redBluePlayer == true){
      item.innerHTML= redDiv;
    }
    else{
      item.innerHTML= blueDiv;
    }
  });
});

//add MOUSELEAVE event to all slideInFields
slideInFields.forEach(function(item, index){
  //remove active Player from field
  item.addEventListener("mouseleave", function(){
    item.innerHTML = "";
  });
});

//add PLAYER TOKEN to FIELD
slideInFields.forEach(function(item, index){
  item.addEventListener("click", function(){
    //search clicked COLUMN from the bottom
    for(let i = 5; i >= 0; i--){
      //check if field is empty
      if(fieldItemsMatrix[i][index].innerHTML.length == 0){
        //store free FIELD
        var freeField = fieldItemsMatrix[i][index];
        //add active player to field
        freeField.innerHTML = redBluePlayer ? redDiv : blueDiv;
        //add true or false to Array fieldItemsMatrixSimplified
        fieldItemsMatrixSimplified[i][index] = redBluePlayer;

        //Start looking for winner after the SEVENTH turn
        if(round >= 8){
          checkWinner(i, index, redBluePlayer);
        }

        //remove previous player from slideInField
        item.innerHTML = "";
        //switch active PLAYER
        redBluePlayer = !redBluePlayer;

        updateInfo();

        break;
      }
    }
  });
});

//Check for WINNER
function checkWinner(i, index, player){
  console.log(player);
  //CHECK VERTICALLY only if row-index is < 2
  if(i <= 2){
    let verticalCounter = 1;
    for(let j = 1; j <= 3; j++){
      if(fieldItemsMatrixSimplified[i+j][index] == player){
        verticalCounter++;
      }
      else{
        break;
      }
    }
    if(verticalCounter == 4){
      //return winning PLAYER if verticalCounter is 4
      console.log("winner vertical");
      playerWon(player);
      return player;
    }
  }

  //CHECK HORIZONTALLY
  let counterHor = 0;
  console.log(counterHor);
  for(let j = 0; j < fieldItemsMatrix[0].length; j++){
    if(fieldItemsMatrixSimplified[i][j] === player){
      counterHor++;
      console.log(counterHor);
    }
    else{
      counterHor = 0;
      console.log(counterHor);
    }
    if(counterHor >= 4){
      console.log("winner horizontal");
      playerWon(player);
      return player;
    }
  }

  //CHECK DIAGONALLY
  //LEFT DOWN to RIGHT UP
  //fields to the left down:
  var minIndexDown = Math.min(5 - i , index);
  //fields to the right up:
  var minIndexUp = Math.min(i , 6 - index);
  let numIterationPossVert = 1 + minIndexDown + minIndexUp;
  let counterVert = 0;
  for(let j = 0; j < numIterationPossVert; j++){
    if(fieldItemsMatrixSimplified[i + minIndexDown - j][index - minIndexDown + j] === player){
      counterVert++;
      //console.log("Add " + counterVert);
    }
    else{
      counterVert = 0;
      //console.log("Reset: " + counterVert);
    }
    if(counterVert >= 4){
      console.log("winner vertical1");
      playerWon(player);
      return player;
    }
  }

  //RIGHT DOWN to LEFT UP
  //free fields to the right down:
  minIndexDown = Math.min(5 - i , 6 - index);
  //free fields to the left up:
  minIndexUp = Math.min(i , index);
  numIterationPossVert = 1 + minIndexDown + minIndexUp;
  counterVert = 0;
  for(let j = 0; j < numIterationPossVert; j++){
    if(fieldItemsMatrixSimplified[i + minIndexDown - j][index + minIndexDown - j] === player){
      counterVert++;
      console.log("Add: " + counterVert);
    }
    else{
      counterVert = 0;
      console.log("Reset: " + counterVert);
    }
    if(counterVert >= 4){
      console.log("winner vertical2");
      playerWon(player);
      return player;
    }
  }

  //CHECK FOR TIE
  if(round == 43){
    console.log("tie");
  }
}

function updateInfo(){
  //increase round counter
  round++;
  //update INFO DIV
  let player = redBluePlayer ? "Rot" : "Blau";
  info.children[0].innerHTML = "Runde: " + Math.floor(round/2);
  info.children[1].innerHTML = "Spieler aktiv: <span class=" + player + ">" + player + "</span>";
}

function resetGame(){
  for(let i = 0; i < fieldItemsMatrixSimplified.length; i++){
    for(let j = 0; j < fieldItemsMatrixSimplified[0].length; j++){
      fieldItemsMatrix[i][j].innerHTML = "";
      fieldItemsMatrixSimplified[i][j] = "";
      redBluePlayer = true;
      round = 2;
      let player = redBluePlayer ? "Rot" : "Blau";
      info.children[0].innerHTML = "Runde: " + 1;
      info.children[1].innerHTML = "Spieler aktiv: " + player;
    }
  }
}

function playerWon(player){
  let body = document.querySelector("body");
  let winnerHTML = "<div class='playerWon'> ROT hat gewonnen </div>";
  if(player == true){
    //RED WON
    body.innerHTML += ('<div class="playerWon"><p><span class="playerRed">RED</span> PLAYER WON</p><div><button type="button" name="button">Restart</button></div></div>');
  }
  else if (player == false){
    //BLUE WON
    body.innerHTML += ('<div class="playerWon"><p><span class="playerBlue">BLUE</span> PLAYER WON</p><div><button type="button" name="button">Restart</button></div></div>');
  }

  const resetGameAfterEnd = document.querySelector('.playerWon button');
  resetGameAfterEnd.addEventListener('click', ()=>{
    location.reload();
  });
}
