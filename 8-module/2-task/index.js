import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';
import products from './products.js';

export default class ProductGrid {

  elem = null;

  constructor(products) {
    this.products = Array.from(products);
    this.filters = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4,
      category: ""
    };

    this.#render();
  }

  #template () {
    return `
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>
    `
  }

  #render () {
    this.elem = createElement(this.#template());

    let cardGridInner = this.elem.querySelector('.products-grid__inner');

    this.products.map( (product) => {
      let card = new ProductCard(product);
      
      cardGridInner.appendChild(card.elem);
    })

    return this.elem;
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    
    let cardGridInner = this.elem.querySelector('.products-grid__inner');

    cardGridInner.innerHTML = '';
    
    let filtered = this.products
      .filter( (product) => (product.spiciness <= this.filters.maxSpiciness) && 
      (product.nuts != this.filters.noNuts || !product.nuts) && 
      (product.category.includes(this.filters.category)) &&
      ((!!product.vegeterian == this.filters.vegeterianOnly) || product.vegeterian)
      );
      
    filtered.map( (product) => {
      let card = new ProductCard(product);
      
      cardGridInner.appendChild(card.elem);
    });

    return filtered;
  }
}
