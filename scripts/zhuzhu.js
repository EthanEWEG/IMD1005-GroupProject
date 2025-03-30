
/*Carousel */
window.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    
    const images = Array.from(carousel.children);
    images.forEach(img => {
        const clone = img.cloneNode(true);
        carousel.appendChild(clone);
    });
});


/*Chat box */

