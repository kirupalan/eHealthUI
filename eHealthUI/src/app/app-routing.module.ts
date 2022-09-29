import { NgModule } from                '@angular/core';
import { RouterModule, Routes } from    '@angular/router';
import { CartComponent } from           'src/app/components/cart/cart.component';
import { LoginComponent } from          'src/app/components/login/login.component';
import { SignupComponent } from         'src/app/components/signup/signup.component';
import { MedicinesComponent } from      'src/app/components/medicines/medicines.component';
import { ViewMedicineComponent } from   'src/app/components/medicines/view-medicine/view-medicine.component';
import { OrdersComponent } from         'src/app/components/orders/orders.component';
import { UsersComponent } from          'src/app/components/users/users.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'medicines', component: MedicinesComponent},
  {path: 'medicines/:id', component: ViewMedicineComponent},
  {path: 'login',component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'users', component: UsersComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
