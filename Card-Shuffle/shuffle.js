let container = document.getElementsByClassName("container");
let cards = document.getElementsByClassName("table");
let cardImages = document.getElementsByClassName("cards");

let transSpeed = 0.25; //0.15
let waitTime = 450; //300
let shuffleRate = 100; //100

let shuffle = true;
let chosenCard;
let cardSprites = {cover: "assets/card-cover.jpg", chosen: "assets/card-chosen.jpg", empty: "assets/card-empty.jpg"};
chosenCard = Math.floor(Math.random() * 3);
cardImages[chosenCard].id = "chosen";
console.log('%c'+chosenCard, 'color: pink; background-color: black; width: 25px');
cardImages[chosenCard].src = cardSprites.chosen;

window.onclick = async () => {
    if(shuffle){
        shuffle = false;
        for(let i = 0; i < 3; i++)
            cardImages[i].src = cardSprites.cover;
        cards = document.getElementsByClassName("table");
        await Shuffle();
    }
    else{
        let chosenImage = document.getElementById("chosen");
        chosenImage.src = cardSprites.chosen;
    }
}

const Wait = async(delay) => {
    await new Promise((resolve) =>{
        setTimeout(() => {
            resolve();
        },delay);
    });
}

const Shuffle = async () => {
    let card0;
    let card1;
    let prev0;
    let prev1;
    for(let i = 0; i < 10; i++)
    {
        do{
            card0 = Math.floor(Math.random() * 3);
            card1 = Math.floor(Math.random() * 3);
        }while(card0 === card1 || (card0 === prev0 && card1 === prev1));

        if(card1 < card0)
        {
            let temp = card0;
            card0 = card1;
            card1 = temp;
        }

        console.log({Card_0: card0, Card_1: card1});
        const pos0 = cards[card0].getBoundingClientRect().left;
        const pos1 = cards[card1].getBoundingClientRect().left;
        const movePos = pos1 - pos0;

        cards[card0].style.transition = "transform " + transSpeed + "s ease";
        cards[card1].style.transition = "transform " + transSpeed + "s ease";
        cards[card0].style.transform = 'translateX('+ movePos +'px)';
        cards[card1].style.transform = 'translateX('+ -movePos +'px)';

        await Wait(waitTime);

        if(card0 === 0 && card1===2)
        {
            container[0].insertBefore(cards[2],cards[0]);
            container[0].insertBefore(cards[2],cards[1]);
        }
        else
            container[0].insertBefore(cards[card1],cards[card0]);

        cards[card0].style.transition = "transform 0s ease";
        cards[card1].style.transition = "transform 0s ease";
        cards[card0].style.transform = 'translateX('+ 0+'px)';
        cards[card1].style.transform = 'translateX('+ 0+'px)';

        prev0 = card0;
        prev1 = card1;

        await Wait(shuffleRate);
    }
}