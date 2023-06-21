const element = document.getElementsByTagName('body');
const image = document.getElementsByTagName('img');

const characters = [ {name: "knight", bgColor: "#3d3f41", borderColor: "#1a0e13", boxShadow: "#141515"}, {name: "explorer", bgColor: "#152734", borderColor: "#204042", boxShadow: "#0f1d1e"}];
const spriteRun = [ ["run_0.png", "run_1.png", "run_2.png", "run_3.png", "run_4.png", "run_5.png", "run_6.png", "run_7.png", "run_8.png"], ["run-1.png", "run-2.png", "run-3.png", "run-4.png", "run-5.png", "run-6.png", "run-7.png", "run-8.png"]];

let mouseStart; //Stores cursor first clicked position
let isClicked = false; //Keeps track of state of the mouse button
let index = 0; 
let charIndex = 1; //Keeps track of active character
let maxDistance = 270; //Distance needed to be covered by the cursor in order to complete one animation cycle
let maxScrollDistance = 100; //Minimum scroll distance required in order to change character
let section = maxDistance/(spriteRun[charIndex].length); //Distance between each frame of the animation

window.onload = () => { //Sets all the properties of website on load
    const source = "assets/" + characters[charIndex].name + "/" + spriteRun[charIndex][0];
    image[0].setAttribute('src',source);
    image[0].style.border = "10px solid " + characters[charIndex].borderColor;
    image[0].style.boxShadow = "0 0 10px " + characters[charIndex].boxShadow;
    document.body.style.backgroundColor = characters[charIndex].bgColor;
}

window.onmousedown = e => { //Stores clicked position of cursor and state of mouse button
    mouseStart = e.clientX - (section * index);
    isClicked = true;
}

window.onmouseup = e => { //Updates state of mouse button
    isClicked = false;
}

window.addEventListener('wheel',(event) => { //Used to detect scroll and change the character
    let scrollDistance = event.deltaY;
    if(scrollDistance < -maxScrollDistance) //Detect direction of scroll
    {
        if(charIndex + 1 < characters.length)
            charIndex++;
        else
            charIndex = 0;
    }
    else if(scrollDistance > maxScrollDistance)
    {
        if(charIndex - 1 >= 0)
            charIndex--;
        else
            charIndex = characters.length - 1;
    }

    section = maxDistance/(spriteRun[charIndex].length);

    const source = "assets/" + characters[charIndex].name + "/" + spriteRun[charIndex][0];
    image[0].setAttribute('src',source);
    image[0].style.border = "10px solid " + characters[charIndex].borderColor;
    image[0].style.boxShadow = "0 0 10px " + characters[charIndex].boxShadow;
    document.body.style.backgroundColor = characters[charIndex].bgColor;

})

window.onmousemove = e => { //Detects mouse movement and updates the animation frame
    if(!isClicked) return; //Doesn't not run if mouse button not held

    let distanceMoved = e.clientX - mouseStart;
    if(distanceMoved >= maxDistance || distanceMoved <= -maxDistance)
    {
        mouseStart = e.clientX;
        distanceMoved = e.clientX - mouseStart;
    }

    index = Math.floor(distanceMoved/section);
    if(index >= 0) //To decided the direction of animation
    {
        const source = "assets/" + characters[charIndex].name + "/" + spriteRun[charIndex][index];
        image[0].setAttribute('src',source);
    }
    else
    {
        const source = "assets/" + characters[charIndex].name + "/" + spriteRun[charIndex][spriteRun[charIndex].length + index];
        image[0].setAttribute('src',source);
    }
}

//@surya-mdg