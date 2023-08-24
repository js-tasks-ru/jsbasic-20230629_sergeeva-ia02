import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal = '';

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      let cartItem = this.cartItems.find( item => item.product.id == product.id);

      if (cartItem) {
        cartItem.count++;
      } else this.cartItems.push( cartItem = {product: {...product}, count: 1} );

      this.onProductUpdate(cartItem);
    }

    return this.cartItem;
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find( item => item.product.id === productId);
    
    if (cartItem && cartItem.count) {
      cartItem.count += amount;

      if (cartItem.count == 0) {
        let id = this.cartItems.findIndex( item => item.product.id === productId);
        this.cartItems.splice(id, 1);
      }
    } else return;

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    if (this.cartItems.length) {
      return false
    } else return true
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach( item => totalCount += item.count);

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach( item => totalPrice += (item.product.price * item.count));

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();

    modal.setTitle('Your order');
    
    modal.setBody(createElement('<div></div>'));

    let modalContainer = document.querySelector('.modal__body div');
    
    modalContainer.insertAdjacentElement('afterbegin', this.renderOrderForm());

    this.cartItems.forEach( item => {
      modalContainer.insertAdjacentElement('afterbegin', this.renderProduct(item.product, item.count));
    });
      
    modal.open();

    let productList = document.querySelectorAll('.cart-product');

      productList.forEach( product => {
        let minus = product.querySelector('.cart-counter__button_minus');
        let plus = product.querySelector('.cart-counter__button_plus');

        minus.addEventListener('click', () => {
          this.updateProductCount(product.dataset.productId, -1)
        })

        plus.addEventListener('click', () => {
          this.updateProductCount(product.dataset.productId, 1)
        })
      });

    document.querySelector('.cart-form').addEventListener('submit', (event) => {
      this.onSubmit(event);
    });

    this.modal = modal;
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    let modalBody = document.querySelector('.is-modal-open');

    if (modalBody) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal');

      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      if (cartItem.count == 0) {
        let items = Array.from(document.querySelectorAll('.cart-product'));

        let item = items.find( item => item.dataset.productId === productId);

        item.remove();
      }
      
      if (this.isEmpty()) {
        this.modal.close();
      }

      productCount.innerHTML = cartItem.count;

      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;

      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;  
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const form = document.querySelector('.cart-form');

    const url = 'https://httpbin.org/post';
    const method = 'POST';

    const formData = new FormData(form);

    const response = fetch(url, {
      body: formData,
      method
    });

    response
      .then( () => {
        this.modal.setTitle('Success!');

        this.cartItems = [];
        
        this.cartIcon.update(this);

        let modalContainer = document.querySelector('.modal__body div');

        modalContainer.innerHTML = '';

        this.modal.setBody( createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
        `));
      })
      .catch( (error) => {
        console.log(error);
      })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

