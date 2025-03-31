const hotWheelBtn = document.getElementById("hot-wheel");
const tamagotchiBtn = document.getElementById("tamagotchi");
const furbyBtn = document.getElementById("furby");
const trashpackBtn = document.getElementById("trashpack");
const zhuzhuBtn = document.getElementById("zhuzhu");

const contentDiv = document.querySelector(".content"); 
const nameElement = contentDiv.querySelector("h1");
const textElement = contentDiv.querySelector("p"); 

const titleDiv = document.querySelector(".title");

const closeButtons = document.querySelectorAll("#close");

const navBar = document.getElementById("nav");
const navBtn = document.querySelector(".start-button");

hotWheelBtn.addEventListener("click", function() {
    titleDiv.style.display = "block";

    //text updates
    nameElement.textContent = "Ethan Egerton-Graham";
    textElement.textContent = "First year IMD student, interested in game dev and software design. Check out my Hot Wheels page :D";
});

//Yeina
tamagotchiBtn.addEventListener("click", function() {
    titleDiv.style.display = "block";

    //text updates
    nameElement.textContent = "Yein Han";
    textElement.textContent = "First year IMD student, want to become a web developer or 3d animation artist. I use my dog as a stress toy :)";
});

//Kit
furbyBtn.addEventListener("click", function() {
    titleDiv.style.display = "block";

    //text updates
    nameElement.textContent = "Keerthana Deivanayagam";
    textElement.textContent = "First year IMD student, I am mostly interested in illustration/animation right now. Eventually I hope to tie it into projects related my passion for animals and nature as well.";
});

//Ryan
trashpackBtn.addEventListener("click", function() {
    titleDiv.style.display = "block";

    //text updates
    nameElement.textContent = "Ryan Swanson";
    textElement.textContent = "First year IMD student, pursuing career in sports media and design. I played lacrosse for Team Canada!";
});

//Rania
zhuzhuBtn.addEventListener("click", function() {
    titleDiv.style.display = "block";

    //text updates
    nameElement.textContent = "Rania Jabi";
    textElement.textContent = "First year IMD student, want to become a UX/UI designer or illustrator in the future! When I am not swamped with homework, I like to figure skate or crochet for my small business!";
});

//close window btns
closeButtons.forEach(button => {
    button.addEventListener("click", function() {
        titleDiv.style.display = "none";
    });
});

//nav
navBtn.addEventListener("click", function() {
    if (navBar.style.display === "none" || navBar.style.display === "") {
        navBar.style.display = "block";  
    } else {
        navBar.style.display = "none"; 
    }
});
