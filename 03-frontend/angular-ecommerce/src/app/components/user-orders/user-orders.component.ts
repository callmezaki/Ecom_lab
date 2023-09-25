import { Component } from '@angular/core';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { Orders } from 'src/app/common/orders';
import { User } from 'src/app/common/user';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {

  customers: Customer[]= [];
  orders: Orders[]=[];
  user: User = JSON.parse(window.localStorage.getItem('userLogged')|| '{}')

  constructor(private customerService: OrdersService){}

  ngOnInit():void{
    console.log(this.user.email)
    this.getCustomer()
  }
  getCustomer(){
    this.customerService.Customers().subscribe(
      data=>{
        this.customers = data
        console.log(data)
      }
    )
  }
}
