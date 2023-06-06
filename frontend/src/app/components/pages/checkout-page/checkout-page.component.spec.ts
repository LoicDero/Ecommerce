import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { CheckoutPageComponent } from './checkout-page.component';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

describe('CheckoutPageComponent', () => {
  let component: CheckoutPageComponent;
  let fixture: ComponentFixture<CheckoutPageComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getCart']);
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['create']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['currentUser']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['warning', 'error']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CheckoutPageComponent],
      providers: [
        FormBuilder,
        { provide: CartService, useValue: cartServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutPageComponent);
    component = fixture.componentInstance;
    mockCartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    mockOrderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    mockUserService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    mockToastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Configure spy methods
    mockCartService.getCart.and.returnValue({ items: [], totalPrice: 0 } as any);
    mockUserService.currentUser.and.returnValue({ name: 'Toto Test', address: 'louvain la neuve city' } as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with user data', () => {
    component.ngOnInit();
    expect(component.checkoutForm.value).toEqual({ name: 'Toto Test', address: 'louvain la neuve city' });
  });

  it('should display a warning toastr if the form is invalid', () => {
    const invalidFormValue = { name: '', address: '' };
    component.checkoutForm.setValue(invalidFormValue);
    component.createOrder();
    expect(mockToastrService.warning).toHaveBeenCalledWith(
      'Veuillez remplir les champs suivants',
      'Entrée non valide'
    );
    expect(mockOrderService.create).not.toHaveBeenCalled();
    expect(mockToastrService.error).not.toHaveBeenCalled();
  });

  it('should create an order and navigate to the payment page', () => {
    const validFormValue = { name: 'Toto Test', address: 'louvain la neuve city' };
    component.checkoutForm.setValue(validFormValue);
    const order: Order = {
      id: 1,
      items: [],
      totalPrice: 0,
      name: 'Toto Test',
      address: 'louvain la neuve city',
      payementId: '',
      createdAt: '',
      status: ''
    };
    mockOrderService.create.and.returnValue(of(order));
    component.createOrder();
    expect(mockOrderService.create).toHaveBeenCalledWith(order);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/payment');
    expect(mockToastrService.error).not.toHaveBeenCalled();
  });

  it('should display an error toastr if order creation fails', () => {
    const validFormValue = { name: 'Toto Test', address: 'louvain la neuve city' };
    component.checkoutForm.setValue(validFormValue);
    const errorResponse = { error: 'Failed to create order' };
    mockOrderService.create.and.returnValue(throwError(errorResponse));
    component.createOrder();
    expect(mockOrderService.create).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
    expect(mockToastrService.error).toHaveBeenCalledWith('Failed to create order', 'Cart');
  });
});
