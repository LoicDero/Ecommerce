import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ShoesPageComponent } from './components/pages/shoes-page/shoes-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'search/:searchTerm', component:HomeComponent},
  {path:'tag/:tag', component:HomeComponent},
  {path:'shoes/:id', component:ShoesPageComponent},
  {path:'cart-page', component:CartPageComponent},
  {path:'login', component:LoginPageComponent},
  {path:'register', component:RegisterPageComponent},
  {path:'checkout', component:CheckoutPageComponent, canActivate:[AuthGuard]},
  {path:'profile', component:ProfilePageComponent, canActivate:[AuthGuard]},
  {path:'orders', component:OrdersPageComponent, canActivate:[AuthGuard]},
  {path:'payment', component: PaymentPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
