import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from 'src/app/services/cart.service';
import { CartPageComponent } from './cart-page.component';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Shoes } from 'src/app/shared/models/shoes';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartPageComponent],
      providers: [CartService] // Ajoutez le CartService dans les providers
    }).compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService); // Injecte le service
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove item from cart', () => {
    // Create a mock cart item
    const shoes: Shoes = {
      id: '1',
      name: 'Dunk low',
      price: 150,
      imageUrl: 'image-url',
      favorite: true,
      stars: 3.5,
      brand: 'Nike',
      size: 42
    };

    const cartItem: CartItem = {
      shoes: shoes,
      quantity: 2,
      price: 200
    };

    // Spy on the cartService's removeFromCart method
    spyOn(cartService, 'removeFromCart');

    // Call the removeFromCart method
    component.removeFromCart(cartItem);

    // Expect the removeFromCart method to have been called with the correct parameters
    expect(cartService.removeFromCart).toHaveBeenCalledWith(shoes.id);
  });

  it('should change item quantity in cart', () => {
    // Create a mock cart item
    const shoes: Shoes = {
      id: '1',
      name: 'Jonhy Noel',
      price: 1000,
      imageUrl: 'image-url',
      favorite: false,
      stars: 5,
      brand: 'Nike',
      size: 42
    };

    const cartItem: CartItem = {
      shoes: shoes,
      quantity: 2,
      price: 200
    };

    // Define the new quantity
    const newQuantity = '3';

    // Spy on the cartService's changeQuantity method
    spyOn(cartService, 'changeQuantity');

    // Call the changeQuantity method
    component.changeQuantity(cartItem, newQuantity);

    // Expect the changeQuantity method to have been called with the correct parameters
    expect(cartService.changeQuantity).toHaveBeenCalledWith(shoes.id, parseInt(newQuantity));
  });
});
