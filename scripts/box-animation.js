document.getElementById("box-closed").addEventListener("click", function() {
    document.getElementById("sparkle").style.display = "inline";
    document.getElementById("box-closed").classList.add("fade-out");

    setTimeout(function() {
        sparkle.classList.add("fade-out");
        
        document.getElementById("box-closed").style.display = "none"; 
        document.getElementById("box-open").style.display = "inline"; 
        document.getElementById("box-open").classList.add("fade-in"); 
        
        
        document.querySelectorAll(".toys").forEach(toy => {
            toy.classList.add("fade-in");
            toy.style.display = "inline";
        });
    }, 1000); 
});