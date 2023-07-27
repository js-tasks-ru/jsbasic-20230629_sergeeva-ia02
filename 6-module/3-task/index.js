import createElement from '../../assets/lib/create-element.js';
import slides from './slides.js';

export default class Carousel {
  elem = null;

  slides = [];

  constructor(slides) {
    this.slides = slides;

    this.elem = this.#render();
  }

  #template() {
    return `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
        ${this.slides.map( slide => { return `
          <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${(+slide.price).toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
        `}).join('\n')}
        </div>
      </div>
    `
  }

  #render() {
    this.elem = createElement(this.#template());

    const slides = Array.from(this.elem.querySelectorAll('.carousel__slide'));

    slides.forEach( (slide) => {
      const button = slide.querySelector('button');
      const id = slide.dataset.id;

      button.addEventListener('click', () => this.#addProduct(id))
    })

    this.#initCarousel();

    return this.elem;
  }

  #addProduct(id) {
    const event = new CustomEvent('product-add', {
      detail: id,
      bubbles: true
    });
      
    this.elem.dispatchEvent(event);
  }

  #initCarousel() {
    const carouselInner = this.elem.querySelector('.carousel__inner');
    const arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    const arrowRight = this.elem.querySelector('.carousel__arrow_right');
    const slidesCounter = Array.from(this.elem.querySelectorAll('.carousel__slide'));

    let slide = 0;

    function limit() {
      if (slide == 0){
        arrowLeft.style.display = 'none';
      } else if (slide == slidesCounter.length - 1) {
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
}