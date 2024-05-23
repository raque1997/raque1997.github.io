function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });

  currentIndex = (index + totalSlides) % totalSlides;
  slides[currentIndex].classList.add('active');
}

// carousel.js // 


let currentIndex = 0;

function nextSlide() {
    showSlide(currentIndex + 1);
}

// Cambiar de imagen cada 3 segundos

setInterval(nextSlide, 3000);

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});