const element = document.getElementById("window");
const image = document.getElementsByTagName('img');

const handleClick = (event) => {
    console.log('Element clicked!');
    image[0].setAttribute('src','assets/knight/run_2.png');
}

element.addEventListener('click',handleClick);

