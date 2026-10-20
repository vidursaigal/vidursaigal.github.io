//mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');


burgerIcon.addEventListener('click', (event)=> { navbarMenu.classList.toggle('is-active');
event.preventDefault();


});

const carousel = document.querySelector('[data-carousel]');

if (carousel) {
  const cards = Array.from(carousel.querySelectorAll('[data-slide]'));
  const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
  let activeIndex = 0;
  let intervalId;

  const renderCarousel = () => {
    cards.forEach((card, index) => {
      const offset = (index - activeIndex + cards.length) % cards.length;
      card.dataset.position = offset === 0 ? 'active' : offset === 1 ? 'next' : offset === cards.length - 1 ? 'previous' : 'hidden';
      card.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
    });
    dots.forEach((dot, index) => dot.classList.toggle('is-active', index === activeIndex));
  };

  const showSlide = (index) => {
    activeIndex = (index + cards.length) % cards.length;
    renderCarousel();
  };

  const restartAutoplay = () => {
    window.clearInterval(intervalId);
    intervalId = window.setInterval(() => showSlide(activeIndex + 1), 3500);
  };

  carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => {
    showSlide(activeIndex - 1);
    restartAutoplay();
  });
  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => {
    showSlide(activeIndex + 1);
    restartAutoplay();
  });
  dots.forEach((dot) => dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.carouselDot));
    restartAutoplay();
  }));

  renderCarousel();
  restartAutoplay();
}