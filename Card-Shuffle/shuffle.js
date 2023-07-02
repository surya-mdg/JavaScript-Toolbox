let container = document.getElementsByClassName("container");
let cards = document.getElementsByClassName("table");

let chosenCard;

window.onclick = async () => {
    chosenCard = Math.floor(Math.random() * 3);
    console.log('%c'+chosenCard, 'color: pink; background-color: black; width: 25px');
    cards = document.getElementsByClassName("table");
    await Shuffle();
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

        cards[card0].style.transition = "transform 0.15s ease";
        cards[card1].style.transition = "transform 0.15s ease";
        cards[card0].style.transform = 'translateX('+ movePos +'px)';
        cards[card1].style.transform = 'translateX('+ -movePos +'px)';

        await Wait(300);

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

        await Wait(100);
    }
}