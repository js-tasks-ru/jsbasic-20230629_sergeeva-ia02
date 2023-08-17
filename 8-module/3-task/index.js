export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product) {
      let cartItem = this.cartItems.find( item => item.product.id == product.id);

      if (cartItem) {
        cartItem.count++;
      } else this.cartItems.push( {product: {...product}, count: 1} );
    }

    this.onProductUpdate(this.cartItems);

    return this.cartItems;
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

    this.onProductUpdate(this.cartItems);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

