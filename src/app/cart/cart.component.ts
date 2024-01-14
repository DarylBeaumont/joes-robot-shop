import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { IProduct } from '../catalogue/product.model';

@Component({
  selector: 'bot-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  private cart: IProduct[] = [];

  constructor(private cartService: CartService) {
    
  }

  ngOnInit(){
    this.cartService.getCart().subscribe({
      next: (cart) => (this.cart = cart),
    });
  }

  get cartItems(){
    return this.cart;
  }

  get cartTotal() {
    // Reduce calls an expression for each member in a collection.
    return this.cart.reduce((prev, next) => {
      // If discount is present, take away its value from 1, else just return 1.
      let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
      // Return the previous iteration + the current iteration price multiplied by the discount.
      return prev + next.price * discount;
    }, 0);
  }

  removeFromCart(product: IProduct){
    this.cartService.remove(product);
  }

  getImageUrl(product: IProduct){
    if(!product)
      return '';

    return '/assets/images/robot-parts/' + product.imageName;
  }
}
