import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cart!:Cart;
  constructor(private cartService: CartService){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  ngOnInit(): void {
  }
  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.shoes.id);
  }
  changeQuantity(cartItem: CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString)
    this.cartService.changeQuantity(cartItem.shoes.id, quantity);
  }
}
