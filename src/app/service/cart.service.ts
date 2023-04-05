import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart';
import { Cartitem } from '../shared/models/cart-item';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getCartLocalStorage()
  private cartSubject: BehaviorSubject<Cart> =  new BehaviorSubject(this.cart)

  constructor() { }

  addToCart(food: Food): void{
    let cartItem = this.cart.items.find(item => item.food.id === food.id)

    if(cartItem) return

    this.cart.items.push(new Cartitem(food))
    this.setCartLocalStorage()
  }

  removeFromCart(foodId: string): void{
    this.cart.items = this.cart.items
      .filter(item => item.food.id != foodId)

    this.setCartLocalStorage()
  }

  changeQuantity(foodId: string, quantity: number): void{
    let cartItem = this.cart.items
      .find(item => item.food.id === foodId)

    if(!cartItem) return

    cartItem.quantity =  quantity
    cartItem.price = quantity * cartItem.food.price

    this.setCartLocalStorage()
  }

  clearCart(){
    this.cart = new Cart()
    this.setCartLocalStorage()
  }

  getCartObservable():Observable<Cart> {
    return this.cartSubject.asObservable()
  }

  private setCartLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0)

    this.cart.totalCount = this.cart.items
      .reduce((prevCount, currentItem) => prevCount + currentItem.quantity, 0)

    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem('Cart', cartJson)

    this.cartSubject.next(this.cart)
  }

  private getCartLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart')
    return cartJson? JSON.parse(cartJson) : new Cart()
  }
}
