/*Základní proměnné*/
let totalScore, roundScore, activePlayer, dice, playGame;

newStart();

function newStart(){
    totalScore = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    playGame = true;

    //vynulování a odstranění kostky
    document.getElementById("totalScorePlayer-0").textContent = 0;
    document.getElementById("totalScorePlayer-1").textContent = 0;
    document.getElementById("currentScore-0").textContent = 0;
    document.getElementById("currentScore-1").textContent = 0;

    //nulování kostky
    document.querySelector(".diceImage").style.display = "none";

    //texty do původního stavu
    document.querySelector("#name-0").textContent = "Skóre hráče 1";
    document.querySelector("#name-1").textContent = "Skóre hráče 2";

    //vrátíme zvýraznění aktivního hráče k prvnímu a druhého odstraníme
    document.querySelector(".totalScore0").classList.add("active");
    document.querySelector(".totalScore1").classList.remove("active");
}

/*Měníme obrázek podle náhodného čísla*/
document.querySelector(".rollDice").addEventListener("click", function(){
    if(playGame){
        //1. generujeme náhodné číslo od 1 do 6
    let dice = Math.ceil(Math.random()*6);

    //2. zobrazit správný obrázek
    let diceElement = document.querySelector(".diceImage");
    diceElement.style.display = "block";
    console.log(diceElement.src = "img/" + dice + ".jpg");

    //3. nasčítáme čísla z kostky
    if (dice !== 1){
        roundScore = roundScore + dice;
    document.getElementById("currentScore-" + activePlayer).textContent = roundScore;
    } else {
        //hraje další hráč
        nextPlayer();
        }
    }  
});

function nextPlayer(){
    if(activePlayer === 0){
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

    roundScore = 0;

    document.getElementById("currentScore-0").textContent = 0;
    document.getElementById("currentScore-1").textContent = 0;

    document.querySelector(".totalScore0").classList.toggle("active");
    document.querySelector(".totalScore1").classList.toggle("active");
}

document.querySelector(".holdScore").addEventListener("click", function(){
    if(playGame){
        //celkové skóre se vyplní současným skóre
    totalScore[activePlayer] = totalScore[activePlayer] + roundScore;

    //
    document.querySelector("#totalScorePlayer-" + activePlayer).textContent = totalScore[activePlayer];
    
    if(totalScore[activePlayer] >= 50){
        document.querySelector("#name-" + activePlayer).textContent = "Výborně, jsi vítěz!";
        playGame = false;
    } else {
        nextPlayer();
        }
    }
});

document.querySelector(".newGame").addEventListener("click", newStart);