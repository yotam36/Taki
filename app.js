const cardElement = document.getElementById("card");
const numberElement = document.querySelectorAll(".visnum");
const playercardPackageElement = document.getElementById("player-card-list");
const computercardPackageElement = document.getElementById("computer-card-list");
const backImageElement = document.querySelector(".backImage");
const roundNumberElement = document.querySelector(".round");
const turnsEement = document.querySelector(".turns");
const pageCoverElement = document.querySelector(".pageCover");
const winnerPage = document.querySelector(".gameEnd");
const timeLapse = 3000;

let roundNumber = 0;
const PlayerCardsLefelement = document.getElementById("player-cards-left");
const ComputerCardsLefelement = document.getElementById("computer-cards-left");

function setGameBoard(){
    function setFirstCard(){
            let ranNum = Math.floor(Math.random() *(10-2) + 2);
            let newColor = parseColor(Math.floor(Math.random() *(5-1) + 1));
            numberElement.forEach(num =>{
                num.innerHTML = ranNum;
                num.style.color = newColor;
            });
    }

    function setfirstPackage(){
        
        for (let i = 1; i<=6; i++){
            addCardToPlayer();
            addCardToComputer();
        }
    }
    changeturnText(true);

    setFirstCard();
    setfirstPackage();

    
    assignHoverCards();
    assignClickCardListener();
    
}

function changeturnText(player){
    if (player == true){
        turnsEement.innerHTML = "Your Turn";
    }else if (player == false){
        turnsEement.innerHTML = "My Turn...";
    }
}

function assignHoverCards(){
    const singleCard = document.querySelectorAll(".playerCard");
    
    singleCard.forEach(card1 =>{
        card1.style.transition = "200ms";
        card1.onmouseover = function() {mouseOver(card1)};
        card1.onmouseout = function() {mouseOut(card1)};
    });
}

backImageElement.addEventListener("click",(e) =>{

    addCardToPlayer();
    assignHoverCards();
    assignClickCardListener();

    PlayerCardsLeftInt = playercardPackageElement.childElementCount;
    PlayerCardsLefelement.innerHTML = PlayerCardsLeftInt;

    if (playercardPackageElement.childElementCount == 0){
        winnerPage.classList.remove("hidden");
        winnerPage.innerHTML = "You Won The Game!!!";
    } else if (computercardPackageElement.childElementCount == 0){
        winnerPage.classList.remove("hidden");
        winnerPage.innerHTML = "You Lost The Game!!!";
    }


    changeturnText(false);
    pageCoverElement.classList.remove("hidden");

    const myTimeOut = setTimeout(computerPlay, timeLapse);


    addround();
});


function addCardToPlayer(){

    var number = Math.floor(Math.random() * (10-2)+2);
    var color = parseColor(Math.floor(Math.random() * (5-1)+1))

    const newNumtext = document.createElement("div").textContent = number;
    const newCardElement = document.createElement("div");
    const topLineNumbers = document.createElement("div");
    const middleNumber = document.createElement("div");
    const bottomlineNumbers = document.createElement("div");

    middleNumber.style.color = color;
    topLineNumbers.style.color = color;
    bottomlineNumbers.style.color = color;

    topLineNumbers.append(newNumtext);
    topLineNumbers.append(newNumtext);
    middleNumber.append(newNumtext);
    bottomlineNumbers.append(newNumtext);
    bottomlineNumbers.append(newNumtext );


    topLineNumbers.setAttribute("class", "topNum number");
    middleNumber.setAttribute("class", "mainNum visnum number");
    bottomlineNumbers.setAttribute("class", "bottomNum number");


    newCardElement.append(topLineNumbers);
    newCardElement.append(middleNumber);  
    newCardElement.append(bottomlineNumbers);
    

    newCardElement.setAttribute("class", cardElement.className + " playerCard");
    topLineNumbers.style.backgroundColor = "transparent";
    
    playercardPackageElement.style.border = "1px solid black";
    playercardPackageElement.appendChild(newCardElement);

}

function addCardToComputer(){

    var number = Math.floor(Math.random() * (10-2)+2);
    var color = parseColor(Math.floor(Math.random() * (5-1)+1))

    const newNumtext = document.createElement("div").textContent = number;
    const newCardElement = document.createElement("div");
    const topLineNumbers = document.createElement("div");
    const middleNumber = document.createElement("div");
    const bottomlineNumbers = document.createElement("div");

    middleNumber.style.color = color;
    topLineNumbers.style.color = color;
    bottomlineNumbers.style.color = color;

    topLineNumbers.append(newNumtext);
    topLineNumbers.append(newNumtext);
    middleNumber.append(newNumtext);
    bottomlineNumbers.append(newNumtext);
    bottomlineNumbers.append(newNumtext );


    topLineNumbers.setAttribute("class", "topNum number");
    middleNumber.setAttribute("class", "mainNum visnum number");
    bottomlineNumbers.setAttribute("class", "bottomNum number");


    newCardElement.append(topLineNumbers);
    newCardElement.append(middleNumber);  
    newCardElement.append(bottomlineNumbers);
    

    newCardElement.setAttribute("class", cardElement.className);
    topLineNumbers.style.backgroundColor = "transparent";
    
    computercardPackageElement.style.border = "1px solid black";
    computercardPackageElement.appendChild(newCardElement);

}

function parseColor(color){
    switch (color){
        case 1:
            return "blue";
        case 2:
            return "green";
        case 3:
            return "#eed701";
        case 4:
            return "red";
    }
}


function mouseOver(element1) {
    element1.style.transform = "scale(1.05)";
}
function mouseOut(element1){
    element1.style.transform = "scale(1)";
}

function assignClickCardListener(){
    const allPlayerCardesElement = document.querySelectorAll(".playerCard");

    allPlayerCardesElement.forEach(singleCard2 =>{
        singleCard2.addEventListener("click",(e) =>{

            /* chack if the card can be placed  */

            let numChosen = singleCard2.querySelector(".mainNum").innerHTML;
            let coloChosen = singleCard2.querySelector(".mainNum").style.color;

            let numCardMiddle = cardElement.querySelector(".mainNum").innerHTML;
            let colorCardMiddle = cardElement.querySelector(".mainNum").style.color;

            if (numChosen == numCardMiddle || coloChosen == colorCardMiddle){    
                dropCard(singleCard2);
                playercardPackageElement.removeChild(singleCard2);

                PlayerCardsLeftInt = playercardPackageElement.childElementCount;
                PlayerCardsLefelement.innerHTML = PlayerCardsLeftInt;

                if (playercardPackageElement.childElementCount == 0){
                    winnerPage.classList.remove("hidden");
                    winnerPage.innerHTML = "You Won The Game!!!";
                } else if (computercardPackageElement.childElementCount == 0){
                    winnerPage.classList.remove("hidden");
                    winnerPage.innerHTML = "You Lost The Game!!!";
                }
    

                changeturnText(false);
                pageCoverElement.classList.remove("hidden");

                const myTimeOut = setTimeout(computerPlay, timeLapse);

                addround();
            }
            else {
                alert("You cant place this card, mismatch with color or number");
                return;
            }
        });

    });
}

function dropCard(cardElementLocal){
    const mainNumberElement = cardElementLocal.querySelector(".mainNum");
    let numberInt = mainNumberElement.innerHTML;
    let color = mainNumberElement.style.color;

    const allCardNumberelement = cardElement.querySelectorAll(".visnum");

    allCardNumberelement.forEach (numb =>{
        numb.innerHTML = numberInt;
        numb.style.color = color;
    });
}

function addround(){
    roundNumber++;
    roundNumberElement.innerHTML = roundNumber;
}

function computerPlay(){

    if (playercardPackageElement.childElementCount == 0){
        winnerPage.classList.remove("hidden");
        winnerPage.innerHTML = "You Won The Game!!!";
    } else if (computercardPackageElement.childElementCount == 0){
        winnerPage.classList.remove("hidden");
        winnerPage.innerHTML = "You Lost The Game!!!";
    }else{

        const allCompuerCardsElement = computercardPackageElement.querySelectorAll(".card");
        let i=0;

        let numCardMiddle = cardElement.querySelector(".mainNum").innerHTML;
        let colorCardMiddle = cardElement.querySelector(".mainNum").style.color;
        let compnumber;
        let compcolor

        do{
            compnumber = allCompuerCardsElement[i].querySelector(".mainNum").innerHTML;
            compcolor = allCompuerCardsElement[i].querySelector(".mainNum").style.color;
            i++;
        }
        while (compnumber != numCardMiddle && compcolor != colorCardMiddle && i < computercardPackageElement.childElementCount);

        if (compnumber == numCardMiddle || compcolor == colorCardMiddle){
            dropCard(allCompuerCardsElement[i-1]);
            computercardPackageElement.removeChild(allCompuerCardsElement[i-1]);

            computerCardsLeftInt = computercardPackageElement.childElementCount;
            ComputerCardsLefelement.innerHTML = computerCardsLeftInt; 
        }
        else if(i ==computercardPackageElement.childElementCount) {
            addCardToComputer();

            computerCardsLeftInt = computercardPackageElement.childElementCount;
            ComputerCardsLefelement.innerHTML = computerCardsLeftInt; 
        }

        changeturnText(true);
        pageCoverElement.classList.add("hidden");

        if (playercardPackageElement.childElementCount == 0){
            winnerPage.classList.remove("hidden");
            winnerPage.innerHTML = "You Won The Game!!!";
        } else if (computercardPackageElement.childElementCount == 0){
            winnerPage.classList.remove("hidden");
            winnerPage.innerHTML = "You Lost The Game!!!";
        }
    
    }}
