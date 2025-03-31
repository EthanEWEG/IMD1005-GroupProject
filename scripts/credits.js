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
    nameElement.textContent = "name3";
    textElement.textContent = "bio3";
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
    nameElement.textContent = "name5";
    textElement.textContent = "bio5";
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
