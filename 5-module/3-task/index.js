function initCarousel() {
  let carouselInner = document.querySelector('.carousel__inner');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let slide = 0;
  
  function limit() {
    if (slide == 0){
      arrowLeft.style.display = 'none';
    } else if (slide == 3) {
      arrowRight.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
      arrowRight.style.display = '';
    }
  }

  limit();
  
  arrowRight.addEventListener('click', () => {
    slide++;
    carouselInner.style.transform = `translateX(-${slide * carouselInner.offsetWidth}px)`;
    limit();
  })
  
  arrowLeft.addEventListener('click', () => {
    carouselInner.style.transform = `translateX(${-slide * carouselInner.offsetWidth + carouselInner.offsetWidth}px)`;
    slide--;
    limit();
  })
}
