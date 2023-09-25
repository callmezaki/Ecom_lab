import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../common/order-item';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { Orders } from '../common/orders';
import { Customer } from '../common/customer';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private adminOrderUrl = 'http://springtc.eu-north-1.elasticbeanstalk.com/api/checkout/orders';
  private userOrderUrl = 'http://springtc.eu-north-1.elasticbeanstalk.com/api/customers';
  
  constructor(private httpClient: HttpClient) { }

  adminOrders():Observable<any>{
    return this.httpClient.get<Orders>(this.adminOrderUrl)
  }
  Customers():Observable<any>{
    return this.httpClient.get<Customer>(this.userOrderUrl)
  }


  
}
