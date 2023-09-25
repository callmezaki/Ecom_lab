import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Routes,RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { UsersComponent } from './components/users/users.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';


const routes: Routes =[
  {path:'user/orders',component:UserOrdersComponent},
  {path:'admin/orders',component:AdminOrdersComponent},
  {path:'admin/addproduct', component: AddproductComponent},
  {path:'admin/products', component: AdminProductsComponent},
  {path:'users',component: UsersComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'verify',component: VerifyComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'cart-details',component: CartDetailsComponent},
  {path:'products/:id',component: ProductDetailsComponent},
  {path:'search/:keyword',component: ProductListComponent},
  //When path matches it creates new instance of prod comp.
  {path:'category/:id',component: ProductListComponent},
  {path:'category',component: ProductListComponent},
  {path:'products',component: ProductListComponent},
  {path:'',redirectTo:'/products',pathMatch:'full'},
  {path:'**',redirectTo:'/products',pathMatch:'full'},
  //If none of the above redirect to products,(wildcard).
]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    RegisterComponent,
    VerifyComponent,
    LoginComponent,
    LoginStatusComponent,
    UsersComponent,
    AdminProductsComponent,
    AddproductComponent,
    AdminOrdersComponent,
    UserOrdersComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
