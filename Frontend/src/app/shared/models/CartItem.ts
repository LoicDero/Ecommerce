import { Shoes } from "./shoes";

export class CartItem{
  constructor(public shoes:Shoes){
  }
  quantity:number = 1;
  price: number = this.shoes.price;
}
