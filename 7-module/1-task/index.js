import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  elem = null;

  constructor(categories) {
    this.categories = categories;

    this.elem = this.#render();
  }

  #template() {
    return `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${this.categories.map( category => { return `
          <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
        `}).join('')}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `
  }

  #render() {
    this.elem = createElement(this.#template());

    this.#selectCategories();

    this.#menuScroll();

    return this.elem;
  }

  #menuScroll() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    function limit() {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      
      if (scrollLeft == 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
        arrowRight.classList.add('ribbon__arrow_visible');
      } else if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      }
    }
    
    limit();

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
      limit();
      arrowLeft.classList.add('ribbon__arrow_visible');
    })
    
    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
      limit();
    })
  }

  #selectCategories() {
    const buttons = this.elem.querySelectorAll('.ribbon__item');

    Array.from(buttons).forEach( button => {
      const buttonId = button.dataset.id;

      button.addEventListener('click', () => this.#selectRibbon(buttonId));
    });
  }

  #selectRibbon(id) {
    const event = new CustomEvent('ribbon-select', {
      detail: id,
      bubbles: true
    });
      
    this.elem.dispatchEvent(event);
  }
}
