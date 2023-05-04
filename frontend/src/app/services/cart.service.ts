import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Shoes } from '../shared/models/shoes';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(shoes:Shoes):void{
    let cartItem = this.cart.items.find(item => item.shoes.id === shoes.id);
    if(cartItem)
    return;

    this.cart.items.push(new CartItem(shoes));
    this.setCartToLocalStarage();
  }

  removeFromCart(shoesId: string): void{
    this.cart.items = this.cart.items.filter(item => item.shoes.id != shoesId);
    this.setCartToLocalStarage();
  }

  changeQuantity(shoesId: string, quantity: number){
    let cartItem = this.cart.items.find(item => item.shoes.id === shoesId);
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.shoes.price;
    this.setCartToLocalStarage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStarage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalStarage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum, CurrentItem) => prevSum + CurrentItem.price, 0)
    this.cart.totalCount = this.cart.items.reduce((prevSum, CurrentItem) => prevSum + CurrentItem.quantity, 0)

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();
  }
}
