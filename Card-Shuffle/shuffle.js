let container = document.getElementsByClassName("container");
let cards = document.getElementsByClassName("table");
let cardImages = document.getElementsByClassName("cards");

let shuffleCount = 9; //Number of time cards should shuffle
let transSpeed = 0.20; //Shuffle animation speed
let waitTime = 400; //Time delay for shuffle animation to complete
let shuffleRate = 80; //Time between each shuffle

let shuffle = true;
let chosenCard;
let cardSprites = {cover: "assets/card-cover.png", chosen: "assets/card-chosen.png", empty: "assets/card-other.png"};
chosenCard = Math.floor(Math.random() * 3); //Choose random card
cardImages[chosenCard].id = "chosen";
console.log('%c'+chosenCard, 'color: pink; background-color: black; width: 25px');
cardImages[chosenCard].src = cardSprites.chosen;

window.onclick = async () => {
    if(shuffle){
        shuffle = false;
        for(let i = 0; i < 3; i++) //Cover all cards and start shuffle
            cardImages[i].src = cardSprites.cover;
        cards = document.getElementsByClassName("table");
        await Shuffle();
    }
    else{
        let chosenImage = document.getElementById("chosen");
        chosenImage.src = cardSprites.chosen;
    }
}

const Wait = async(delay) => { //Delay
    await new Promise((resolve) =>{
        setTimeout(() => {
            resolve();
        },delay);
    });
}

const Shuffle = async () => { //Shuffle the cards
    let card0;
    let card1;
    let prev0;
    let prev1;
    for(let i = 0; i < shuffleCount; i++)
    {
        do{
            card0 = Math.floor(Math.random() * 3);
            card1 = Math.floor(Math.random() * 3);
        }while(card0 === card1 || (card0 === prev0 && card1 === prev1)); //Generate two random indices until they are not same as prev iteration

        if(card1 < card0)
        {
            let temp = card0;
            card0 = card1;
            card1 = temp;
        }

        console.log({Card_0: card0, Card_1: card1});
        const pos0 = cards[card0].getBoundingClientRect().left;
        const pos1 = cards[card1].getBoundingClientRect().left;
        const movePos = pos1 - pos0; //Calculate the distance the cards should move

        cards[card0].style.transition = "transform " + transSpeed + "s ease";
        cards[card1].style.transition = "transform " + transSpeed + "s ease";
        cards[card0].style.transform = 'translateX('+ movePos +'px)';
        cards[card1].style.transform = 'translateX('+ -movePos +'px)';

        await Wait(waitTime);

        if(card0 === 0 && card1===2) //Change the order of divs in html according to shuffle
        {
            container[0].insertBefore(cards[2],cards[0]);
            container[0].insertBefore(cards[2],cards[1]);
        }
        else
            container[0].insertBefore(cards[card1],cards[card0]);

        cards[card0].style.transition = "transform 0s ease";
        cards[card1].style.transition = "transform 0s ease";
        cards[card0].style.transform = 'translateX('+ 0 +'px)';
        cards[card1].style.transform = 'translateX('+ 0 +'px)';

        prev0 = card0;
        prev1 = card1;

        await Wait(shuffleRate);
    }
}