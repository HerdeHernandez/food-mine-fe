import { Component } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { Cartitem } from 'src/app/shared/models/cart-item';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {

  cart!: Cart

  constructor (
    private cartSerive: CartService
  ) {
    cartSerive.getCartObservable().subscribe((cart) => {
      this.cart = cart
    })
  }

  removeFromCart(cartItem: Cartitem): void {
    this.cartSerive.removeFromCart(cartItem.food.id)
  }

  changeQuantity(cartItem: Cartitem, quantityString: string): void {
    const quantity = parseInt(quantityString)
    this.cartSerive.changeQuantity(cartItem.food.id, quantity)
  }
}
