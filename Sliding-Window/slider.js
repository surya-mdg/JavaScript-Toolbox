const element = document.getElementById("window");
const image = document.getElementsByTagName('img');

const characters = [ "knight", "explorer"];
const spriteRun1 = [ "run_0.png", "run_1.png", "run_2.png", "run_3.png", "run_4.png", "run_5.png", "run_6.png", "run_7.png", "run_8.png"];

let mouseStart;
let isClicked = false;
let index = 0;
let maxDistance = 270;
let section = maxDistance/(spriteRun1.length);

window.onmousedown = e => {
    mouseStart = e.clientX - (section * index);
    isClicked = true;
}

window.onmouseup = e => {
    isClicked = false;
}

window.onmousemove = e => {
    if(!isClicked) return;

    let distanceMoved = e.clientX - mouseStart;
    if(distanceMoved >= maxDistance || distanceMoved <= -maxDistance)
    {
        mouseStart = e.clientX;
        distanceMoved = e.clientX - mouseStart;
    }

    index = Math.floor(distanceMoved/section);
    if(index >= 0)
    {
        const source = "assets/" + characters[0] + "/" + spriteRun1[index];
        image[0].setAttribute('src',source);
    }
    else
    {
        const source = "assets/" + characters[0] + "/" + spriteRun1[spriteRun1.length + index];
        image[0].setAttribute('src',source);
    }
}