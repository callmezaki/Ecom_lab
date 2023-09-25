import { Component } from '@angular/core';
import { OrderItem } from 'src/app/common/order-item';
import { Orders } from 'src/app/common/orders';
import { Purchase } from 'src/app/common/purchase';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders: Orders[]=[]

  constructor(private orderService: OrdersService){}


   ngOnInit():void{
      this.adminOrders()
    }
    adminOrders(){
      this.orderService.adminOrders().subscribe(
        data=>{
          this.orders=data
          console.log(data)
        }
      )
    }

}
