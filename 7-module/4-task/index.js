import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  elem = null;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.#render();
  }

  #template() {
    return `
    <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
        ${this.#stepsArray().join('\n')}
      </div>
    </div>
    `
  }

  #stepsArray() {
    let array = [];
    for (let i = 0; i < this.steps; i++) {
      array.push('<span></span>');
    }
    return array
  }

  #render() {
    this.elem = createElement(this.#template());

    let step1 = this.elem.querySelector('.slider__steps span');
    step1.classList.add('slider__step-active');
    
    this.elem.addEventListener('click', this.#changeSlider);

    this.elem.addEventListener('dragstart', this.#onDragStart);

    this.elem.addEventListener('pointerdown', this.#onDown);

    return this.elem
  }

  #changeSlider = (e) => {
    const thumb = this.elem.querySelector('.slider__thumb');
    const sliderValue = this.elem.querySelector('.slider__value');
    const progress = this.elem.querySelector('.slider__progress');

    const sliderSteps = this.elem.querySelector('.slider__steps');
    const spanList = Array.from(sliderSteps.querySelectorAll('span'));

    spanList.forEach( span => {
      if (Array.from(span.classList).includes('slider__step-active')) {
        span.classList.remove('slider__step-active');
      }
    })

    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;

    sliderValue.innerHTML = `${value}`;
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    spanList[value].classList.add('slider__step-active');

    this.#changeValue(value);
  }

  #onDown = () => {
    this.elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.#onMove);
    document.addEventListener('pointerup', this.#onUp);
  }
  
  #onMove = (e) => {
    this.elem.classList.add('slider_dragging');

    const thumb = this.elem.querySelector('.slider__thumb');
    const sliderValue = this.elem.querySelector('.slider__value');
    const progress = this.elem.querySelector('.slider__progress');

    const sliderSteps = this.elem.querySelector('.slider__steps');
    const spanList = Array.from(sliderSteps.querySelectorAll('span'));

    spanList.forEach( span => {
      if (Array.from(span.classList).includes('slider__step-active')) {
        span.classList.remove('slider__step-active');
      }
    })

    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    
    if (leftRelative < 0) {
      leftRelative = 0;
    } 
    
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    
    let leftPercents = leftRelative * 100;
    
    let segments = spanList.length - 1;
    let approximateValue = leftRelative * segments;
    
    let value = Math.round(approximateValue);
    
    sliderValue.innerHTML = `${value}`;
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    console.log(progress.style.width);
  }
  
  #onUp = (e) => {
    this.elem.classList.remove('slider_dragging');
    
    document.removeEventListener('pointermove', this.#onMove);

    const sliderSteps = this.elem.querySelector('.slider__steps');
    const spanList = Array.from(sliderSteps.querySelectorAll('span'));
    

    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    spanList.forEach( span => {
      if (Array.from(span.classList).includes('slider__step-active')) {
        span.classList.remove('slider__step-active');
      }
    })

    this.#changeValue(value);
  }

  #onDragStart = (e) => {
    e.preventDerauld();
  }

  #changeValue = (value) => {
    const event = new CustomEvent("slider-change", {
      detail: value,
      bubbles: true
    });

    this.elem.dispatchEvent(event);
  }
}