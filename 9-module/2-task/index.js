import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor() {
    this.carousel = document.querySelector('[data-carousel-holder]');
    this.ribbonMenu = document.querySelector('[data-ribbon-holder]');
    this.stepSlider = document.querySelector('[data-slider-holder]');
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
    this.productsGrid = '';
    this.products = [];

    this.addEventListeners();
  }
  
  async render() {
    const carousel = new Carousel(slides);
    this.carousel.append(carousel.elem);
    
    const ribbonMenu = new RibbonMenu(categories);
    this.ribbonMenu.append(ribbonMenu.elem);

    const stepSlider = new StepSlider( {steps: 5, value: 4} );
    this.stepSlider.append(stepSlider.elem);

    const cartIcon = document.querySelector('[data-cart-icon-holder]');
    cartIcon.append(this.cartIcon.elem);
    
    const url = 'products.json';
    
    const response = await fetch (url);
    this.products = Array.from(await response.json());

    this.productsGrid = new ProductsGrid(this.products);
    
    const productsGrid = document.querySelector('[data-products-grid-holder]');
    productsGrid.innerHTML = '';
    productsGrid.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });
  }
  
  addEventListeners() {
    document.body.addEventListener('product-add', (event) => {
      let product = this.products.find(item => item.id === event.detail);
      
      this.cart.addProduct(product);
    });

    this.stepSlider.addEventListener('slider-change', (event) => {
      return this.productsGrid.updateFilter( {maxSpiciness: event.detail} );
    });

    this.ribbonMenu.addEventListener('ribbon-select', (event) => {
      return this.productsGrid.updateFilter( {category: event.detail} )
    });

    let nutsCheckbox = document.getElementById('nuts-checkbox');

    nutsCheckbox.addEventListener('change', () => {
      return this.productsGrid.updateFilter( {noNuts: nutsCheckbox.checked} )
    });

    let vegeterianCheckbox = document.querySelector('#vegeterian-checkbox');

    vegeterianCheckbox.addEventListener('change', () => {
      return this.productsGrid.updateFilter( {vegeterianOnly: vegeterianCheckbox.checked} )
    });
  }
}
